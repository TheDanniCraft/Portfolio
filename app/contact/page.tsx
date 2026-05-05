import { ProjectInquiryForm } from "@/components/project-inquiry-form";
import { getAvailabilityStyles } from "@/components/availability-indicator";
import { availability } from "@/lib/site-content";
import { ArrowUpRightFromSquare, MapPin } from "@gravity-ui/icons";
import { Card, Link } from "@heroui/react";

type ContactTile = {
	title: string;
	description: string;
	href: string;
};

const contactTiles: ContactTile[] = [
	{
		title: "GitHub",
		description: "Code, experiments, and open-source work.",
		href: "https://github.com/thedannicraft",
	},
	{
		title: "LinkedIn",
		description: "Professional background, updates, and collaborations.",
		href: "https://linkedin.com/in/thedannicraft",
	},
	{
		title: "Blog",
		description: "Notes on systems, building, and engineering.",
		href: "/blog",
	},
];

export default function ContactPage() {
	const availabilityStyles = getAvailabilityStyles();
	const AvailabilityIcon = availabilityStyles.icon;

	return (
		<div className='min-h-screen bg-background text-foreground'>
			<main className='mx-auto max-w-7xl px-6 pb-20 pt-32'>
				<header className='mb-20'>
					<p className='text-xs font-bold uppercase tracking-[0.34em] text-accent'>Project Inquiry</p>

					<h1 className='mt-6 text-6xl font-black leading-[0.9] tracking-normal sm:text-8xl'>
						Let&apos;s <span className='text-accent'>Collaborate</span>
					</h1>

					<p className='mt-6 max-w-3xl text-xl leading-relaxed text-muted'>Tell me what you need built, what it should do, and where it should run. I will reply with a clear next step.</p>
				</header>

				<div className='grid items-stretch gap-6 lg:grid-cols-12'>
					<section className='lg:col-span-7'>
						<ProjectInquiryForm mode='full' showFooter />
					</section>

					<aside className='flex h-full flex-col gap-6 lg:col-span-5'>
						<section className='relative min-h-64 flex-1 overflow-hidden rounded-2xl border border-border bg-surface'>
							<div
								aria-hidden
								className='absolute inset-0 bg-cover bg-center opacity-40 grayscale'
								style={{
									backgroundImage: "url('/hockenheim-map-poster.png')",
								}}
							/>
							<div className='absolute inset-0 bg-linear-to-t from-surface via-surface/60 to-transparent' />

							<div className='relative z-10 flex h-full min-h-64 flex-col justify-end p-8'>
								<div className='flex items-center gap-2'>
									<MapPin className='text-accent' />
									<p className='text-xs font-bold uppercase tracking-[0.22em] text-accent'>Base of Operations</p>
								</div>

								<p className='mt-2 text-3xl font-black'>Hockenheim, Germany</p>
								<p className='mt-2 text-sm text-muted'>Open for new projects and collaborations.</p>
							</div>
						</section>

						<section className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							{contactTiles.map((tile) => (
								<Card className='border border-border bg-surface p-6' key={tile.title}>
									<Link className='inline-flex items-center gap-2 text-xl font-black text-foreground hover:text-accent' href={tile.href} rel='noreferrer' target={tile.href.startsWith("http") ? "_blank" : undefined}>
										{tile.title}
										<ArrowUpRightFromSquare className='size-4' />
									</Link>

									<p className='mt-2 text-sm leading-6 text-muted'>{tile.description}</p>
								</Card>
							))}

							<Card className={`border p-6 ${availabilityStyles.border} ${availabilityStyles.cardBackground}`}>
								<div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
									<AvailabilityIcon aria-hidden className={`size-8 ${availabilityStyles.text}`} />

									<p className={`text-sm font-black uppercase tracking-[0.12em] ${availabilityStyles.text}`}>Status: {availability.label}</p>

									<p className={`text-sm ${availabilityStyles.text}`}>{availability.responseTime}</p>
								</div>
							</Card>
						</section>
					</aside>
				</div>
			</main>
		</div>
	);
}
