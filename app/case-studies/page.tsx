import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import type { Metadata } from "next";
import Link from "next/link";
import { ProjectImage } from "@/components/project-image";
import { caseStudyProjects } from "@/lib/projects";

export const metadata: Metadata = {
	title: "Case Studies · TheDanniCraft",
	description: "Detailed product and engineering case studies from TheDanniCraft.",
};

export default function CaseStudiesPage() {
	return (
		<div className='min-h-screen bg-background text-foreground'>
			<header className='mx-auto w-full max-w-6xl px-6 py-16 sm:py-24'>
				<p className='text-xs font-bold uppercase tracking-[0.3em] text-accent'>Behind the work</p>
				<h1 className='mt-5 max-w-4xl text-5xl font-black leading-[0.9] sm:text-7xl'>Products, systems, and the decisions behind them.</h1>
				<p className='mt-7 max-w-2xl text-lg leading-8 text-muted'>A closer look at selected projects: what needed to work, how I approached it, and what shipped.</p>
			</header>

			<section className='mx-auto grid w-full max-w-6xl gap-8 px-6 pb-24'>
				{caseStudyProjects.map((project, index) => (
					<Card className='grid overflow-hidden border border-border bg-surface p-0 md:grid-cols-2' key={project.slug}>
						<ProjectImage alt={project.imageAlt} className='aspect-[16/10] md:aspect-auto md:min-h-[28rem]' position={project.imagePosition} sizes='(min-width: 768px) 50vw, 100vw' src={project.image} />
						<div className={`flex flex-col justify-center p-8 sm:p-12 ${index % 2 === 1 ? "md:-order-1" : ""}`}>
							<p className='text-xs font-bold uppercase tracking-[0.2em] text-accent'>{project.caseStudy?.eyebrow}</p>
							<h2 className='mt-4 text-4xl font-black sm:text-5xl'>{project.title}</h2>
							<p className='mt-5 text-base leading-7 text-muted'>{project.summary}</p>
							<div className='mt-6 flex flex-wrap gap-2'>{project.tags.map((tag) => <span className='border border-border px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em]' key={tag}>{tag}</span>)}</div>
							<Link className='mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline' href={`/work/${project.slug}`}>Read case study <ArrowUpRightFromSquare className='size-4' /></Link>
						</div>
					</Card>
				))}
			</section>
		</div>
	);
}
