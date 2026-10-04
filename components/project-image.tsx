import Image from "next/image";

type ProjectImageProps = {
	src: string;
	alt: string;
	sizes: string;
	priority?: boolean;
	className?: string;
	position?: string;
	variant?: "cover" | "thumbnail";
};

type ThumbnailStyle = {
	accent: string;
	inset: string;
	accentPosition: string;
	mediaBackground?: string;
};

const thumbnailStyles: Record<string, ThumbnailStyle> = {
	"/projects/clipify.png": { accent: "#6d28d9", inset: "18.5% 5%", accentPosition: "-23% -12% auto auto" },
	"/projects/cs2-companion.png": { accent: "#e7a21a", inset: "20% 5%", accentPosition: "-23% -12% auto auto" },
	"/projects/activity-log.jpeg": { accent: "#238636", inset: "18.333% 26.25%", accentPosition: "-23% -12% auto auto" },
	"/projects/payload-bay.png": { accent: "#18b7c9", inset: "18.333% 5%", accentPosition: "-23% -12% auto auto", mediaBackground: "#08182b" },
	"/projects/globaldiscord.png": { accent: "#5865f2", inset: "24% 33%", accentPosition: "auto auto -23% -12%" },
	"/projects/wiresense.jpg": { accent: "#15a6b8", inset: "18.333% 26.25%", accentPosition: "-23% auto auto -12%" },
	"/projects/terminal.png": { accent: "#52d273", inset: "16.25% 5%", accentPosition: "-23% -12% auto auto" },
	"/projects/monsterbattle.png": { accent: "#e97828", inset: "13.667% 15.625%", accentPosition: "-23% -12% auto auto" },
	"/projects/time-kills-you.png": { accent: "#e0332f", inset: "13.667% 15.625%", accentPosition: "-23% -12% auto auto" },
	"/projects/quickdrop.svg": { accent: "#25aeea", inset: "18.333% 26.25%", accentPosition: "-23% -12% auto auto" },
	"/projects/gamerforge.png": { accent: "#f28b2d", inset: "18.333% 26.25%", accentPosition: "auto auto -23% -12%" },
};

export function ProjectImage({ src, alt, sizes, priority = false, className = "", position = "center", variant = "cover" }: ProjectImageProps) {
	if (variant === "thumbnail") {
		if (src.endsWith("-penpot.png")) {
			return (
				<div className={`relative overflow-hidden bg-[#0b0b0e] ${className}`}>
					<Image alt={alt} className='object-cover' fill priority={priority} sizes={sizes} src={src} />
				</div>
			);
		}

		const style = thumbnailStyles[src] ?? { accent: "#ef3340", inset: "18.333% 26.25%", accentPosition: "-23% -12% auto auto" };

		return (
			<div className={`relative overflow-hidden bg-[#0b0b0e] ${className}`}>
				<div aria-hidden className='absolute aspect-square w-[56.25%] rounded-full opacity-[0.14]' style={{ backgroundColor: style.accent, inset: style.accentPosition }} />
				<div className='absolute overflow-hidden rounded-[clamp(0.5rem,2.5vw,2.5rem)]' style={{ backgroundColor: style.mediaBackground, inset: style.inset }}>
					<Image alt={alt} className='object-contain' fill priority={priority} sizes={sizes} src={src} />
				</div>
			</div>
		);
	}

	return (
		<div className={`relative overflow-hidden bg-surface-secondary ${className}`}>
			<Image alt={alt} className='object-cover' fill priority={priority} sizes={sizes} src={src} style={{ objectPosition: position }} />
		</div>
	);
}
