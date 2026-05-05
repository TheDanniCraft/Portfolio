import { buttonVariants, Card, Link as HeroLink } from "@heroui/react";
import { testimonials } from "@/lib/site-content";

const testimonialStats = [
	{ value: "98%", label: "Client Retention" },
	{ value: "150+", label: "Global Launches" },
	{ value: "12", label: "Design Awards" },
];

export default function TestimonialsPage() {
	return (
		<div className='min-h-screen bg-background text-foreground'>
			<section className='mx-auto w-full max-w-6xl px-6 py-16 text-center sm:py-24'>
				<p className='text-xs font-bold uppercase tracking-[0.32em] text-accent'>Endorsements</p>
				<h1 className='mt-5 text-5xl font-black sm:text-7xl'>Voices of Impact</h1>
				<p className='mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted'>Collaborations with industry leaders and founder-led teams. Every system is measured by measurable outcomes and long-term maintainability.</p>
			</section>

			<section className='mx-auto w-full max-w-6xl px-6 pb-16'>
				<div className='grid gap-5 md:grid-cols-2 xl:grid-cols-3'>
					{testimonials.map((review, index) => (
						<Card className={`border bg-surface p-7 ${index === 4 ? "border-accent" : "border-border"}`} key={review.name}>
							<p className='text-2xl font-black text-accent'>&ldquo;</p>
							<p className='mt-4 text-lg leading-8 text-foreground'>{review.quote}</p>
							<div className='mt-8'>
								<p className='text-xl font-black text-accent'>{review.name}</p>
								<p className='mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted'>{review.role}</p>
							</div>
						</Card>
					))}
				</div>
			</section>

			<section className='mx-auto w-full max-w-6xl px-6 py-10'>
				<div className='grid gap-5 md:grid-cols-3'>
					{testimonialStats.map((stat) => (
						<Card className='border border-border bg-surface p-10 text-center' key={stat.label}>
							<p className='text-6xl font-black text-accent'>{stat.value}</p>
							<p className='mt-3 text-xs font-bold uppercase tracking-[0.18em] text-muted'>{stat.label}</p>
						</Card>
					))}
				</div>
			</section>

			<section className='mx-auto w-full max-w-6xl px-6 pb-28 pt-12'>
				<Card className='border border-border bg-surface p-10 text-center sm:p-14'>
					<h2 className='text-4xl font-black sm:text-6xl'>Ready to build your impact?</h2>
					<p className='mx-auto mt-4 max-w-3xl text-base leading-7 text-muted sm:text-lg'>Join teams that need durable architecture and precise interface execution.</p>

					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<HeroLink className={buttonVariants({ variant: "primary", size: "lg" })} href='/contact'>
							Start a Project
						</HeroLink>

						<HeroLink className={buttonVariants({ variant: "outline", size: "lg" })} href='/work'>
							View Portfolio
						</HeroLink>
					</div>
				</Card>
			</section>
		</div>
	);
}
