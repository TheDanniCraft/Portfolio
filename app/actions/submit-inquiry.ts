"use server";

import { z } from "zod";

type SubmitInquiryResult = {
	success: boolean;
	message?: string;
};

type N8nResponse = {
	message?: string;
	success?: boolean | string;
};

const inquirySchema = z.object({
	name: z.string().min(1, "Please provide your name."),
	email: z.string().email("Please provide a valid email address."),
	subject: z.string().optional(),
	message: z.string().min(10, "Your message must be at least 10 characters long."),
	"cap-token": z.string().min(1, "Please verify you are human before sending."),
});

export async function submitInquiry(formData: FormData): Promise<SubmitInquiryResult> {
	const n8nWebhookPath = process.env.NODE_ENV === "production" ? "webhook" : "webhook-test";
	const n8nWebhookUrl = `https://n8n.thedannicraft.de/${n8nWebhookPath}/ec21b409-0511-42e8-8863-82452c75f55c`;

	const parsedData = inquirySchema.safeParse(Object.fromEntries(formData.entries()));

	if (!parsedData.success) {
		// Return the first validation error message
		return { success: false, message: parsedData.error.issues[0].message };
	}

	const { "cap-token": token, ...validatedPayload } = parsedData.data;

	try {
		// 1. Verify the Cap Token
		const capVerifyUrl = "https://challenge.cloud.thedannicraft.de/03d619b86e/siteverify";
		const capResponse = await fetch(capVerifyUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token }),
		});

		const capResult = await capResponse.json();

		if (!capResponse.ok || !capResult.success) {
			console.error("Cap verification failed:", capResult);
			return { success: false, message: "Security check failed. Please try again." };
		}

		// 2. Submit data to n8n (excluding the token, as it's already verified)
		const response = await fetch(n8nWebhookUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(validatedPayload),
		});

		const responseText = await response.text();
		const result = responseText ? (JSON.parse(responseText) as N8nResponse) : null;
		const isSuccess = result?.success === true || result?.success === "true";

		if (!response.ok || !isSuccess) {
			const detail = result?.message || responseText;
			console.error(`n8n webhook responded with ${response.status} ${response.statusText}${detail ? `: ${detail}` : ""}`);
			return { success: false, message: "The inquiry could not be sent. Please try again." };
		}

		return { success: true };
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";
		console.error("Error submitting inquiry:", errorMessage);

		return {
			success: false,
			message: errorMessage.includes("fetch")
				? "The request could not be completed. Check CORS or network status."
				: "The inquiry could not be sent. Please try again.",
		};
	}
}
