import { ArrowLeft, ArrowUpRightFromSquare } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudyProjects, getProject } from "@/lib/projects";
import { ProjectImage } from "@/components/project-image";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
	return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const project = getProject((await params).slug);
	return project?.caseStudy ? { title: `${project.title} Case Study · TheDanniCraft`, description: project.summary } : {};
}

export default async function ProjectCaseStudy({ params }: PageProps) {
	const project = getProject((await params).slug);
	if (!project?.caseStudy) notFound();

	const study = project.caseStudy;

	return (
		<div className='min-h-screen bg-background text-foreground'>
			<article className='mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:pt-16'>
				<Link className='inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-accent' href='/work'>
					<ArrowLeft className='size-4' /> Back to work
				</Link>

				<header className='mt-12 grid items-end gap-10 lg:grid-cols-[1fr_0.7fr]'>
					<div>
						<p className='text-xs font-bold uppercase tracking-[0.3em] text-accent'>{study.eyebrow}</p>
						<h1 className='mt-5 text-5xl font-black leading-[0.9] sm:text-7xl'>{project.title}</h1>
						<p className='mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl'>{study.intro}</p>
					</div>
					<div className='grid grid-cols-2 gap-4 text-sm'>
						<div className='border-l border-border pl-4'><p className='text-xs uppercase tracking-[0.16em] text-muted'>Status</p><p className='mt-2 font-bold capitalize'>{project.status}</p></div>
						<div className='border-l border-border pl-4'><p className='text-xs uppercase tracking-[0.16em] text-muted'>Period</p><p className='mt-2 font-bold'>{project.year}</p></div>
						<div className='col-span-2 border-l border-border pl-4'><p className='text-xs uppercase tracking-[0.16em] text-muted'>Context</p><p className='mt-2 font-bold'>{project.context}</p></div>
					</div>
				</header>

				<ProjectImage alt={project.imageAlt} className='mt-14 aspect-[16/8] border border-border' position={project.imagePosition} priority sizes='(min-width: 1152px) 1152px, 100vw' src={project.image} />

				<div className='mt-16 grid gap-10 lg:grid-cols-[0.65fr_1fr]'>
					<aside>
						<p className='text-xs font-bold uppercase tracking-[0.2em] text-accent'>Technologies</p>
						<div className='mt-4 flex flex-wrap gap-2'>{project.tags.map((tag) => <span className='border border-border bg-surface px-3 py-1.5 text-xs font-bold' key={tag}>{tag}</span>)}</div>
						<div className='mt-8 grid gap-3'>{project.links.map((link) => <a className='inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline' href={link.href} key={link.href} rel='noreferrer' target='_blank'>{link.label}<ArrowUpRightFromSquare className='size-4' /></a>)}</div>
					</aside>

					<div className='grid gap-10'>
						<section><h2 className='text-3xl font-black'>The challenge</h2><p className='mt-4 text-base leading-8 text-muted'>{study.challenge}</p></section>
						<section><h2 className='text-3xl font-black'>The approach</h2><p className='mt-4 text-base leading-8 text-muted'>{study.approach}</p></section>
						<section><h2 className='text-3xl font-black'>Selected decisions</h2><div className='mt-5 grid gap-3'>{study.decisions.map((decision, index) => <Card className='border border-border bg-surface p-5' key={decision}><p className='text-xs font-bold text-accent'>0{index + 1}</p><p className='mt-2 font-bold'>{decision}</p></Card>)}</div></section>
						<section><h2 className='text-3xl font-black'>The result</h2><p className='mt-4 text-base leading-8 text-muted'>{study.result}</p></section>
					</div>
				</div>
			</article>
		</div>
	);
}
