"use client";

import { Comment, Globe, Flask, ShoppingBag, SquareArticle } from "@gravity-ui/icons";
import { buttonVariants, Card, Chip, Link, Tag, TagGroup } from "@heroui/react";
import { useMemo, useState } from "react";
import { projects, type ProjectCategory } from "@/lib/projects";
import { ProjectImage } from "@/components/project-image";

type FilterId = "all" | ProjectCategory;

export default function WorkPage() {
	const [selectedFilter, setSelectedFilter] = useState<FilterId>("all");

	const filteredProjects = useMemo(() => {
		if (selectedFilter === "all") return projects;
		return projects.filter((project) => project.category === selectedFilter);
	}, [selectedFilter]);

	return (
		<div className='min-h-screen bg-background text-foreground'>
			<section className='mx-auto w-full max-w-6xl px-6 py-10'>
				<p className='text-xs font-bold uppercase tracking-[0.3em] text-accent'>Selected Works</p>
				<div className='mt-4 flex flex-wrap items-end justify-between gap-6'>
					<div className='max-w-3xl'>
						<h1 className='text-5xl font-black leading-[0.9] sm:text-7xl'>
							Digital <span className='text-accent'>Artifacts</span>
						</h1>
						<p className='mt-6 text-lg leading-8 text-muted'>A curated collection of architectural code and interface systems built for scale, clarity, and conversion.</p>
					</div>
					<TagGroup
						aria-label='Project filters'
						onSelectionChange={(selection) => {
							const key = typeof selection === "string" ? (selection as FilterId) : (Array.from(selection)[0] as FilterId | undefined);
							setSelectedFilter(key ?? "all");
						}}
						selectedKeys={[selectedFilter]}
						selectionMode='single'
						size='lg'
					>
						<TagGroup.List>
							<Tag id='all'>
								<SquareArticle className='size-4' />
								All
							</Tag>
							<Tag id='web-apps'>
								<Globe className='size-4' />
								Web Apps
							</Tag>
							<Tag id='experiments'>
								<Flask className='size-4' />
								Experiments
							</Tag>
							<Tag id='open-source'>
								<ShoppingBag className='size-4' />
								Open Source
							</Tag>
							<Tag id='discord'>
								<Comment className='size-4' />
								Discord
							</Tag>
						</TagGroup.List>
					</TagGroup>
				</div>
			</section>

			<section className='mx-auto grid w-full max-w-6xl gap-6 px-6 pb-20 md:grid-cols-12'>
				{filteredProjects.map((project, index) => {
					const patternIndex = index % 4;
					const isWide = patternIndex === 0 || patternIndex === 3;
					const spanClass = isWide ? "md:col-span-8" : "md:col-span-4";
					const aspectClass = patternIndex === 0 ? "aspect-[16/10]" : patternIndex === 1 ? "aspect-square" : patternIndex === 2 ? "aspect-[4/3]" : "aspect-[16/9]";

					return (
						<Card className={`overflow-hidden border border-border bg-surface p-0 ${spanClass}`} key={project.title}>
							<ProjectImage alt={project.imageAlt} className={aspectClass} position={project.imagePosition} sizes={isWide ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 34vw, 100vw"} src={project.image} />
							<Card.Content className='grid gap-4 p-6'>
								<div className='flex flex-wrap gap-2'>
									<Chip className='h-6 px-2 flex items-center text-[0.6rem] font-black uppercase tracking-[0.12em]' color='accent'>
										{project.status}
									</Chip>
									{project.tags.map((tag) => (
										<Chip className='h-6 px-2 flex items-center text-[0.6rem] font-black uppercase tracking-[0.12em]' key={tag}>
											{tag}
										</Chip>
									))}
								</div>
								<h2 className='text-3xl font-black sm:text-4xl'>{project.title}</h2>
								<p className='text-xs font-bold uppercase tracking-[0.16em] text-accent'>{project.context} · {project.year}</p>
								<p className='text-base leading-7 text-muted sm:text-lg sm:leading-8'>{project.description}</p>
								<div className='flex flex-wrap gap-4 pt-2'>
									{project.caseStudy ? <Link className='text-sm font-bold text-accent hover:underline' href={`/work/${project.slug}`}>View case study</Link> : null}
									{project.links.map((link) => <Link className='text-sm font-bold text-foreground hover:text-accent' href={link.href} key={link.href}>{link.label}</Link>)}
								</div>
							</Card.Content>
						</Card>
					);
				})}
			</section>

			<section className='mx-auto w-full max-w-6xl px-6 pb-20'>
				<Card className='border border-border bg-surface p-10 text-center sm:p-14'>
					<h2 className='text-4xl font-black sm:text-6xl'>Start your next build</h2>

					<p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-muted sm:text-lg'>Need product architecture that can handle growth without adding complexity.</p>

					<div className='mt-8 flex flex-wrap justify-center gap-4'>
						<Link className={`${buttonVariants({ variant: "primary", size: "lg" })}`} href='/contact'>
							Start Project
						</Link>

						<Link className={`${buttonVariants({ variant: "outline", size: "lg" })}`} href='/testimonials'>
							View Reviews
						</Link>
					</div>
				</Card>
			</section>
		</div>
	);
}
