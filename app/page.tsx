import { buttonVariants, Card, Link } from "@heroui/react";
import { AvailabilityIndicator } from "@/components/availability-indicator";
import { CvModalButton } from "@/components/cv-modal-button";
import { capabilities, profile, projects, shippedProjectsStat, testimonials, tools } from "@/lib/site-content";
import { ProjectInquiryForm } from "@/components/project-inquiry-form";
import { Marquee } from "@/components/marquee";

export default function Home() {
	const featuredProjects = projects.filter((project) => project.featured);
	const featuredTestimonials = testimonials.filter((testimonial) => testimonial.featured);

	const toolRows = [tools.filter((_, index) => index % 3 === 0), tools.filter((_, index) => index % 3 === 1), tools.filter((_, index) => index % 3 === 2)];
	return (
		<div className='min-h-screen bg-background text-foreground'>
			<section id='home' className='mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-16 md:min-h-[calc(100vh-72px)] md:grid-cols-[1fr_0.84fr] md:pb-32'>
				<div className='max-w-3xl'>
					<div className='mb-8 flex flex-wrap items-center gap-3'>
						<p className='text-xs font-semibold uppercase tracking-[0.32em] text-accent'>{profile.name}</p>
						<AvailabilityIndicator compact />
					</div>

					<h1 className='max-w-2xl text-6xl font-black leading-[0.92] tracking-normal sm:text-7xl lg:text-8xl'>
						I build <span className='text-accent'>resilient</span> digital structures.
					</h1>

					<p className='mt-8 max-w-xl text-base leading-7 text-muted sm:text-lg'>{profile.subtitle}</p>

					<div className='mt-8 flex flex-wrap gap-4'>
						<Link className={`${buttonVariants({ variant: "primary", size: "lg" })} p-6`} href='/contact'>
							Start a Project
						</Link>
						<Link className={`${buttonVariants({ variant: "outline", size: "lg" })} p-6`} href='/work'>
							View Projects
						</Link>

						<CvModalButton />
					</div>
				</div>

				<div className='relative min-h-100 md:min-h-140'>
					<Card className='absolute right-0 top-0 h-100 w-[88%] overflow-hidden border border-border bg-surface p-0 md:h-136'>
						<div aria-label='Portrait placeholder' className='h-full w-full bg-cover bg-center' style={{ backgroundImage: `url('${profile.portrait}')` }} />
					</Card>

					<Card className='absolute -bottom-8 left-0 w-[56%] max-w-56 border border-border bg-surface p-5 shadow-2xl shadow-black/30 sm:-bottom-10 sm:left-2 sm:w-[50%] md:-bottom-12 md:w-[40%]'>
						<Card.Content className='grid gap-2 p-0'>
							<p className='text-3xl font-black leading-none text-accent sm:text-4xl'>{shippedProjectsStat.value}</p>
							<p className='text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-muted'>{shippedProjectsStat.label}</p>
						</Card.Content>
					</Card>
				</div>
			</section>

			<section className='mx-auto w-full max-w-6xl px-6 pb-20'>
				<div className='mb-8 max-w-3xl'>
					<p className='text-xs font-bold uppercase tracking-[0.26em] text-accent'>Stack</p>
					<h2 className='mt-3 text-4xl font-black tracking-normal sm:text-5xl'>Tools of the Trade</h2>
					<p className='mt-4 max-w-xl text-sm leading-6 text-muted'>The software, frameworks, and platforms I reach for when building reliable digital products.</p>
				</div>

				<div className='grid gap-4'>
					{toolRows.map((rowTools, rowIndex) => (
						<Marquee key={rowIndex} durationSec={75} offset={rowIndex * 0.34} reverse={rowIndex % 2 === 0} edgeFade>
							{rowTools.map((tool) => {
								const Icon = tool.icon;

								return (
									<Card key={`${rowIndex}-${tool.name}`} className='min-h-34 w-52 shrink-0 border border-border bg-surface p-5'>
										<Card.Content className='flex h-full flex-col justify-between gap-5 p-0'>
											<Icon className='size-8' color={tool.color} />
											<div>
												<p className='text-base font-black'>{tool.name}</p>
												<p className='mt-1 text-xs uppercase tracking-[0.12em] text-muted'>{tool.detail}</p>
											</div>
										</Card.Content>
									</Card>
								);
							})}
						</Marquee>
					))}
				</div>
			</section>

			<section id='work' className='mx-auto w-full max-w-6xl px-6 py-20 scroll-mt-24'>
				<div className='mb-10 flex items-end justify-between gap-6'>
					<div>
						<h2 className='text-4xl font-black tracking-normal sm:text-5xl'>Live Projects</h2>
						<p className='mt-3 text-sm text-muted'>Selected builds from bots, tools, and web projects.</p>
					</div>
					<span className='hidden rounded-full border border-accent px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-accent sm:inline-flex'>Selected Work</span>
				</div>

				<div className='grid gap-8 md:grid-cols-2'>
					{featuredProjects.map((project, index) => {
						const isLastOddItem = featuredProjects.length % 2 === 1 && index === featuredProjects.length - 1;

						return (
							<Card className={`overflow-hidden border border-border bg-surface p-0 ${isLastOddItem ? "md:col-span-2" : ""}`} key={project.title} role='article'>
								<div aria-label={`${project.title} placeholder`} className='aspect-video bg-cover bg-center' style={{ backgroundImage: `url('${project.image}')` }} />

								<Card.Content className='grid gap-4 p-6'>
									<div className='flex flex-wrap gap-2'>
										{project.tags.map((tag) => (
											<span className='rounded-sm bg-surface-secondary px-2 py-1 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted' key={tag}>
												{tag}
											</span>
										))}
									</div>

									<Card.Header className='p-0'>
										<Card.Title className='text-xl font-black uppercase tracking-normal'>{project.title}</Card.Title>
										<Card.Description className='mt-2 text-sm leading-6 text-muted'>{project.description}</Card.Description>
									</Card.Header>

									<a className='w-fit text-sm font-bold text-accent hover:underline' href='#contact'>
										Discuss Project
									</a>
								</Card.Content>
							</Card>
						);
					})}
				</div>
			</section>

			<section id='capabilities' className='mx-auto w-full max-w-6xl px-6 py-24 scroll-mt-24'>
				<h2 className='mb-12 text-center text-4xl font-black tracking-normal sm:text-5xl'>Core Capabilities</h2>

				<div className='grid gap-5 md:grid-cols-3'>
					{capabilities.map((capability, index) => {
						const Icon = capability.icon;
						const isWide = index === 0 || index === 3;

						return (
							<Card className={`border border-border bg-surface p-8 ${isWide ? "md:col-span-2 md:min-h-56" : "md:min-h-56"}`} key={capability.title}>
								<Icon aria-hidden className={`text-accent relative z-10 ${isWide ? "mb-8 size-10 md:absolute md:right-10 md:top-9 md:mb-0 md:size-12" : "mb-10 size-8"}`} />

								<Card.Header className={isWide ? "relative z-10 max-w-xl p-0 md:pt-8" : "relative z-10 p-0"}>
									<Card.Title className='text-xl font-black'>{capability.title}</Card.Title>
									<Card.Description className='mt-3 max-w-xl text-sm leading-6 text-muted'>{capability.description}</Card.Description>
								</Card.Header>
							</Card>
						);
					})}
				</div>
			</section>

			<section id='testimonials' className='scroll-mt-24 py-20'>
				<div className='mx-auto w-full max-w-6xl px-6'>
					<h2 className='mb-10 text-4xl font-black tracking-normal sm:text-5xl'>Voices of Impact</h2>

					<div className='grid gap-6 md:grid-cols-3'>
						{featuredTestimonials.map((testimonial) => (
							<Card key={testimonial.name} className='border border-border bg-surface p-7' role='article'>
								<Card.Content className='p-0'>
									<p className='text-3xl font-black leading-none text-accent'>&ldquo;</p>
									<p className='mt-4 text-sm italic leading-6 text-foreground'>{testimonial.quote}</p>
								</Card.Content>

								<Card.Footer className='mt-7 flex items-center gap-3 p-0'>
									<div className='grid size-10 place-items-center rounded-full bg-accent text-sm font-black text-accent-foreground'>
										{testimonial.name
											.split(" ")
											.map((part) => part[0])
											.join("")}
									</div>

									<div>
										<p className='text-sm font-bold'>{testimonial.name}</p>
										<p className='text-xs text-muted'>{testimonial.role}</p>
									</div>
								</Card.Footer>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section id='contact' className='mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 scroll-mt-24'>
				<div className='w-full max-w-2xl text-center'>
					<p className='text-xs font-bold uppercase tracking-[0.34em] text-accent'>Project Inquiry</p>
					<h2 className='mt-6 text-5xl font-black leading-none tracking-normal sm:text-7xl'>Ready to start?</h2>
					<p className='mx-auto mt-6 max-w-xl text-base leading-7 text-muted'>Tell me what you need built, what it should do, and where it should run. I will reply with a clear next step.</p>
				</div>

				<div className='mt-12 flex w-full justify-center'>
					<div className='w-full max-w-xl'>
						<ProjectInquiryForm mode='full' />
					</div>
				</div>
			</section>
		</div>
	);
}
