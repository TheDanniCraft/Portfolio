"use client";

import { Calendar } from "@gravity-ui/icons";
import { Button, buttonVariants, Card, FieldError, Form, Input, Label, ListBox, Modal, Select, TextArea, TextField } from "@heroui/react";
import Script from "next/script";
import { type FormEvent, useRef, useState } from "react";
import { Link } from "react-aria-components";

type ProjectInquiryFormProps = {
	className?: string;
	mode?: "compact" | "full";
	showFooter?: boolean;
};

const subjectOptions = [
	{ id: "general-inquiry", label: "General Inquiry" },
	{ id: "new-product-build", label: "New Product Build" },
	{ id: "redesign-optimization", label: "Redesign and Optimization" },
	{ id: "technical-advisory", label: "Technical Advisory" },
];

const capBaseUrl = "https://challenge.cloud.thedannicraft.de";
const capEndpoint = `${capBaseUrl}/03d619b86e/`;
const labelClassName = "text-[0.68rem] font-bold uppercase tracking-[0.18em] text-muted";
const n8nWebhookPath = process.env.NODE_ENV === "production" ? "webhook" : "webhook-test";
const n8nWebhookUrl = `https://n8n.thedannicraft.de/${n8nWebhookPath}/ec21b409-0511-42e8-8863-82452c75f55c`;

type SubmitState = "idle" | "verifying" | "submitting" | "success" | "error";

type N8nResponse = {
	message?: string;
	success?: boolean | string;
};

export function ProjectInquiryForm({ className, mode = "compact", showFooter = true }: ProjectInquiryFormProps) {
	const isFull = mode === "full";
	const messageRows = isFull ? 7 : 5;
	const capWidgetRef = useRef<HTMLElement | null>(null);
	const capTokenRef = useRef("");
	const [capToken, setCapToken] = useState("");
	const [submitState, setSubmitState] = useState<SubmitState>("idle");
	const [message, setMessage] = useState("");

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const token = String(formData.get("cap-token") || capTokenRef.current || capToken || "");

		if (!token) {
			setSubmitState("error");
			setMessage("Please verify you are human before sending.");
			return;
		}

		setSubmitState("submitting");
		setMessage("Sending your inquiry...");

		const payload = {
			...Object.fromEntries(formData.entries()),
			"cap-token": token,
		};

		try {
			const response = await fetch(n8nWebhookUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			});

			const responseText = await response.text();
			const result = responseText ? (JSON.parse(responseText) as N8nResponse) : null;
			const isSuccess = result?.success === true || result?.success === "true";

			if (!response.ok || !isSuccess) {
				const detail = result?.message || responseText;

				throw new Error(`n8n webhook responded with ${response.status} ${response.statusText}${detail ? `: ${detail}` : ""}`);
			}

			form.reset();
			capTokenRef.current = "";
			setCapToken("");
			setSubmitState("success");
			setMessage("Inquiry sent. I will reply with the next step.");
			(capWidgetRef.current as { reset?: () => void } | null)?.reset?.();
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Unknown error";

			setSubmitState("error");
			setMessage(errorMessage.includes("Failed to fetch") ? "The webhook request was blocked or could not be reached. Check n8n CORS and that the test webhook is listening." : "The inquiry could not be sent. Please try again.");
		}
	};

	return (
		<Card className={`border border-border bg-surface p-6 text-left sm:p-8 ${className ?? ""}`}>
			<Script id='cap-wasm-url' strategy='afterInteractive'>{`window.CAP_CUSTOM_WASM_URL = "${capBaseUrl}/assets/cap_wasm.js";`}</Script>
			<Script src={`${capBaseUrl}/assets/widget.js`} strategy='afterInteractive' />

			<Form aria-label='Project inquiry' className='grid gap-5' onSubmit={handleSubmit}>
				<div className='grid gap-5 sm:grid-cols-2'>
					<TextField isRequired name='name' type='text'>
						<Label className={labelClassName}>{isFull ? "Full Name" : "Name"}</Label>
						<Input className='min-h-11' placeholder='John Doe' variant='secondary' />
						<FieldError />
					</TextField>

					<TextField isRequired name='email' type='email'>
						<Label className={labelClassName}>{isFull ? "Email Address" : "Email"}</Label>
						<Input className='min-h-11' placeholder={isFull ? "john@example.com" : "john@company.com"} variant='secondary' />
						<FieldError />
					</TextField>
				</div>

				{isFull ? (
					<Select isRequired fullWidth name='subject' placeholder='Select a subject' variant='secondary'>
						<Label className={labelClassName}>Subject</Label>
						<Select.Trigger className='flex min-h-11 items-center'>
							<Select.Value className='flex-1 leading-none' />
							<Select.Indicator className='shrink-0' />
						</Select.Trigger>
						<Select.Popover>
							<ListBox>
								{subjectOptions.map((option) => (
									<ListBox.Item id={option.id} key={option.id} textValue={option.label}>
										{option.label}
										<ListBox.ItemIndicator />
									</ListBox.Item>
								))}
							</ListBox>
						</Select.Popover>
						<FieldError />
					</Select>
				) : null}

				<TextField isRequired name='message'>
					<Label className={labelClassName}>{isFull ? "Your Message" : "Message"}</Label>
					<TextArea className={isFull ? "min-h-44" : "min-h-32"} placeholder='Tell me about your project...' rows={messageRows} variant='secondary' />
					<FieldError />
				</TextField>

				<cap-widget
					ref={capWidgetRef}
					data-cap-api-endpoint={capEndpoint}
					data-cap-hidden-field-name='cap-token'
					onerror={(event) => {
						setSubmitState("error");
						setMessage(event.detail?.message ?? "Verification failed. Please try again.");
					}}
					onsolve={(event) => {
						const token = event.detail.token;

						capTokenRef.current = token;
						setCapToken(token);
						setSubmitState("idle");
						setMessage("");
					}}
				/>

				<Button className={isFull ? "inline-flex min-h-12 w-fit items-center justify-center gap-2 px-8 text-sm font-black" : "min-h-12 text-xs font-black uppercase tracking-[0.22em]"} isDisabled={submitState === "submitting"} type='submit' variant='primary'>
					{submitState === "submitting" ? "Sending..." : isFull ? "Launch Message" : "Initialize Contact"}
					{isFull ? <span aria-hidden='true'>-&gt;</span> : null}
				</Button>

				{message ? <p className={`text-sm ${submitState === "error" ? "text-danger" : "text-muted"}`}>{message}</p> : null}

				{showFooter ? (
					<div className='border-t border-border pt-5'>
						<div className='grid gap-3 sm:grid-cols-2'>
							<div className='grid gap-2'>
								<p className='text-sm leading-6 text-muted'>Prefer to talk instead?</p>

								<Modal>
									<Button fullWidth size='md' variant='secondary'>
										<Calendar aria-hidden className='size-4' />
										Book a video call
									</Button>

									<Modal.Backdrop variant='blur'>
										<Modal.Container size='lg'>
											<Modal.Dialog className='w-[min(960px,calc(100vw-2rem))] max-w-none overflow-hidden p-0'>
												<Modal.CloseTrigger className='right-4 top-4 z-10' />
												<Modal.Body className='p-0'>
													<iframe src='https://book.morgen.so/thedannicraft/project-inquiry' width='100%' height='700px' style={{ border: "none" }} title='Book a project inquiry with TheDanniCraft' />
												</Modal.Body>
											</Modal.Dialog>
										</Modal.Container>
									</Modal.Backdrop>
								</Modal>
							</div>

							<div className='grid gap-2'>
								<p className='text-sm leading-6 text-muted'>Prefer to write instead?</p>

								<Link href='mailto:mail@thedannicraft.de' className={`${buttonVariants({ variant: "secondary", size: "md" })} w-full justify-center`}>
									Send an email
								</Link>
							</div>
						</div>
					</div>
				) : null}
			</Form>
		</Card>
	);
}
