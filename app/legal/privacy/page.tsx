import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: "How TheDanniCraft processes personal data on this website.",
	alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
	return (
		<LegalPage
			activePath='/legal/privacy'
			eyebrow='Legal'
			title='Privacy Policy'
			intro='This policy explains what data is processed when you visit this portfolio, send a project inquiry, or open an optional third-party booking surface.'
			sections={[
				{
					title: "1. Controller",
					content: <><p>Daniel Trui, Frankenweg 12, 75438 Knittlingen, Germany.</p><p>Privacy questions and requests can be sent to <a className='font-bold text-accent hover:underline' href='mailto:mail@thedannicraft.de'>mail@thedannicraft.de</a>.</p></>,
				},
				{
					title: "2. Website delivery and security",
					content: <p>When the website is requested, the hosting infrastructure necessarily processes technical request data such as the requested URL, timestamp, IP address, user agent, and response status. This processing is required to deliver the site, maintain security, diagnose faults, and prevent abuse. The legal basis is Article 6(1)(f) GDPR.</p>,
				},
				{
					title: "3. Privacy-friendly analytics",
					content: <p>This website uses a self-hosted Plausible Analytics instance at analytics.thedannicraft.de to understand aggregate traffic. Plausible does not set cookies or persistent browser identifiers. It processes page paths, referral information, device and browser categories, and an approximate location derived from request data; raw IP addresses are not retained by Plausible. The legal basis is Article 6(1)(f) GDPR, based on the legitimate interest in understanding and improving the website.</p>,
				},
				{
					title: "4. Project inquiries",
					content: <><p>If you use the inquiry form, the submitted name, email address, subject, and message are processed by this application and stored in the self-hosted Chatwoot communication system so the request can be reviewed and answered. Chatwoot may use the supplied email address to continue the conversation by email when you are no longer active in the chat. A self-hosted Cap challenge verifies that the submission is made by a person and passes a short-lived verification token to the server.</p><p>The legal basis is Article 6(1)(b) GDPR for steps requested before a possible contract and Article 6(1)(f) GDPR for abuse prevention. Inquiry data is retained for as long as needed to handle the conversation and, where applicable, to meet statutory record-keeping or defend legal claims.</p></>,
				},
				{
					title: "5. Optional booking embed",
					content: <p>The contact page can open a booking interface provided by Morgen. The embed is loaded only after you grant optional functionality consent through c15t. At that point, Morgen receives the technical request data needed to deliver the interface and may process booking information you submit under <a className='font-bold text-accent hover:underline' href='https://www.morgen.so/privacy' rel='noreferrer' target='_blank'>Morgen&apos;s privacy policy</a>. You can withdraw the optional choice at any time through Cookie preferences in the footer.</p>,
				},
				{
					title: "6. External destinations",
					content: <p>Links to services such as GitHub, LinkedIn, the Elgato Marketplace, itch.io, the public status page, and the external blog leave this website. Those providers process subsequent requests under their own privacy policies.</p>,
				},
				{
					title: "7. Your rights",
					content: <><p>Subject to the applicable requirements, you may request access, correction, deletion, restriction, portability, or object to processing. Where processing relies on consent, consent can be withdrawn for the future.</p><p>You may also lodge a complaint with a data-protection supervisory authority. The competent authority in Baden-Württemberg is the State Commissioner for Data Protection and Freedom of Information Baden-Württemberg.</p></>,
				},
				{
					title: "8. Recipients and transfers",
					content: <><p>Personal data is disclosed only where needed to operate the site, answer a request, comply with law, or protect legal rights. Relevant recipients can include the site’s hosting infrastructure, the self-hosted Chatwoot and Cap services, the configured email-delivery infrastructure when a conversation continues by email, Morgen when you open and use the booking interface, and professional advisers or authorities where legally required.</p><p>If a provider processes data outside the EU or EEA, an applicable adequacy decision, the EU Standard Contractual Clauses, or another legally permitted safeguard is used where required.</p></>,
				},
				{
					title: "9. Retention",
					content: <p>Personal data is kept only for the purpose for which it was collected, active correspondence, security, or an applicable legal retention period. The local c15t privacy choice expires after six months so a renewed choice can be requested. Operational logs and challenge tokens are rotated according to their security purpose. Inquiry records are deleted when they are no longer needed unless commercial, tax, dispute, or statutory obligations require longer retention. Residual copies may remain in restricted backups until overwritten.</p>,
				},
				{
					title: "10. Automated decisions and children",
					content: <><p>This website does not use personal data for solely automated decisions that produce legal or similarly significant effects.</p><p>The portfolio is not directed specifically at children. If you believe a child submitted personal data without the required authorization, contact the controller so the request can be reviewed.</p></>,
				},
				{
					title: "11. Policy changes",
					content: <p>This policy is updated when the website, its providers, or applicable requirements materially change. The version and effective date at the top identify the current document.</p>,
				},
			]}
		/>
	);
}
