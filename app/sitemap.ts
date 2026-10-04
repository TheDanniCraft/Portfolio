import type { MetadataRoute } from "next";
import { caseStudyProjects } from "@/lib/projects";

const baseUrl = "https://thedannicraft.de";

export default function sitemap(): MetadataRoute.Sitemap {
	const staticRoutes = ["", "/work", "/case-studies", "/contact", "/legal/imprint", "/legal/privacy", "/legal/cookies", "/legal/privacy-requests"];
	const caseStudies = caseStudyProjects.map((project) => `/work/${project.slug}`);

	return [...staticRoutes, ...caseStudies].map((path) => ({
		url: `${baseUrl}${path}`,
		lastModified: new Date(),
	}));
}
