export type ProjectCategory = "web-apps" | "open-source" | "discord" | "experiments";
export type ProjectStatus = "active" | "maintained" | "completed" | "archived" | "retired";

export type ProjectLink = {
	label: string;
	href: string;
};

export type CaseStudy = {
	eyebrow: string;
	intro: string;
	challenge: string;
	approach: string;
	decisions: string[];
	result: string;
};

export type Project = {
	slug: string;
	title: string;
	summary: string;
	description: string;
	tags: string[];
	category: ProjectCategory;
	status: ProjectStatus;
	context: string;
	year: string;
	featured: boolean;
	image: string;
	imageAlt: string;
	imagePosition?: string;
	links: ProjectLink[];
	caseStudy?: CaseStudy;
};

export const projects: Project[] = [
	{
		slug: "clipify",
		title: "Clipify",
		summary: "A focused SaaS product that helps stream creators turn moments into shareable clips.",
		description: "An active SaaS product built around a clear creator workflow: capture the moment, refine it, and get it ready to share without unnecessary friction.",
		tags: ["SaaS", "Web App", "Creator Tools"],
		category: "web-apps",
		status: "active",
		context: "Independent SaaS",
		year: "2025—Now",
		featured: true,
		image: "/projects/clipify.png",
		imageAlt: "Clipify product artwork",
		imagePosition: "center",
		links: [{ label: "Visit Clipify", href: "https://clipify.us" }],
		caseStudy: {
			eyebrow: "Active SaaS",
			intro: "Clipify is a product for stream creators who want a shorter path from a live moment to a clip they can share.",
			challenge: "Clipping workflows can become fragmented across tools and manual steps. The product needed to keep the core journey understandable while leaving room for the service to grow.",
			approach: "I treated the workflow as a product rather than a collection of features, shaping the interface and implementation around the creator’s next decision at each step.",
			decisions: ["Keep the primary creator flow focused", "Build the interface and product system as one coherent experience", "Ship on a foundation that can continue evolving"],
			result: "A live SaaS product with a distinct identity, a focused user journey, and an architecture ready for continued development.",
		},
	},
	{
		slug: "activity-log",
		title: "activity-log",
		summary: "A maintained GitHub Action that keeps profile READMEs current with recent activity.",
		description: "A public GitHub Action for automatically adding recent account activity to a README, with configurable event limits and exclusions.",
		tags: ["GitHub Actions", "Automation", "Open Source"],
		category: "discord",
		status: "maintained",
		context: "Public open-source tool",
		year: "2024—Now",
		featured: true,
		image: "/projects/activity-log.jpeg",
		imageAlt: "activity-log GitHub Action artwork",
		imagePosition: "center",
		links: [{ label: "GitHub Marketplace", href: "https://github.com/marketplace/actions/readme-activity-update" }],
		caseStudy: {
			eyebrow: "Maintained Open Source",
			intro: "activity-log automates a small but repetitive job: keeping a GitHub profile README aligned with recent public activity.",
			challenge: "The action needed to turn different GitHub events into useful, predictable README content without taking control away from the repository owner.",
			approach: "I built the tool around configuration that stays compact: choose how much activity to show, exclude irrelevant event types, and let the workflow update the document automatically.",
			decisions: ["Fit naturally into GitHub Actions workflows", "Make event limits and exclusions explicit", "Keep the generated README output predictable"],
			result: "A published and actively maintained GitHub Marketplace action that developers can add directly to their own repositories.",
		},
	},
	{
		slug: "globaldiscord",
		title: "GlobalDiscord",
		summary: "A retired public bot that connected Discord communities and reached 10,000 users.",
		description: "A configurable global-chat platform with multiple rooms, moderation workflows, translated conversations, and presentation choices for participating servers.",
		tags: ["Discord.js", "Moderation", "10k Users"],
		category: "open-source",
		status: "retired",
		context: "Public Discord application",
		year: "2021—2023",
		featured: true,
		image: "/projects/globaldiscord.png",
		imageAlt: "GlobalDiscord project artwork",
		imagePosition: "center",
		links: [{ label: "Archived listing", href: "https://top.gg/bot/832303489027276800" }],
		caseStudy: {
			eyebrow: "Retired Public Platform",
			intro: "GlobalDiscord connected conversations across Discord servers through configurable global chat rooms and a shared moderation layer.",
			challenge: "Messages crossed independent communities, so the system had to balance ease of setup with moderation, presentation preferences, and controls that worked across server boundaries.",
			approach: "The bot used a slash-command interface, configurable embed or webhook presentation, multiple chat rooms, translation features, and moderator actions that propagated across the network.",
			decisions: ["Centralize cross-server moderation tools", "Let communities choose how shared messages appear", "Keep setup approachable through Discord-native commands"],
			result: "The public application reached Discord’s 10,000-user verification threshold before the project was eventually retired.",
		},
	},
	{
		slug: "wiresense",
		title: "Wiresense",
		summary: "A collaborative school project for viewing live sensor data without a directly connected PC.",
		description: "A browser-based sensor visualization project created in a school team, designed to make incoming measurements easier to access and understand.",
		tags: ["School Project", "Sensors", "Visualization"],
		category: "experiments",
		status: "completed",
		context: "Collaborative school project",
		year: "2024",
		featured: true,
		image: "/projects/wiresense.jpg",
		imageAlt: "Wiresense sensor visualization artwork",
		links: [{ label: "View organization", href: "https://github.com/Wiresense/" }],
	},
	{
		slug: "flagsvg",
		title: "FlagSVG",
		summary: "A straightforward collection of country flags served as reusable SVG assets.",
		description: "A public utility repository that makes country flag assets easy to reference directly in other projects.",
		tags: ["SVG", "Utility", "Open Source"], category: "open-source", status: "maintained", context: "Public utility", year: "2025—Now", featured: false,
		image: "/projects/flagsvg.svg", imageAlt: "FlagSVG project artwork", links: [{ label: "View repository", href: "https://github.com/TheDanniCraft/FlagSVG/" }],
	},
	{
		slug: "terminal-website",
		title: "Terminal Website",
		summary: "A terminal-inspired React website deployed through GitHub Pages.",
		description: "An interface experiment that translates terminal interaction patterns into a navigable personal website.",
		tags: ["React", "Website", "Experiment"], category: "experiments", status: "completed", context: "Interface experiment", year: "2024", featured: false,
		image: "/projects/terminal.png", imageAlt: "Terminal Website project artwork", links: [{ label: "View repository", href: "https://github.com/TheDanniCraft/TerminalWebsite" }],
	},
	{
		slug: "monsterbattle-cards",
		title: "MonsterBattle Cards",
		summary: "A card-battling game created in four days for a game jam.",
		description: "A compact Unity project built under a four-day deadline, combining card choices with turn-based encounters.",
		tags: ["Unity", "C#", "Game Jam"], category: "experiments", status: "completed", context: "Four-day game jam", year: "2024", featured: false,
		image: "/projects/monsterbattle.png", imageAlt: "MonsterBattle Cards project artwork", links: [{ label: "Play on itch.io", href: "https://thedannicraft.itch.io/monsterbattle-cards" }],
	},
	{
		slug: "time-kills-you",
		title: "Time Kills You",
		summary: "A four-day collaborative game-jam project about racing against time.",
		description: "A puzzle-driven Unity game made with a teammate under a short game-jam deadline.",
		tags: ["Unity", "C#", "Game Jam"], category: "experiments", status: "completed", context: "Collaborative four-day game jam", year: "2024", featured: false,
		image: "/projects/time-kills-you.png", imageAlt: "Time Kills You project artwork", links: [{ label: "Play on itch.io", href: "https://thedannicraft.itch.io/time-kills-you" }],
	},
	{
		slug: "quickdrop",
		title: "Quickdrop",
		summary: "A purpose-built file-sharing tool that helped children take their digital work home.",
		description: "Created during my FSJ to give children a simple way to transfer the digital projects they made and continue using them at home.",
		tags: ["Web App", "File Sharing", "FSJ"], category: "web-apps", status: "completed", context: "Purpose-built FSJ project", year: "2025", featured: false,
		image: "/projects/quickdrop.svg", imageAlt: "Quickdrop project artwork", links: [],
	},
	{
		slug: "gamerforge-system",
		title: "GamerForge System",
		summary: "The first released bot project, built for the GamerForge community.",
		description: "A Discord.js bot that supported community workflows and became the foundation for continued bot development.",
		tags: ["Discord.js", "Node.js", "Community"], category: "discord", status: "archived", context: "GamerForge community system", year: "2021", featured: false,
		image: "/projects/gamerforge.png", imageAlt: "GamerForge System project artwork", links: [],
	},
];

export const caseStudyProjects = projects.filter((project) => project.caseStudy);

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}
