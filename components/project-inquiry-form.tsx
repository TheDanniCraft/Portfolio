"use client";

import { Calendar } from "@gravity-ui/icons";
import { useConsentManager } from "@c15t/nextjs";
import { useHeadlessConsentUI } from "@c15t/nextjs/headless";
import { Button, buttonVariants, Card, FieldError, Form, Input, Label, ListBox, Modal, Select, TextArea, TextField, toast } from "@heroui/react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Link } from "react-aria-components";
import { submitInquiry } from "@/app/actions/submit-inquiry";
import type { CapWidget } from "cap-widget";
import { OPEN_CONSENT_PREFERENCES_EVENT, type OpenConsentPreferencesDetail } from "@/lib/consent-events";

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

type SubmitState = "idle" | "submitting";

export function ProjectInquiryForm({ className, mode = "compact", showFooter = true }: ProjectInquiryFormProps) {
	const isFull = mode === "full";
	const messageRows = isFull ? 7 : 5;
	const capWidgetRef = useRef<CapWidget | null>(null);
	const capTokenRef = useRef("");
	const [capToken, setCapToken] = useState("");
	const [submitState, setSubmitState] = useState<SubmitState>("idle");
	const [bookingOpen, setBookingOpen] = useState(false);
	const { has, hasConsented } = useConsentManager();
	const { openDialog: openConsentPreferences } = useHeadlessConsentUI();
	const morgenEmbedAllowed = hasConsented() && has("functionality");
	const reviewPrivacyChoices = () => {
		setBookingOpen(false);
		openConsentPreferences();
		window.dispatchEvent(new CustomEvent<OpenConsentPreferencesDetail>(OPEN_CONSENT_PREFERENCES_EVENT, { detail: { category: "functionality" } }));
	};

	useEffect(() => {
		window.CAP_CUSTOM_WASM_URL = `${capBaseUrl}/assets/cap_wasm.js`;
		void import("cap-widget");
	}, []);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const form = event.currentTarget;
		const formData = new FormData(form);
		const token = String(formData.get("cap-token") || capTokenRef.current || capToken || "");

		if (!token) {
			toast.danger("Security check required", {
				description: "Please verify you are human before sending.",
			});
			return;
		}

		// Ensure token is in the FormData
		if (!formData.has("cap-token")) {
			formData.append("cap-token", token);
		} else {
			formData.set("cap-token", token);
		}

		setSubmitState("submitting");

		try {
			const result = await submitInquiry(formData);

			if (!result.success) {
				capTokenRef.current = "";
				setCapToken("");
				capWidgetRef.current?.reset();
				setSubmitState("idle");
				toast.danger("Inquiry not sent", {
					description: result.message || "The inquiry could not be sent. Please try again.",
				});
				return;
			}

			form.reset();
			capTokenRef.current = "";
			setCapToken("");
			setSubmitState("idle");
			toast.success("Inquiry sent", {
				description: "I will reply with the next step.",
				timeout: 5_000,
			});
			capWidgetRef.current?.reset();
		} catch {
			setSubmitState("idle");
			toast.danger("Inquiry not sent", {
				description: "An unexpected error occurred. Please try again.",
			});
		}
	};

	return (
		<Card className={`border border-border bg-surface p-6 text-left sm:p-8 ${className ?? ""}`}>
			<Form aria-label='Project inquiry' className='grid gap-5' onSubmit={handleSubmit}>
				<div className='grid gap-5 sm:grid-cols-2'>
					<TextField isRequired>
						<Label className={labelClassName}>{isFull ? "Full Name" : "Name"}</Label>
						<Input className='min-h-11' name='name' placeholder='John Doe' type='text' variant='secondary' />
						<FieldError />
					</TextField>

					<TextField isRequired>
						<Label className={labelClassName}>{isFull ? "Email Address" : "Email"}</Label>
						<Input className='min-h-11' name='email' placeholder={isFull ? "john@example.com" : "john@company.com"} type='email' variant='secondary' />
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

				<TextField isRequired>
					<Label className={labelClassName}>{isFull ? "Your Message" : "Message"}</Label>
					<TextArea className={isFull ? "min-h-44" : "min-h-32"} name='message' placeholder='Tell me about your project...' rows={messageRows} variant='secondary' />
					<FieldError />
				</TextField>

				<cap-widget
					ref={capWidgetRef}
					data-cap-api-endpoint={capEndpoint}
					data-cap-hidden-field-name='cap-token'
					onerror={(event) => {
						setSubmitState("idle");
						toast.danger("Security check failed", {
							description: event.detail?.message ?? "Verification failed. Please try again.",
						});
					}}
					onsolve={(event) => {
						const token = event.detail.token;

						capTokenRef.current = token;
						setCapToken(token);
						setSubmitState("idle");
					}}
				/>

				<Button className={isFull ? "inline-flex min-h-12 w-fit items-center justify-center gap-2 px-8 text-sm font-black" : "min-h-12 text-xs font-black uppercase tracking-[0.22em]"} isDisabled={submitState === "submitting"} type='submit' variant='primary'>
					{submitState === "submitting" ? "Sending..." : isFull ? "Launch Message" : "Initialize Contact"}
					{isFull ? <span aria-hidden='true'>-&gt;</span> : null}
				</Button>

				{showFooter ? (
					<div className='border-t border-border pt-5'>
						<div className='grid gap-3 sm:grid-cols-2'>
							<div className='grid gap-2'>
								<p className='text-sm leading-6 text-muted'>Prefer to talk instead?</p>

								<Modal isOpen={bookingOpen} onOpenChange={setBookingOpen}>
									<Button fullWidth size='md' variant='secondary'>
										<Calendar aria-hidden className='size-4' />
										Book a video call
									</Button>

									<Modal.Backdrop variant='blur'>
										<Modal.Container size='lg'>
										<Modal.Dialog className='w-[min(960px,calc(100vw-2rem))] max-w-none overflow-hidden p-0'>
											<Modal.CloseTrigger className='right-4 top-4 z-10' />
											<Modal.Body className='p-0'>
												{morgenEmbedAllowed ? (
													<iframe src='https://book.morgen.so/thedannicraft/project-inquiry' width='100%' height='700px' style={{ border: "none" }} title='Book a project inquiry with TheDanniCraft' />
												) : (
													<div className='grid min-h-80 place-content-center gap-5 bg-surface p-8 text-center sm:p-12'>
														<div className='mx-auto max-w-xl'>
															<p className='text-xs font-bold uppercase tracking-[0.18em] text-accent'>External booking service</p>
															<h2 className='mt-3 text-2xl font-black sm:text-3xl'>Load Morgen booking?</h2>
															<p className='mt-4 leading-7 text-muted'>Loading the booking page connects your browser to Morgen AG. Morgen receives technical request data and may store browser data needed for the booking flow.</p>
															<a className='mt-3 inline-block font-bold text-accent hover:underline' href='https://www.morgen.so/privacy' rel='noreferrer' target='_blank'>Read Morgen&apos;s privacy policy</a>
														</div>
														<Button className='mx-auto min-h-11 px-6 font-black' onPress={reviewPrivacyChoices} variant='primary'>Review privacy choices</Button>
													</div>
												)}
											</Modal.Body>
											</Modal.Dialog>
										</Modal.Container>
									</Modal.Backdrop>
								</Modal>
							</div>

							<div className='grid gap-2'>
								<p className='text-sm leading-6 text-muted'>Prefer to write instead?</p>

								<Link href='mailto:projects@thedannicraft.de' className={`${buttonVariants({ variant: "secondary", size: "md" })} w-full justify-center`}>
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
