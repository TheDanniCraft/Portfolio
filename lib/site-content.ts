import { Compass, Speedometer, Rocket, Server, Thunderbolt, TargetDart } from "@gravity-ui/icons";
import type { IconType } from "@icons-pack/react-simple-icons";
import {
	SiTypescript,
	SiJavascript,
	SiHtml5,
	SiCss,
	SiReact,
	SiNextdotjs,
	SiTailwindcss,
	SiNodedotjs,
	SiDiscorddotjs,
	SiPostgresql,
	SiMysql,
	SiDocker,
	SiNginx,
	SiCloudflare,
	SiGit,
	SiGithub,
	SiFigma,
	SiEslint,
	SiLinux,
	SiGnubash,
	SiMarkdown,
	SiPocketbase,
	SiCoolify,
	SiGitforwindows,
	SiWordpress,
	SiDotenv,
	SiApache,
	SiDrizzle,
	SiExpress,
	SiGithubactions,
	SiGitlab,
	SiOpenapiinitiative,
	SiPnpm,
	SiPrettier,
	SiZapier,
	SiSap,
	SiGoogletranslate,
	SiGoogletranslateHex,
	SiApacheHex,
	SiCloudflareHex,
	SiCoolifyHex,
	SiCssHex,
	SiDiscorddotjsHex,
	SiDockerHex,
	SiDotenvHex,
	SiDrizzleHex,
	SiEslintHex,
	SiExpressHex,
	SiFigmaHex,
	SiGitforwindowsHex,
	SiGitHex,
	SiGithubactionsHex,
	SiGitlabHex,
	SiGnubashHex,
	SiHtml5Hex,
	SiJavascriptHex,
	SiLinuxHex,
	SiMantine,
	SiMantineHex,
	SiMarkdownHex,
	SiMysqlHex,
	SiNextdotjsHex,
	SiNginxHex,
	SiNodedotjsHex,
	SiOpenapiinitiativeHex,
	SiPnpmHex,
	SiPocketbaseHex,
	SiPostgresqlHex,
	SiPrettierHex,
	SiReactHex,
	SiSapHex,
	SiTailwindcssHex,
	SiTypescriptHex,
	SiVuedotjs,
	SiVuedotjsHex,
	SiWordpressHex,
	SiZapierHex,
	SiNuxt,
	SiNuxtHex,
	SiN8n,
	SiN8nHex,
} from "@icons-pack/react-simple-icons";

export type AvailabilityState = "available" | "limited" | "booked";

export const profile = {
	name: "TheDanniCraft",
	location: "Hockenheim, DE",
	focus: "Architecture",
	headline: "I build resilient digital structures.",
	subtitle: "Building digital empires with technical precision, creative problem-solving, and systems that stay fast, coherent, and maintainable as they grow.",
	portrait: "/portrait.webp",
};

export const availability = {
	state: "available" as AvailabilityState,
	label: "Available",
	shortLabel: "Available",
	responseTime: "Open for project inquiries",
};

export const tools: Array<{ name: string; detail: string; icon: IconType; color: string }> = [
	// Core Web Stack
	{ name: "TypeScript", detail: "Typed systems", icon: SiTypescript, color: SiTypescriptHex },
	{ name: "JavaScript", detail: "Core language", icon: SiJavascript, color: SiJavascriptHex },
	{ name: "HTML5", detail: "Markup", icon: SiHtml5, color: SiHtml5Hex },
	{ name: "CSS3", detail: "Styling", icon: SiCss, color: SiCssHex },
	{ name: "Markdown", detail: "Documentation", icon: SiMarkdown, color: SiMarkdownHex },

	// Frameworks & UI
	{ name: "React", detail: "UI architecture", icon: SiReact, color: SiReactHex },
	{ name: "Next.js", detail: "Web framework", icon: SiNextdotjs, color: SiNextdotjsHex },
	{ name: "Vue.js", detail: "Reactive UI", icon: SiVuedotjs, color: SiVuedotjsHex },
	{ name: "Nuxt", detail: "Vue framework", icon: SiNuxt, color: SiNuxtHex },
	{ name: "Tailwind CSS", detail: "Interface styling", icon: SiTailwindcss, color: SiTailwindcssHex },
	{ name: "Mantine", detail: "UI toolkit", icon: SiMantine, color: SiMantineHex },
	{ name: "HeroUI", detail: "Component system", icon: SiReact, color: "#000000" }, // no official icon

	// Backend & Runtime
	{ name: "Node.js", detail: "Runtime", icon: SiNodedotjs, color: SiNodedotjsHex },
	{ name: "Express", detail: "API services", icon: SiExpress, color: SiExpressHex },
	{ name: "discord.js", detail: "Bot systems", icon: SiDiscorddotjs, color: SiDiscorddotjsHex },
	{ name: "REST APIs", detail: "Service contracts", icon: SiOpenapiinitiative, color: SiOpenapiinitiativeHex },
	{ name: "Webhooks", detail: "Event pipelines", icon: SiZapier, color: SiZapierHex },
	{ name: "n8n", detail: "Workflow automation", icon: SiN8n, color: SiN8nHex },

	// Data Layer
	{ name: "PostgreSQL", detail: "Primary database", icon: SiPostgresql, color: SiPostgresqlHex },
	{ name: "MySQL", detail: "Relational DB", icon: SiMysql, color: SiMysqlHex },
	{ name: "Drizzle ORM", detail: "Type-safe queries", icon: SiDrizzle, color: SiDrizzleHex },
	{ name: "PocketBase", detail: "Light backend", icon: SiPocketbase, color: SiPocketbaseHex },

	// Infra & DevOps
	{ name: "Docker", detail: "Containerization", icon: SiDocker, color: SiDockerHex },
	{ name: "NGINX", detail: "Reverse proxy", icon: SiNginx, color: SiNginxHex },
	{ name: "Apache", detail: "Web server", icon: SiApache, color: SiApacheHex },
	{ name: "Cloudflare", detail: "Edge & DNS", icon: SiCloudflare, color: SiCloudflareHex },
	{ name: "Coolify", detail: "Self-hosting", icon: SiCoolify, color: SiCoolifyHex },

	// CI/CD & Version Control
	{ name: "Git", detail: "Version control", icon: SiGit, color: SiGitHex },
	{ name: "GitHub", detail: "Collaboration", icon: SiGithub, color: "#ffffff" },
	{ name: "GitHub Actions", detail: "CI/CD pipelines", icon: SiGithubactions, color: SiGithubactionsHex },
	{ name: "GitLab CI", detail: "Pipelines", icon: SiGitlab, color: SiGitlabHex },

	// Quality & Tooling
	{ name: "ESLint", detail: "Code quality", icon: SiEslint, color: SiEslintHex },
	{ name: "Prettier", detail: "Formatting", icon: SiPrettier, color: SiPrettierHex },
	{ name: "pnpm", detail: "Package manager", icon: SiPnpm, color: SiPnpmHex },
	{ name: ".env", detail: "Environment config", icon: SiDotenv, color: SiDotenvHex },

	// Systems & Platforms
	{ name: "Linux", detail: "Server systems", icon: SiLinux, color: SiLinuxHex },
	{ name: "Windows", detail: "Desktop systems", icon: SiGitforwindows, color: SiGitforwindowsHex },
	{ name: "Bash", detail: "Shell scripting", icon: SiGnubash, color: SiGnubashHex },

	// Product & Integration
	{ name: "Figma", detail: "Design systems", icon: SiFigma, color: SiFigmaHex },
	{ name: "WordPress", detail: "CMS systems", icon: SiWordpress, color: SiWordpressHex },
	{ name: "i18n", detail: "Localization systems", icon: SiGoogletranslate, color: SiGoogletranslateHex },
	{ name: "SAP", detail: "Enterprise systems", icon: SiSap, color: SiSapHex },
];

export const socialLinks = [
	{ label: "GitHub", href: "https://github.com/TheDanniCraft/" },
	{ label: "LinkedIn", href: "https://www.linkedin.com/in/thedannicraft/" },
	{ label: "Blog", href: "https://blog.thedannicraft.de/" },
];

export const capabilities = [
	{
		title: "Technical Advisory",
		description: "Strategic guidance, code audits, and fractional CTO support for scaling teams.",
		icon: Compass,
	},
	{
		title: "System Architecture",
		description: "Designing backend infrastructures that stay maintainable, fast, and robust.",
		icon: Server,
	},
	{
		title: "Custom Product Build",
		description: "End-to-end development of resilient MVPs and digital products built for scale.",
		icon: Rocket,
	},
	{
		title: "Workflow Automation",
		description: "Connecting APIs and building n8n pipelines to automate manual processes.",
		icon: Thunderbolt,
	},
	{
		title: "Performance Optimization",
		description: "Fast interfaces tuned for strong Core Web Vitals and smooth user journeys.",
		icon: Speedometer,
	},
	{
		title: "Technical SEO & Growth",
		description: "Post-launch strategies ensuring sites rank, perform, and convert efficiently.",
		icon: TargetDart,
	},
];

export const contactChannels = [
	{ title: "GitHub", description: "Review open-source architecture and shipped repos.", href: "https://github.com/TheDanniCraft/" },
	{ title: "LinkedIn", description: "Professional background and collaboration history.", href: "https://www.linkedin.com/in/thedannicraft/" },
	{ title: "Blog", description: "Technical notes, build logs, and engineering updates.", href: "https://blog.thedannicraft.de/" },
];
