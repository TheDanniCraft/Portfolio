import "server-only";

import { createHash } from "node:crypto";
import { z } from "zod";

const chatwootEnvironmentSchema = z.object({
	CHATWOOT_BASE_URL: z.string().url(),
	CHATWOOT_ACCOUNT_ID: z.coerce.number().int().positive(),
	CHATWOOT_INBOX_ID: z.coerce.number().int().positive(),
	CHATWOOT_API_ACCESS_TOKEN: z.string().min(1),
});

const subjectLabels = {
	"general-inquiry": "General inquiry",
	"new-product-build": "New product build",
	"redesign-optimization": "Redesign and optimization",
	"technical-advisory": "Technical advisory",
} as const;

type Inquiry = {
	name: string;
	email: string;
	subject: keyof typeof subjectLabels;
	message: string;
};

type ChatwootEnvironment = z.infer<typeof chatwootEnvironmentSchema>;

const contactInboxSchema = z.object({
	source_id: z.string().min(1),
	inbox: z.object({ id: z.number() }),
});

const contactSchema = z.object({
	id: z.number(),
	email: z.string().nullable().optional(),
	contact_inboxes: z.array(contactInboxSchema).default([]),
});

const contactSearchSchema = z.object({ payload: z.array(contactSchema) });

const contactCreateSchema = z.object({
	payload: z.object({
		contact: contactSchema,
		contact_inbox: contactInboxSchema,
	}),
});

const conversationSchema = z.object({ id: z.number() });
class ChatwootRequestError extends Error {
	constructor(
		readonly stage: string,
		readonly status: number,
	) {
		super(`Chatwoot ${stage} failed with status ${status}`);
		this.name = "ChatwootRequestError";
	}
}

function getEnvironment() {
	const parsedEnvironment = chatwootEnvironmentSchema.safeParse(process.env);
	if (!parsedEnvironment.success) {
		console.error("Chatwoot inquiry configuration is incomplete", parsedEnvironment.error.flatten().fieldErrors);
		throw new Error("Chatwoot inquiry delivery is not configured");
	}

	return parsedEnvironment.data;
}

function getAccountApiUrl(environment: ChatwootEnvironment, path: string) {
	const baseUrl = environment.CHATWOOT_BASE_URL.replace(/\/+$/, "");
	return `${baseUrl}/api/v1/accounts/${environment.CHATWOOT_ACCOUNT_ID}${path}`;
}

async function requestChatwoot(environment: ChatwootEnvironment, stage: string, path: string, init?: RequestInit) {
	const response = await fetch(getAccountApiUrl(environment, path), {
		...init,
		headers: {
			"Content-Type": "application/json",
			api_access_token: environment.CHATWOOT_API_ACCESS_TOKEN,
			...init?.headers,
		},
		signal: AbortSignal.timeout(10_000),
	});

	if (!response.ok) {
		throw new ChatwootRequestError(stage, response.status);
	}

	return response.json() as Promise<unknown>;
}

function makeContactIdentifier(email: string) {
	return `portfolio-${createHash("sha256").update(email).digest("hex").slice(0, 32)}`;
}

function findInboxSource(contact: z.infer<typeof contactSchema>, inboxId: number) {
	return contact.contact_inboxes.find((contactInbox) => contactInbox.inbox.id === inboxId)?.source_id;
}

async function findContact(environment: ChatwootEnvironment, email: string) {
	const result = contactSearchSchema.parse(
		await requestChatwoot(environment, "contact search", `/contacts/search?q=${encodeURIComponent(email)}`),
	);

	return result.payload.find((contact) => contact.email?.toLowerCase() === email);
}

async function createContact(environment: ChatwootEnvironment, inquiry: Inquiry, identifier: string) {
	const result = contactCreateSchema.parse(
		await requestChatwoot(environment, "contact creation", "/contacts", {
			method: "POST",
			body: JSON.stringify({
				inbox_id: environment.CHATWOOT_INBOX_ID,
				source_id: inquiry.email,
				name: inquiry.name,
				email: inquiry.email,
				identifier,
				additional_attributes: { source: "portfolio" },
			}),
		}),
	);

	return {
		contact: result.payload.contact,
		sourceId: result.payload.contact_inbox.source_id,
	};
}

async function createContactInbox(environment: ChatwootEnvironment, contactId: number, sourceId: string) {
	const result = contactInboxSchema.parse(
		await requestChatwoot(environment, "contact inbox creation", `/contacts/${contactId}/contact_inboxes`, {
			method: "POST",
			body: JSON.stringify({ inbox_id: environment.CHATWOOT_INBOX_ID, source_id: sourceId }),
		}),
	);

	return result.source_id;
}

async function getOrCreateContact(environment: ChatwootEnvironment, inquiry: Inquiry) {
	const normalizedInquiry = { ...inquiry, email: inquiry.email.trim().toLowerCase() };
	const identifier = makeContactIdentifier(normalizedInquiry.email);
	const existingContact = await findContact(environment, normalizedInquiry.email);

	if (!existingContact) {
		const { contact, sourceId } = await createContact(environment, normalizedInquiry, identifier);
		return { contact, sourceId, inquiry: normalizedInquiry };
	}

	const contact = existingContact;
	const existingSourceId = findInboxSource(contact, environment.CHATWOOT_INBOX_ID);
	const sourceId = existingSourceId ?? (await createContactInbox(environment, contact.id, normalizedInquiry.email));

	return { contact, sourceId, inquiry: normalizedInquiry };
}

export async function createInquiryConversation(inquiry: Inquiry, inquiryId: string) {
	const environment = getEnvironment();

	try {
		const { contact, sourceId, inquiry: normalizedInquiry } = await getOrCreateContact(environment, inquiry);
		const subjectLabel = subjectLabels[normalizedInquiry.subject];
		const mailSubject = `Project inquiry: ${subjectLabel}`;
		const inquiryNote = [
			`New portfolio inquiry from ${normalizedInquiry.name} <${normalizedInquiry.email}>`,
			`Subject: ${subjectLabel}`,
			"",
			normalizedInquiry.message,
		].join("\n");
		const conversation = conversationSchema.parse(
			await requestChatwoot(environment, "conversation creation", "/conversations", {
				method: "POST",
				body: JSON.stringify({
					source_id: sourceId,
					inbox_id: environment.CHATWOOT_INBOX_ID,
					contact_id: contact.id,
					status: "open",
					additional_attributes: {
						source: "portfolio",
						inquiry_id: inquiryId,
						inquiry_subject: subjectLabel,
						mail_subject: mailSubject,
					},
					message: {
						content: inquiryNote,
						message_type: "outgoing",
						private: true,
						content_type: "text",
					},
				}),
			}),
		);

		console.info("Portfolio inquiry created in Chatwoot", {
			inquiryId,
			conversationId: conversation.id,
		});
	} catch (error) {
		if (error instanceof ChatwootRequestError) {
			console.error("Chatwoot inquiry delivery failed", {
				inquiryId,
				stage: error.stage,
				status: error.status,
			});
		}

		throw error;
	}
}
