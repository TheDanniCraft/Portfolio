import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CapWidgetAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
	"data-cap-api-endpoint"?: string;
	"data-cap-hidden-field-name"?: string;
	"data-cap-disable-haptics"?: boolean | string;
	onsolve?: (event: CustomEvent<{ token: string }>) => void;
	onprogress?: (event: CustomEvent<{ progress: number }>) => void;
	onerror?: (event: CustomEvent<{ message?: string }>) => void;
	onreset?: (event: CustomEvent<Record<string, never>>) => void;
};

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"cap-widget": CapWidgetAttributes;
		}
	}
}
