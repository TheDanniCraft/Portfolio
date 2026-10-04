import type { Metadata } from "next";
import { CookiePreferencesButton } from "@/components/consent-manager";
import { LegalPage } from "@/components/legal-page";
import { necessaryConsentServices, optionalConsentServices, type ConsentService } from "@/lib/consent-services";

export const metadata: Metadata = {
	title: "Storage & Cookies",
	description: "Browser storage and cookie information for TheDanniCraft.",
	alternates: { canonical: "/legal/cookies" },
};

const storageServices = [...necessaryConsentServices, ...optionalConsentServices];

function StorageServiceCard({ service }: { service: ConsentService }) {
	const details = [
		{ label: "Provider", value: service.provider },
		{ label: "Storage", value: service.storage },
		{ label: "Purpose", value: service.purpose },
		{ label: "Retention", value: service.retention },
	];

	return (
		<article className='overflow-hidden border border-border bg-surface text-foreground'>
			<div className='flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6'>
				<div className='min-w-0'>
					<h3 className='text-xl font-black'>{service.name}</h3>
					<p className='mt-2 max-w-2xl leading-7 text-muted'>{service.description}</p>
					{service.privacyUrl ? <a className='mt-3 inline-block font-bold text-accent hover:underline' href={service.privacyUrl} rel='noreferrer' target='_blank'>Privacy policy</a> : null}
				</div>
				<span className='w-fit shrink-0 border border-border bg-background px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted'>{service.category === "functionality" ? "Optional" : "Always active"}</span>
			</div>
			<dl className='grid border-t border-border bg-background/40 sm:grid-cols-2'>
				{details.map((detail, index) => (
					<div className={`p-5 sm:p-6 ${index > 0 ? "border-t border-border" : ""} ${index === 1 ? "sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l sm:border-border" : ""}`} key={detail.label}>
						<dt className='text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-accent'>{detail.label}</dt>
						<dd className='mt-2 leading-7 text-muted'>{detail.value}</dd>
					</div>
				))}
			</dl>
		</article>
	);
}

export default function CookiesPage() {
	return (
		<LegalPage
			activePath='/legal/cookies'
			eyebrow='Legal'
			title='Storage & Cookies'
			intro='A plain-language record of the browser storage and external services used by this portfolio, when they activate, and what choices you have.'
			sections={[
				{
					title: "What is stored in your browser",
					content: <><p>Cookies are small records a website can ask a browser to store. Local storage and short-lived challenge tokens serve similar technical purposes, but they are not all cookies.</p><p>This portfolio does not use advertising cookies, build cross-site profiles, or sell browsing activity. It stores a theme preference, protects the inquiry form against abuse, and measures aggregate traffic without placing an analytics cookie.</p></>,
				},
				{
					title: "How optional consent works",
					content: <><p>The services loaded by default are limited to privacy and interface preferences, protected forms, and cookieless aggregate measurement. The external booking interface remains blocked until functionality consent is granted through c15t.</p><p>The consent banner and preference center let you accept, reject, or later change optional choices. No advertising or behavioral-tracking category is currently used.</p></>,
				},
				{
					title: "Service and storage inventory",
					content: <div className='grid gap-5'>{storageServices.map((service) => <StorageServiceCard key={service.name} service={service} />)}</div>,
				},
				{
					title: "Your choices",
					content: <><p>You can change optional choices at any time. Withdrawing functionality consent prevents the Morgen embed from loading again after c15t applies the updated preference.</p><CookiePreferencesButton className='w-fit border border-border bg-surface px-4 py-2 text-sm font-bold text-foreground hover:border-accent hover:text-accent' /><p>You can also clear this site&apos;s browser storage. Blocking necessary storage may prevent privacy preferences, protected forms, or interface settings from working as expected.</p></>,
				},
			]}
		/>
	);
}
