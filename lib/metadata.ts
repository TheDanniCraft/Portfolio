import type { Metadata } from "next";

export const siteUrl = "https://thedannicraft.de";
export const siteTitle = "TheDanniCraft · Product Engineering & Systems";
export const siteDescription = "Independent product engineering, system architecture, automation, and open-source work by TheDanniCraft.";

const socialImage = {
	url: "/og/portfolio-v4.png",
	width: 1200,
	height: 630,
	type: "image/png",
	alt: "TheDanniCraft — Your idea. Built to work. Websites, apps, games, and automation by Daniel Trui. Start a project at thedannicraft.de/contact.",
};

export function pageMetadata(path: string, title: string, description: string): Metadata {
	const socialTitle = path === "/" ? title : `${title} · TheDanniCraft`;
	return {
		title: path === "/" ? { absolute: title } : title,
		description,
		alternates: { canonical: path },
		openGraph: {
			type: "website",
			locale: "en_US",
			siteName: "TheDanniCraft",
			url: path,
			title: socialTitle,
			description,
			images: [socialImage],
		},
		twitter: {
			card: "summary_large_image",
			title: socialTitle,
			description,
			images: [{ url: socialImage.url, alt: socialImage.alt }],
		},
	};
}
