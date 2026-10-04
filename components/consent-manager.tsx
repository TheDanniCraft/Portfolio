"use client";

import type { Key } from "@heroui/react";
import type { ReactNode } from "react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ConsentManagerProvider, policyPackPresets, useConsentManager } from "@c15t/nextjs";
import { useHeadlessConsentUI } from "@c15t/nextjs/headless";
import { Accordion, Button, Card, Modal, Switch } from "@heroui/react";
import { Check, ChevronDown, Database, FloppyDisk, Gear, Globe, Lock, ShieldCheck, Xmark } from "@gravity-ui/icons";
import { consentCategoryDetails, necessaryConsentServices, optionalConsentServices, type ConsentCategory } from "@/lib/consent-services";
import { OPEN_CONSENT_PREFERENCES_EVENT, type OpenConsentPreferencesDetail } from "@/lib/consent-events";

const europePolicy = policyPackPresets.europeOptIn();
const portfolioPolicy = {
	...europePolicy,
	consent: { ...europePolicy.consent, expiryDays: 180 },
};

const subscribeToHydration = () => () => undefined;
const getHydratedSnapshot = () => true;
const getServerHydratedSnapshot = () => false;

function ConsentInterface() {
	const hydrated = useSyncExternalStore(subscribeToHydration, getHydratedSnapshot, getServerHydratedSnapshot);
	const { banner, dialog, openBanner, openDialog, closeUI, performBannerAction, performDialogAction, saveCustomPreferences } = useHeadlessConsentUI();
	const { consents, selectedConsents, setSelectedConsent, getDisplayedConsents, hasConsented } = useConsentManager();
	const [pendingAction, setPendingAction] = useState<string | null>(null);
	const [returnToBanner, setReturnToBanner] = useState(false);
	const [expandedCategories, setExpandedCategories] = useState<Set<Key>>(new Set());
	const [saveError, setSaveError] = useState<string | null>(null);
	const pending = pendingAction !== null;

	useEffect(() => {
		function openRequestedPreferences(event: Event) {
			const detail = (event as CustomEvent<OpenConsentPreferencesDetail>).detail;
			setReturnToBanner(!hasConsented());
			setExpandedCategories(detail?.category ? new Set([detail.category]) : new Set());
		}

		window.addEventListener(OPEN_CONSENT_PREFERENCES_EVENT, openRequestedPreferences);
		return () => window.removeEventListener(OPEN_CONSENT_PREFERENCES_EVENT, openRequestedPreferences);
	}, [hasConsented]);

	if (!hydrated) return null;

	async function save(actionName: "accept" | "reject" | "save", action: () => Promise<unknown>) {
		setPendingAction(actionName);
		setSaveError(null);
		try {
			await action();
			setReturnToBanner(false);
		} catch {
			setSaveError("Your privacy choice could not be saved. Please try again.");
		} finally {
			setPendingAction(null);
		}
	}

	function showPreferencesFromBanner() {
		setReturnToBanner(true);
		setExpandedCategories(new Set());
		openDialog();
	}

	function leavePreferences() {
		if (returnToBanner) {
			setReturnToBanner(false);
			openBanner({ force: true });
			return;
		}
		closeUI();
	}

	if (dialog.isVisible) {
		return (
			<Modal.Backdrop className='z-[110] bg-black/70' isOpen onOpenChange={(isOpen) => !isOpen && leavePreferences()} variant='blur'>
				<Modal.Container placement='center' scroll='inside' size='lg'>
					<Modal.Dialog aria-describedby='consent-dialog-description' aria-labelledby='consent-dialog-title' className='overflow-hidden border border-border bg-surface shadow-2xl'>
						<Modal.CloseTrigger aria-label='Close privacy preferences' />
						<Modal.Header className='flex-row items-center gap-3 border-b border-border px-5 py-4 pr-14 sm:px-6 sm:pr-14'>
							<Modal.Icon className='shrink-0 bg-accent/10 text-accent'>
								<ShieldCheck className='size-5' aria-hidden='true' />
							</Modal.Icon>
							<Modal.Heading id='consent-dialog-title'>Privacy preferences</Modal.Heading>
						</Modal.Header>
						<Modal.Body className='space-y-4 px-4 py-4 sm:px-6'>
							<p id='consent-dialog-description' className='text-sm leading-6 text-muted'>Choose which optional categories this portfolio may use. Expand a category to see every service, provider, storage method, and scope.</p>
							<Accordion className='w-full overflow-hidden rounded-xl border border-border' expandedKeys={expandedCategories} onExpandedChange={setExpandedCategories} variant='surface'>
								{getDisplayedConsents().map((type) => {
									const category = type.name as ConsentCategory;
									const details = consentCategoryDetails[category];
									const necessary = category === "necessary";
									const selected = necessary || (selectedConsents[type.name] ?? consents[type.name] ?? false);
									const services = necessary ? necessaryConsentServices : optionalConsentServices.filter((service) => service.category === category);
									const CategoryIcon = necessary ? Lock : Gear;

									return (
										<Accordion.Item id={type.name} key={type.name}>
											<div className='group flex min-h-12 items-center gap-3 px-3 transition-colors hover:bg-background/55 sm:px-4'>
												<Accordion.Heading className='min-w-0 flex-1'>
													<Accordion.Trigger className='gap-2.5 py-3 hover:bg-transparent'>
														<CategoryIcon className={`size-4 shrink-0 ${necessary ? "text-success" : "text-muted"}`} aria-hidden='true' />
														<span className='min-w-0 flex-1 text-left text-sm font-bold'>{details.title}</span>
														{necessary ? <span className='hidden text-xs text-muted sm:inline'>Always active</span> : null}
														<Accordion.Indicator><ChevronDown className='size-4' aria-hidden='true' /></Accordion.Indicator>
													</Accordion.Trigger>
												</Accordion.Heading>
												<Switch aria-label={`Allow ${details.title}`} isDisabled={necessary || pending} isSelected={selected} onChange={(value) => setSelectedConsent(type.name, value)}>
													<Switch.Content><Switch.Control><Switch.Thumb /></Switch.Control></Switch.Content>
												</Switch>
											</div>
											<Accordion.Panel>
												<Accordion.Body className='space-y-3 px-4 pb-4 pt-0'>
													<p className='text-xs leading-5 text-muted'>{details.description}</p>
													<ul className='space-y-2'>
														{services.map((service) => (
															<li className='rounded-lg border border-border bg-surface px-3 py-2.5' key={service.id}>
																<div className='flex items-start justify-between gap-3'>
																	<div>
																		<span className='text-sm font-bold'>{service.name}</span>
																		<p className='mt-1 text-xs leading-5 text-muted'>{service.description}</p>
																	</div>
																	{service.privacyUrl ? <a className='shrink-0 text-xs font-bold text-accent underline underline-offset-2' href={service.privacyUrl} rel='noreferrer' target='_blank'>Privacy</a> : null}
																</div>
																<dl className='mt-2 flex flex-wrap gap-1.5 text-xs text-muted'>
																	<div className='flex min-w-0 items-center gap-1 rounded-md bg-background/70 px-2 py-1' title={`Provider: ${service.provider}`}><ShieldCheck className='size-3.5 shrink-0' aria-hidden='true' /><dt className='sr-only'>Provider</dt><dd className='truncate'>{service.provider}</dd></div>
																	<div className='flex min-w-0 items-center gap-1 rounded-md bg-background/70 px-2 py-1' title={`Storage: ${service.storage}`}><Database className='size-3.5 shrink-0' aria-hidden='true' /><dt className='sr-only'>Storage</dt><dd className='truncate'>{service.storage}</dd></div>
																	<div className='flex min-w-0 items-center gap-1 rounded-md bg-background/70 px-2 py-1' title={`Scope: ${service.scope}`}><Globe className='size-3.5 shrink-0' aria-hidden='true' /><dt className='sr-only'>Scope</dt><dd className='truncate'>{service.scope}</dd></div>
																</dl>
															</li>
														))}
													</ul>
												</Accordion.Body>
											</Accordion.Panel>
										</Accordion.Item>
									);
								})}
							</Accordion>
							{saveError ? <p className='text-sm font-bold text-danger' role='alert'>{saveError}</p> : null}
						</Modal.Body>
						<Modal.Footer className='flex flex-col gap-2 border-t border-border px-4 py-4 sm:flex-row sm:justify-center sm:px-6'>
							<Button isDisabled={pending} isPending={pendingAction === "reject"} onPress={() => void save("reject", () => performDialogAction("reject"))} variant='secondary'><Xmark className='size-4' aria-hidden='true' />Reject optional</Button>
							<Button isDisabled={pending} isPending={pendingAction === "save"} onPress={() => void save("save", saveCustomPreferences)} variant='secondary'><FloppyDisk className='size-4' aria-hidden='true' />Save choices</Button>
							<Button isDisabled={pending} isPending={pendingAction === "accept"} onPress={() => void save("accept", () => performDialogAction("accept"))} variant='primary'><Check className='size-4' aria-hidden='true' />Accept all</Button>
						</Modal.Footer>
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		);
	}

	if (!banner.isVisible) return null;

	return (
		<aside aria-labelledby='consent-banner-title' className='fixed inset-x-3 bottom-3 z-[100]'>
			<Card className='mx-auto w-full max-w-[1280px] overflow-hidden border border-border bg-surface/95 shadow-2xl backdrop-blur-xl'>
				<div className='grid gap-3 p-3 sm:p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-5'>
					<div className='flex min-w-0 items-center gap-3'>
						<div className='hidden size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent sm:flex'><ShieldCheck className='size-5' aria-hidden='true' /></div>
						<div className='min-w-0'>
							<h2 className='text-sm font-bold sm:text-base' id='consent-banner-title'>Your privacy choices</h2>
							<p className='mt-0.5 text-xs leading-5 text-muted sm:text-sm'>Optional functionality stays off until you choose. Essential security and cookieless analytics remain active. <a className='font-bold text-foreground underline underline-offset-2' href='/legal/privacy'>Privacy</a> <span aria-hidden='true'>·</span> <a className='font-bold text-foreground underline underline-offset-2' href='/legal/cookies'>Cookies</a></p>
						</div>
					</div>
					<div className='grid gap-2 sm:grid-cols-3 lg:flex lg:items-center'>
						<Button isDisabled={pending} onPress={showPreferencesFromBanner} size='sm' variant='secondary'><Gear className='size-4' aria-hidden='true' />Preferences</Button>
						<Button isDisabled={pending} isPending={pendingAction === "reject"} onPress={() => void save("reject", () => performBannerAction("reject"))} size='sm' variant='secondary'>Reject optional</Button>
						<Button isDisabled={pending} isPending={pendingAction === "accept"} onPress={() => void save("accept", () => performBannerAction("accept"))} size='sm' variant='primary'>Accept all</Button>
					</div>
					{saveError ? <p className='text-sm font-bold text-danger lg:col-span-2' role='alert'>{saveError}</p> : null}
				</div>
			</Card>
		</aside>
	);
}

export function CookiePreferencesButton({ className }: { className?: string }) {
	const { openDialog } = useHeadlessConsentUI();
	return <button className={className} onClick={openDialog} type='button'>Cookie preferences</button>;
}

export function ConsentManager({ children }: { children: ReactNode }) {
	return (
		<ConsentManagerProvider
			options={{
				mode: "offline",
				consentCategories: ["necessary", "functionality"],
				offlinePolicy: { policyPacks: [portfolioPolicy] },
				overrides: { country: "DE" },
			}}
		>
			<ConsentInterface />
			{children}
		</ConsentManagerProvider>
	);
}
