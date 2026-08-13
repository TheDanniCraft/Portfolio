import Image from "next/image";

type ProjectImageProps = {
	src: string;
	alt: string;
	sizes: string;
	priority?: boolean;
	className?: string;
	position?: string;
};

export function ProjectImage({ src, alt, sizes, priority = false, className = "", position = "center" }: ProjectImageProps) {
	return (
		<div className={`relative overflow-hidden bg-surface-secondary ${className}`}>
			<Image alt={alt} className='object-cover' fill priority={priority} sizes={sizes} src={src} style={{ objectPosition: position }} />
		</div>
	);
}
