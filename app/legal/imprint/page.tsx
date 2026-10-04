import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
	title: "Imprint",
	description: "Provider and contact information for TheDanniCraft.",
	alternates: { canonical: "/legal/imprint" },
};

export default function ImprintPage() {
	return (
		<LegalPage
			activePath='/legal/imprint'
			eyebrow='Legal'
			title='Imprint'
			intro='Provider information for this website in accordance with Section 5 of the German Digital Services Act (DDG).'
			sections={[
				{
					title: "Service provider",
					content: (
						<address className='not-italic'>
							<p>Daniel Trui</p>
							<p>Frankenweg 12</p>
							<p>75438 Knittlingen</p>
							<p>Germany</p>
						</address>
					),
				},
				{
					title: "Contact",
					content: <><p>Email: <a className='font-bold text-accent hover:underline' href='mailto:mail@thedannicraft.de'>mail@thedannicraft.de</a></p><p>Phone: <a className='font-bold text-accent hover:underline' href='tel:+4917666330972'>+49 176 66330972</a></p></>,
				},
				{
					title: "VAT identification number",
					content: <p>VAT identification number pursuant to Section 27a German VAT Act: DE420613306</p>,
				},
				{
					title: "Responsible for editorial content",
					content: <p>Daniel Trui, address as stated above.</p>,
				},
				{
					title: "Consumer dispute resolution",
					content: <p>I am not willing or obliged to participate in dispute-resolution proceedings before a consumer arbitration board.</p>,
				},
				{
					title: "Liability for content",
					content: <p>As a service provider, I am responsible for my own content under general law. I am not generally obliged to monitor transmitted or stored third-party information or investigate circumstances indicating unlawful activity. Obligations to remove or block information under general law remain unaffected.</p>,
				},
				{
					title: "Liability for external links",
					content: <p>This website contains links to external websites whose content I do not control. The respective provider is responsible for that content. If I become aware of a specific legal infringement, I will remove the affected link where required.</p>,
				},
				{
					title: "Copyright",
					content: <p>Original content and works created for this portfolio are protected by applicable copyright law. Reproduction, editing, distribution, or other use outside statutory limitations requires permission from the respective rights holder. Third-party content remains subject to the rights and licenses identified for it.</p>,
				},
			]}
		/>
	);
}
