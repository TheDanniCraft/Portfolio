import type { CapConfig, CapErrorEvent, CapProgressEvent, CapResetEvent, CapSolveEvent } from "cap-widget";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type CapWidgetAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> &
	Omit<CapConfig, "onsolve" | "onprogress" | "onerror" | "onreset"> & {
	onsolve?: (event: CapSolveEvent) => void;
	onprogress?: (event: CapProgressEvent) => void;
	onerror?: (event: CapErrorEvent) => void;
	onreset?: (event: CapResetEvent) => void;
};

declare module "react" {
	namespace JSX {
		interface IntrinsicElements {
			"cap-widget": CapWidgetAttributes;
		}
	}
}
