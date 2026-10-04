"use server";

import { createHash } from "node:crypto";
import { z } from "zod";
import { createInquiryConversation } from "@/lib/server/inquiry-chatwoot";

type SubmitInquiryResult = {
	success: boolean;
	message?: string;
};

const inquirySchema = z.object({
	name: z.string().trim().min(1, "Please provide your name.").max(120, "Please shorten your name."),
	email: z.string().trim().email("Please provide a valid email address.").max(254),
	subject: z.enum(["general-inquiry", "new-product-build", "redesign-optimization", "technical-advisory"]).default("general-inquiry"),
	message: z.string().trim().min(10, "Your message must be at least 10 characters long.").max(10_000, "Please shorten your message."),
	"cap-token": z.string().min(1, "Please verify you are human before sending."),
});

const capResponseSchema = z.object({
	success: z.boolean(),
	error: z.string().optional(),
	"error-codes": z.array(z.string()).optional(),
});

export async function submitInquiry(formData: FormData): Promise<SubmitInquiryResult> {
	const parsedData = inquirySchema.safeParse(Object.fromEntries(formData.entries()));

	if (!parsedData.success) {
		// Return the first validation error message
		return { success: false, message: parsedData.error.issues[0].message };
	}

	const { "cap-token": token, ...inquiry } = parsedData.data;

	try {
		const capVerifyUrl = process.env.CAP_VERIFY_URL ?? "https://challenge.cloud.thedannicraft.de/03d619b86e/siteverify";
		const capSecret = process.env.CAP_SECRET;

		if (!capSecret) {
			console.error("Cap verification configuration is incomplete", { missing: "CAP_SECRET" });
			return { success: false, message: "Security verification is not configured for this deployment." };
		}

		const capResponse = await fetch(capVerifyUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ secret: capSecret, response: token }),
			signal: AbortSignal.timeout(8_000),
		});
		const capResponseBody: unknown = await capResponse.json().catch(() => null);
		const capResult = capResponseSchema.safeParse(capResponseBody);

		if (!capResponse.ok || !capResult.success || !capResult.data.success) {
			console.error("Cap verification failed", {
				status: capResponse.status,
				error: capResult.success ? capResult.data.error : "Invalid response body",
				errorCodes: capResult.success ? capResult.data["error-codes"] : undefined,
			});
			return { success: false, message: "Security check failed. Please try again." };
		}

		if ((process.env.INQUIRY_DELIVERY_MODE ?? "disabled") !== "chatwoot") {
			return { success: false, message: "Project inquiries are not enabled for this deployment." };
		}

		const inquiryId = createHash("sha256").update(token).digest("hex").slice(0, 20);
		await createInquiryConversation(inquiry, inquiryId);

		return { success: true };
	} catch (error) {
		console.error(
			"Inquiry submission failed",
			error instanceof z.ZodError
				? { name: error.name, issues: error.issues }
				: error instanceof Error
					? { name: error.name, message: error.message }
					: { message: "Unknown error" },
		);
		return { success: false, message: "The inquiry could not be sent. Please try again." };
	}
}
