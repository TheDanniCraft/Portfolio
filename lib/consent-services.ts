export type ConsentCategory = "necessary" | "functionality";

export type ConsentService = {
	id: string;
	name: string;
	category: ConsentCategory;
	description: string;
	provider: string;
	storage: string;
	purpose: string;
	retention: string;
	scope: string;
	privacyUrl?: string;
};

export const necessaryConsentServices: ConsentService[] = [
	{
		id: "consent-storage",
		name: "Privacy preferences",
		category: "necessary",
		description: "Remembers which optional services you allow across visits.",
		provider: "TheDanniCraft / c15t",
		storage: "First-party cookie and local storage",
		purpose: "Apply and remember your privacy choices.",
		retention: "Six months, followed by a renewed choice.",
		scope: "First-party",
	},
	{
		id: "theme-preference",
		name: "Theme preference",
		category: "necessary",
		description: "Restores the interface appearance selected on this device.",
		provider: "TheDanniCraft",
		storage: "First-party local storage entry named theme",
		purpose: "Restore the selected light, dark, or system theme.",
		retention: "Until the preference changes or browser storage is cleared.",
		scope: "First-party",
	},
	{
		id: "plausible",
		name: "Plausible Analytics",
		category: "necessary",
		description: "Produces aggregate, cookieless audience statistics without persistent browser identifiers.",
		provider: "Self-hosted by TheDanniCraft",
		storage: "No cookies or browser storage",
		purpose: "Understand website usage and improve content.",
		retention: "Aggregate records follow the configured analytics retention period.",
		scope: "First-party infrastructure",
	},
	{
		id: "cap",
		name: "Cap form protection",
		category: "necessary",
		description: "Protects project inquiries from automated submissions.",
		provider: "Self-hosted by TheDanniCraft",
		storage: "Short-lived challenge state and verification token",
		purpose: "Confirm that a protected form submission is legitimate.",
		retention: "Only for the challenge and verification lifetime.",
		scope: "First-party infrastructure",
	},
];

export const optionalConsentServices: ConsentService[] = [
	{
		id: "morgen-booking",
		name: "Morgen booking",
		category: "functionality",
		description: "Loads the external scheduling interface when you choose to book a video call.",
		provider: "Morgen AG",
		storage: "Cookies or browser storage used by the booking flow",
		purpose: "Display live availability and create a requested appointment.",
		retention: "According to Morgen's booking and privacy settings.",
		scope: "Third-party service",
		privacyUrl: "https://www.morgen.so/privacy",
	},
];

export const consentCategoryDetails: Record<ConsentCategory, { title: string; description: string }> = {
	necessary: {
		title: "Strictly necessary",
		description: "Stores privacy and interface choices, protects forms, and provides cookieless aggregate analytics. Always active.",
	},
	functionality: {
		title: "Optional functionality",
		description: "Allows third-party interfaces such as the Morgen booking page to load when requested.",
	},
};
