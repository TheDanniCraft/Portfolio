import { buttonVariants, Card, Link as HeroLink } from "@heroui/react";
import { testimonials } from "@/lib/site-content";
import { caseStudyProjects } from "@/lib/projects";

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
				<div className='mb-8 max-w-2xl'>
					<p className='text-xs font-bold uppercase tracking-[0.26em] text-accent'>Behind the work</p>
					<h2 className='mt-3 text-4xl font-black sm:text-5xl'>Selected case studies</h2>
				</div>
				<div className='grid gap-5 md:grid-cols-3'>
					{caseStudyProjects.map((project) => (
						<Card className='border border-border bg-surface p-7' key={project.slug}>
							<p className='text-xs font-bold uppercase tracking-[0.18em] text-accent'>{project.caseStudy?.eyebrow}</p>
							<h3 className='mt-4 text-2xl font-black'>{project.title}</h3>
							<p className='mt-3 text-sm leading-6 text-muted'>{project.summary}</p>
							<HeroLink className='mt-6 text-sm font-bold text-accent' href={`/work/${project.slug}`}>Read case study</HeroLink>
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
