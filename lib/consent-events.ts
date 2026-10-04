import type { ConsentCategory } from "@/lib/consent-services";

export const OPEN_CONSENT_PREFERENCES_EVENT = "portfolio:open-consent-preferences";

export type OpenConsentPreferencesDetail = {
	category?: ConsentCategory;
};
