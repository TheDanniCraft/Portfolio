import { CircleCheck, CircleExclamation, CircleXmark } from "@gravity-ui/icons";
import { availability, type AvailabilityState } from "@/lib/site-content";

const availabilityStyles: Record<
	AvailabilityState,
	{
		dot: string;
		text: string;
		border: string;
		background: string;
		cardBackground: string;
		iconBackground: string;
		icon: typeof CircleCheck;
		alertStatus: "success" | "warning" | "danger";
	}
> = {
	available: {
		dot: "bg-success",
		text: "text-success",
		border: "border-success/40",
		background: "bg-surface",
		cardBackground: "bg-success-soft",
		iconBackground: "bg-success/20",
		icon: CircleCheck,
		alertStatus: "success",
	},
	limited: {
		dot: "bg-warning",
		text: "text-warning",
		border: "border-warning/40",
		background: "bg-surface",
		cardBackground: "bg-warning-soft",
		iconBackground: "bg-warning/20",
		icon: CircleExclamation,
		alertStatus: "warning",
	},
	booked: {
		dot: "bg-danger",
		text: "text-danger",
		border: "border-danger/40",
		background: "bg-surface",
		cardBackground: "bg-danger-soft",
		iconBackground: "bg-danger/20",
		icon: CircleXmark,
		alertStatus: "danger",
	},
};

export function getAvailabilityStyles() {
	return availabilityStyles[availability.state];
}

export function AvailabilityIndicator({ compact = false }: { compact?: boolean }) {
	const styles = getAvailabilityStyles();

	return (
		<div className={`inline-flex min-h-9 items-center gap-2 rounded-full border px-3 text-xs font-bold uppercase tracking-[0.12em] ${styles.border} ${styles.background} ${styles.text}`}>
			<span aria-hidden className={`size-2 rounded-full ${styles.dot}`} />
			<span>{compact ? availability.shortLabel : availability.label}</span>
		</div>
	);
}
