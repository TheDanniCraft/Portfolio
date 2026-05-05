import { type ReactNode } from "react";
import styles from "./marquee.module.css";

type MarqueeProps = {
	children: ReactNode;
	durationSec?: number;
	offset?: number;
	reverse?: boolean;
	vertical?: boolean;
	gapClassName?: string;
	className?: string;
	trackClassName?: string;
	edgeFade?: boolean;
};

const seamSpacingByGap: Record<string, string> = {
	"gap-1": "pr-1",
	"gap-2": "pr-2",
	"gap-3": "pr-3",
	"gap-4": "pr-4",
	"gap-5": "pr-5",
	"gap-6": "pr-6",
	"gap-8": "pr-8",
};

const verticalSeamSpacingByGap: Record<string, string> = {
	"gap-1": "pb-1",
	"gap-2": "pb-2",
	"gap-3": "pb-3",
	"gap-4": "pb-4",
	"gap-5": "pb-5",
	"gap-6": "pb-6",
	"gap-8": "pb-8",
};

export function Marquee({ children, durationSec = 40, offset = 0, reverse = false, vertical = false, gapClassName = "gap-4", className = "", trackClassName = "", edgeFade = false }: MarqueeProps) {
	const directionClass = vertical ? (reverse ? styles.marqueeVerticalReverse : styles.marqueeVertical) : reverse ? styles.marqueeHorizontalReverse : styles.marqueeHorizontal;
	const axisClass = vertical ? "flex-col h-max" : "";
	const seamSpacingClass = vertical ? (verticalSeamSpacingByGap[gapClassName] ?? "pb-4") : (seamSpacingByGap[gapClassName] ?? "pr-4");
	const normalizedOffset = ((offset % 1) + 1) % 1;
	const offsetDelaySec = -(durationSec * normalizedOffset);

	const fadeClass = vertical
		? "before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-16 before:bg-linear-to-b before:from-background before:to-transparent after:absolute after:inset-x-0 after:bottom-0 after:z-10 after:h-16 after:bg-linear-to-t after:from-background after:to-transparent"
		: "before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-24 before:bg-linear-to-r before:from-background before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-24 after:bg-linear-to-l after:from-background after:to-transparent";

	return (
		<div className={`relative overflow-hidden ${edgeFade ? fadeClass : ""} ${className}`}>
			<div
				className={`flex w-max ${vertical ? "flex-col h-max" : ""} ${directionClass} ${trackClassName}`}
				style={{
					animationDuration: `${durationSec}s`,
					animationDelay: `${offsetDelaySec}s`,
				}}
			>
				<div className={`flex shrink-0 ${axisClass} ${gapClassName} ${seamSpacingClass}`}>{children}</div>
				<div className={`flex shrink-0 ${axisClass} ${gapClassName} ${seamSpacingClass}`} aria-hidden='true'>
					{children}
				</div>
			</div>
		</div>
	);
}
