import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
	title: "Privacy Requests",
	description: "How to exercise privacy rights concerning TheDanniCraft.",
	alternates: { canonical: "/legal/privacy-requests" },
};

export default function PrivacyRequestsPage() {
	return (
		<LegalPage
			activePath='/legal/privacy-requests'
			eyebrow='Legal'
			title='Privacy Requests'
			intro='Use this process to request access, correction, deletion, portability, restriction, object to processing, or ask a privacy question.'
			sections={[
				{
					title: "Submit a request",
					content: <p>Email <a className='font-bold text-accent hover:underline' href='mailto:mail@thedannicraft.de?subject=Privacy%20request'>mail@thedannicraft.de</a> with the subject “Privacy request”. Describe the right you want to exercise and the website interaction or inquiry concerned. Do not send identity documents, passwords, or access tokens in the first message.</p>,
				},
				{
					title: "Identity verification",
					content: <p>Only information proportionate to the request will be used to verify identity. Additional information may be requested when it is reasonably necessary to prevent disclosure or deletion of another person’s data.</p>,
				},
				{
					title: "Timing and cost",
					content: <p>A response is normally provided within one month after a complete request is received. That period may be extended where the GDPR permits it, with an explanation. Requests are generally handled without charge unless the law permits a reasonable fee or refusal for manifestly unfounded or excessive requests.</p>,
				},
				{
					title: "Complaints",
					content: <p>You may lodge a complaint with the supervisory authority responsible for your residence, workplace, or the alleged infringement. For the controller’s German establishment, the competent authority is the State Commissioner for Data Protection and Freedom of Information Baden-Württemberg.</p>,
				},
			]}
		/>
	);
}
