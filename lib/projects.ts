export type ProjectCategory = "web-apps" | "open-source" | "discord" | "experiments";
export type ProjectStatus = "active" | "maintained" | "completed" | "archived" | "retired";

export type ProjectLink = {
	label: string;
	href: string;
};

export type CaseStudy = {
	eyebrow: string;
	intro: string;
	facts: Array<{ label: string; value: string }>;
	challenge: string;
	constraints: string[];
	approach: string;
	architecture: string[];
	decisions: Array<{ title: string; detail: string }>;
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
		summary: "A hosted Twitch product that keeps streams active by playing and controlling existing clips through browser-source overlays.",
		description: "A full-stack Twitch platform for overlays, clip playlists, live playback controls, channel point integrations, creator pages, and team workflows.",
		tags: ["Next.js", "Twitch", "SaaS"],
		category: "web-apps",
		status: "active",
		context: "Independent SaaS",
		year: "2025—Now",
		featured: true,
		image: "/projects/clipify-penpot.png",
		imageAlt: "Clipify dashboard presented in a custom project thumbnail",
		imagePosition: "center",
		links: [{ label: "Visit Clipify", href: "https://clipify.us" }],
		caseStudy: {
			eyebrow: "Active SaaS",
			intro: "Clipify is a hosted Twitch playback system for creators who want their existing clips to keep a stream active during breaks or unattended periods. A configured overlay runs as a browser source in streaming software, while the dashboard, playlists, channel-point integration, and remote controller manage what viewers see.",
			facts: [
				{ label: "Product", value: "Hosted SaaS" },
				{ label: "Primary surface", value: "OBS browser source" },
				{ label: "Source", value: "Open source" },
			],
			challenge: "A clip player looks simple in isolation, but a live-streaming product has several states that must agree. Creator configuration, Twitch events, a remote control surface, the playback queue, and the browser-source overlay all need to stay synchronized without asking a streamer to install or operate another local application.",
			constraints: [
				"The playback surface must work as a browser source inside common streaming software.",
				"Dashboard and remote-control actions must reach an already-running overlay with little friction.",
				"Twitch authentication, clip data, chat commands, and channel-point events depend on external APIs and event delivery.",
				"Free and paid capabilities need explicit entitlement checks without splitting the product into separate experiences.",
			],
			approach: "I separated the product into clear operating surfaces: a dashboard for durable configuration, a lightweight overlay for playback, and a live controller for moment-to-moment actions. Server-side resource boundaries connect overlays, playlists, queues, creators, and collaborators; real-time messages then carry only the state changes the active player needs.",
			architecture: [
				"Next.js application with typed server actions and a Drizzle-backed relational data model.",
				"Dedicated overlay and controller routes connected through a real-time WebSocket channel.",
				"Twitch authentication and EventSub-driven integrations for channel activity and rewards.",
				"Permission and entitlement boundaries for owners, collaborators, and plan-specific resources.",
			],
			decisions: [
				{ title: "Separate setup from live operation", detail: "The dashboard owns configuration; the controller exposes immediate playback actions; the overlay remains focused on rendering. Each surface stays legible for its actual job." },
				{ title: "Treat playback as shared state", detail: "Queues, mute and visibility changes, and manual clip actions are coordinated through server-side state and real-time messages instead of relying on one browser tab." },
				{ title: "Model access at the resource boundary", detail: "Overlay and playlist operations check ownership, collaborator permissions, and retained plan access so team workflows do not require account sharing." },
				{ title: "Keep the viewer-facing runtime lean", detail: "The browser source receives the information required to play and present clips while management, billing, and account concerns stay outside the broadcast surface." },
			],
			result: "Clipify ships as a hosted, open-source product with plug-and-play browser-source overlays, reusable playlists, multiple playback strategies, a live remote controller, Twitch channel-point integration, and collaborator workflows. The result is one coherent system spanning creator setup, event handling, playback, and live operation rather than a collection of disconnected streaming utilities.",
		},
	},
	{
		slug: "cs2-companion",
		title: "CS2 Companion",
		summary: "A local-first Counter-Strike 2 dashboard built for Stream Deck.",
		description: "Live match data, local session tracking, contextual round recaps, and quick-start profiles, with optional FACEIT and Leetify analytics in Pro.",
		tags: ["Stream Deck", "CS2", "Local-first"],
		category: "web-apps",
		status: "active",
		context: "Independent Stream Deck plugin",
		year: "2026—Now",
		featured: true,
		image: "/projects/cs2-companion.png",
		imageAlt: "CS2 Companion live match dashboard on Stream Deck",
		imagePosition: "center",
		links: [
			{ label: "View on Elgato", href: "https://marketplace.elgato.com/product/cs2-companion-b6381b73-7155-407a-b6df-b3efef0c9040" },
			{ label: "View Pro", href: "https://marketplace.elgato.com/product/cs2-companion-pro-6f0ccf42-6392-4979-b8a7-8389353255ab" },
		],
		caseStudy: {
			eyebrow: "Published Stream Deck Product",
			intro: "CS2 Companion turns a Stream Deck into a persistent, glanceable view of a Counter-Strike 2 match. It surfaces the state that normally requires returning to the game or opening another service, while keeping the core experience local and available even when the game is not the active window.",
			facts: [
				{ label: "Distribution", value: "Elgato Marketplace" },
				{ label: "Data source", value: "CS2 Game State Integration" },
				{ label: "Operating model", value: "Local-first" },
			],
			challenge: "Counter-Strike exposes useful live state, but that information is designed for the active game rather than a small secondary control surface. The product needed to translate a changing match payload into keys that remain legible at a glance, respond to different match phases, and continue to be useful when the player is tabbed out.",
			constraints: [
				"Stream Deck keys provide limited space, so each action needs a clear hierarchy and useful fallback state.",
				"Game State Integration exposes different values depending on the current round, player state, and spectating context.",
				"Setup must not require game injection, modification, or manual configuration beyond installing the plugin and restarting CS2.",
				"Provider credentials and local match history must remain on the user's machine.",
			],
			approach: "The plugin treats CS2's local Game State Integration feed as a stream of partial state rather than one fixed dashboard response. Each Stream Deck action selects the relevant value, presentation, and unavailable state for its key, while session tracking accumulates useful performance context locally. Optional provider integrations enrich that local view without becoming a dependency for the core product.",
			architecture: [
				"Automatic local Game State Integration setup connects CS2 to the plugin without modifying gameplay.",
				"A normalized match-state layer feeds health, armor, weapon, economy, score, phase, timer, bomb, and performance actions.",
				"Local session state tracks performance across matches without requiring a cloud account.",
				"Optional FACEIT and Leetify clients add supported ratings and performance metrics in the Pro edition.",
				"Compatible game artwork is resolved from the local CS2 installation and rendered at runtime rather than redistributed.",
			],
			decisions: [
				{ title: "Design for a glance, not a dashboard", detail: "Each key prioritizes one piece of match state with configurable labels, color, precision, and time period instead of compressing a full statistics screen into a tiny tile." },
				{ title: "Keep the core path local", detail: "Live game state and session history work without a hosted account, reducing setup friction and keeping match data on the player's machine." },
				{ title: "Treat absence as a real state", detail: "Values are shown only when CS2 or a connected provider can support them; match phase, spectating context, and provider processing are handled explicitly rather than represented as misleading zeroes." },
				{ title: "Separate enrichment from dependency", detail: "FACEIT and Leetify extend the product in Pro, but the Stream Deck's live CS2 view remains useful without either provider." },
			],
			result: "CS2 Companion and CS2 Companion Pro are published on the Elgato Marketplace with automatic local setup, live match actions, local session tracking, responsive Stream Deck artwork, and optional FACEIT and Leetify enrichment. The result is a compact second surface for understanding a match without turning the plugin into gameplay automation or another mandatory cloud service.",
		},
	},
	{
		slug: "activity-log",
		title: "activity-log",
		summary: "A maintained GitHub Action that keeps profile READMEs current with recent activity.",
		description: "A configurable GitHub Action that keeps profile READMEs current with custom templates, event filters, and rate-limit-aware processing.",
		tags: ["GitHub Actions", "JavaScript", "Open Source"],
		category: "open-source",
		status: "maintained",
		context: "Public open-source tool",
		year: "2024—Now",
		featured: true,
		image: "/projects/activity-log-penpot.png",
		imageAlt: "activity-log automation mark presented in a custom project thumbnail",
		imagePosition: "center",
		links: [
			{ label: "GitHub Marketplace", href: "https://github.com/marketplace/actions/github-activity-log" },
			{ label: "View repository", href: "https://github.com/TheDanniCraft/activity-log" },
		],
		caseStudy: {
			eyebrow: "Maintained Open Source",
			intro: "activity-log is a GitHub Action that turns recent account activity into a maintained section of a profile or repository README. Repository owners control which events appear, how they are formatted, and whether a run should write a commit at all.",
			facts: [
				{ label: "Distribution", value: "GitHub Marketplace" },
				{ label: "Runtime", value: "GitHub Actions" },
				{ label: "Maintenance", value: "Active" },
			],
			challenge: "GitHub exposes many event types with different payloads, visibility rules, and useful destinations. The action has to normalize those events into readable entries, update only its owned README section, and behave responsibly when API limits or private-repository details make the data incomplete.",
			constraints: [
				"The action must fit into an ordinary repository workflow without a separate service or account.",
				"Generated content must stay inside explicit README markers and preserve everything around them.",
				"GitHub API rate limiting and throttling must be handled without producing a misleading partial update.",
				"Private-repository activity requires a deliberate choice about how much detail is shown.",
			],
			approach: "The action maps supported GitHub events into a normalized rendering model, applies user configuration, and writes Markdown or HTML between stable section markers. Configuration remains workflow-native, so behavior is reviewable beside the repository code and can be tested with a dry run before a commit is created.",
			architecture: [
				"Workflow inputs define the account, output style, template, commit behavior, and privacy choices.",
				"Event-specific normalization produces consistent placeholders for one shared rendering template.",
				"Rate-limit responses trigger waiting and backoff rather than immediate repeated requests.",
				"Marker-scoped output keeps the rest of the target README under the repository owner’s control.",
			],
			decisions: [
				{ title: "Make event limits and exclusions explicitly configurable", detail: "EVENT_LIMIT controls the maximum output size, while IGNORE_EVENTS removes event families that are irrelevant to a particular profile." },
				{ title: "Support a global event template", detail: "A documented placeholder set lets maintainers change wording and links without forking event-processing logic." },
				{ title: "Provide a dry-run path", detail: "Maintainers can inspect generated output without changing the README or creating a commit." },
				{ title: "Back off when GitHub throttles", detail: "The action respects retry guidance and waits instead of turning temporary API pressure into a noisy failure loop." },
			],
			result: "The result is a published and actively maintained Marketplace action that can be added with one workflow file, while still exposing meaningful control over event volume, filtering, formatting, privacy, and commit behavior.",
		},
	},
	{
		slug: "payload-bay",
		title: "Payload Bay",
		summary: "An early-stage open-source platform for operating webhook and event pipelines.",
		description: "A platform for receiving, verifying, storing, routing, retrying, replaying, and inspecting webhooks and other events.",
		tags: ["Webhooks", "Supabase", "Infrastructure"],
		category: "open-source",
		status: "active",
		context: "Early-stage open-source platform",
		year: "2026—Now",
		featured: true,
		image: "/projects/payload-bay.png",
		imageAlt: "Payload Bay project artwork",
		imagePosition: "center",
		links: [{ label: "Follow development", href: "https://github.com/payloadbay/payloadbay" }],
		caseStudy: {
			eyebrow: "Architecture in Progress",
			intro: "Payload Bay is an open-source, self-hosted event-delivery platform being designed as the controlled layer between webhook providers and the applications that consume them. The current work establishes the reliability contract and backend foundation before public interfaces and installation paths are presented as finished.",
			facts: [
				{ label: "Stage", value: "Early development" },
				{ label: "Model", value: "Open-source and self-hosted" },
				{ label: "Current focus", value: "Ingress and delivery foundation" },
			],
			challenge: "Direct webhook integrations couple every provider to an application endpoint and leave each product team responsible for signature verification, durable storage, retries, replay, and incident visibility. Failures can become invisible precisely when the receiving application or network is least able to explain them.",
			constraints: [
				"Provider signatures must be checked against the unchanged request body.",
				"An event must be persisted before the provider receives an acknowledgment.",
				"Delivery is asynchronous and at-least-once, so duplicate attempts must be expected rather than hidden.",
				"Private applications need an outbound connection model instead of another publicly exposed inbound endpoint.",
				"The Community edition must remain capable without event, source, or runner limits designed only to force an upgrade.",
			],
			approach: "The platform is organized around a durable event record and explicit delivery lifecycle. A stable ingress accepts and verifies the original request, persistence separates provider acknowledgment from downstream availability, routing creates deliveries for the correct targets, and attempts retain enough evidence to understand failure and recovery.",
			architecture: [
				"Canonical endpoints and aliases receive events while preserving the original request used for verification.",
				"Durable events, receipts, deliveries, attempts, responses, and incidents form the operational record.",
				"Asynchronous workers deliver to HTTP targets with retry and replay support.",
				"Outbound runners are planned to reach private applications without exposing them directly to providers.",
				"The committed Supabase workspace currently contains the backend configuration, migrations, Edge Functions, queue, and scheduled-work foundation.",
			],
			decisions: [
				{ title: "Persist before acknowledging", detail: "Provider success means Payload Bay has accepted durable responsibility for the event, not that a downstream application happened to be online at that moment." },
				{ title: "State at-least-once delivery honestly", detail: "Retries and recovery can produce duplicate attempts, so the platform documents that contract instead of implying exactly-once behavior it cannot guarantee." },
				{ title: "Make recovery a product surface", detail: "Attempts, failures, replay, and incident context are modeled as inspectable operations rather than buried in worker logs." },
				{ title: "Prove the backend path before polishing the dashboard", detail: "The repository currently prioritizes ingress, persistence, delivery, retry, and recovery while public interfaces and SDK boundaries remain intentionally unstable." },
			],
			result: "Payload Bay is not yet an installable release. The work completed so far defines the product boundary, repository structure, local Supabase development environment, and the reliability model that the implementation is being built to prove. Presenting it as an in-progress architecture case study makes that stage explicit while showing the engineering decisions already in place.",
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
		image: "/projects/globaldiscord-penpot.png",
		imageAlt: "GlobalDiscord mark presented in a custom project thumbnail",
		imagePosition: "center",
		links: [{ label: "Archived listing", href: "https://top.gg/bot/832303489027276800" }],
		caseStudy: {
			eyebrow: "Retired Public Platform",
			intro: "GlobalDiscord connected conversations across Discord servers through configurable global chat rooms and a shared moderation layer.",
			facts: [
				{ label: "Product", value: "Public Discord bot" },
				{ label: "Interface", value: "Slash commands" },
				{ label: "Lifecycle", value: "Retired" },
			],
			challenge: "Messages crossed independent communities, so the system had to balance ease of setup with moderation, presentation preferences, and controls that worked across server boundaries.",
			constraints: [
				"Participating servers kept their own channels, roles, and presentation preferences.",
				"A moderation decision needed to protect the wider network rather than only one server.",
				"Cross-language conversations required optional translation without forcing it on every room.",
				"Configuration had to remain understandable inside Discord rather than depend on a separate dashboard.",
			],
			approach: "The bot treated each global room as a shared network with server-specific presentation settings. Discord-native commands handled setup, room selection, and moderation; message relaying then applied the selected embed or webhook style and optional translation before distribution.",
			architecture: [
				"Discord-native command surface for installation and configuration.",
				"Multiple shared rooms with per-server routing and presentation choices.",
				"Network-level moderation actions for behavior that crossed server boundaries.",
				"Optional translation as part of the relay pipeline.",
			],
			decisions: [
				{ title: "Moderate at network scope", detail: "Cross-server abuse cannot be contained by a local channel action alone, so moderator controls were designed around the shared network." },
				{ title: "Let communities choose presentation", detail: "Servers could select embed or webhook-based messages without changing the underlying conversation model." },
				{ title: "Keep setup inside Discord", detail: "Slash commands reduced context switching and made the operating model discoverable where administrators already worked." },
			],
			result: "The public application reached Discord’s 10,000-user verification threshold before the project was eventually retired.",
		},
	},
	{
		slug: "wiresense",
		title: "Wiresense",
		summary: "A collaborative school project for viewing live sensor data without a directly connected PC.",
		description: "A TypeScript sensor client and live dashboard for streaming measurements, visualizing graphs, and exporting captured data without a directly attached PC.",
		tags: ["TypeScript", "Sensors", "Real-time Data"],
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
		image: "/projects/flagsvg-penpot.png", imageAlt: "FlagSVG project artwork", links: [{ label: "View repository", href: "https://github.com/TheDanniCraft/FlagSVG/" }],
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
		description: "A private Discord bot system for community tooling, server workflows, moderation support, and continuously evolving member features.",
		tags: ["Discord.js", "Node.js", "Automation"], category: "discord", status: "archived", context: "GamerForge community system", year: "2021", featured: false,
		image: "/projects/gamerforge.png", imageAlt: "GamerForge System project artwork", links: [{ label: "View public guide", href: "https://github.com/TheDanniCraft/gamerforge-guide" }],
	},
];

export const caseStudyProjects = projects.filter((project) => project.caseStudy);

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}
