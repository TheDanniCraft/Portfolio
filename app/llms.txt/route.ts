import { siteDescription, siteUrl } from "@/lib/metadata";
import { caseStudyProjects } from "@/lib/projects";

export const dynamic = "force-static";

export function GET() {
	const caseStudies = caseStudyProjects.map((project) =>
		`- [${project.title}](${siteUrl}/work/${project.slug}): ${project.summary}`,
	);
	const content = [
		"# TheDanniCraft",
		"",
		`> ${siteDescription}`,
		"",
		"The portfolio of Daniel Trui, an independent product engineer based in Hockenheim, Germany. Work includes web applications, developer tools, games, and automation. For project inquiries, use the contact page.",
		"",
		"## Main pages",
		"",
		`- [Home](${siteUrl}/): Introduction and capabilities.`,
		`- [Selected work](${siteUrl}/work): Full project catalog, including current status and technology choices.`,
		`- [Case studies](${siteUrl}/case-studies): Engineering approaches, architecture, decisions, and outcomes.`,
		`- [Contact](${siteUrl}/contact): Project inquiries and professional profiles.`,
		"",
		"## Project case studies",
		"",
		...caseStudies,
		"",
		"## Optional",
		"",
		`- [Sitemap](${siteUrl}/sitemap.xml): Canonical public page URLs.`,
		`- [Imprint](${siteUrl}/legal/imprint): Provider information.`,
		`- [Privacy policy](${siteUrl}/legal/privacy): Personal data handling.`,
		`- [Storage and cookies](${siteUrl}/legal/cookies): Browser storage and privacy preferences.`,
		`- [Privacy requests](${siteUrl}/legal/privacy-requests): How to exercise privacy rights.`,
		"",
	].join("\n");

	return new Response(content, {
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
