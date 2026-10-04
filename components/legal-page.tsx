import type { ReactNode } from "react";
import Link from "next/link";

type LegalSection = {
	title: string;
	content: ReactNode;
};

type LegalPageProps = {
	activePath: string;
	eyebrow: string;
	title: string;
	intro: string;
	sections: LegalSection[];
};

const legalDocuments = [
	{ href: "/legal/privacy", label: "Privacy" },
	{ href: "/legal/cookies", label: "Storage & Cookies" },
	{ href: "/legal/privacy-requests", label: "Privacy Requests" },
	{ href: "/legal/imprint", label: "Imprint" },
];

export function LegalPage({ activePath, eyebrow, title, intro, sections }: LegalPageProps) {
	return (
		<div className='min-h-screen bg-background text-foreground'>
			<article className='mx-auto w-full max-w-4xl px-6 pb-24 pt-16 sm:pt-24'>
				<header className='border-b border-border pb-12'>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-accent'>{eyebrow}</p>
					<h1 className='mt-5 flex h-36 items-start text-5xl font-black leading-[0.92] sm:h-auto sm:text-7xl'>{title}</h1>
					<p className='mt-6 h-40 max-w-3xl text-lg leading-8 text-muted sm:h-auto'>{intro}</p>
					<div className='mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-muted'>
						<span>Version 1.0.0</span>
						<span>Effective 3 October 2026</span>
					</div>
				</header>

				<nav aria-label='Legal documents' className='mt-6 flex flex-wrap gap-2 border-b border-border pb-6'>
					{legalDocuments.map((document) => (
						<Link className={`border px-3 py-2 text-xs font-bold uppercase tracking-[0.1em] ${activePath === document.href ? "border-accent bg-accent text-accent-foreground" : "border-border bg-surface text-muted hover:text-foreground"}`} href={document.href} key={document.href}>
							{document.label}
						</Link>
					))}
				</nav>

				<div className='mt-12 grid gap-12'>
					{sections.map((section) => (
						<section key={section.title}>
							<h2 className='text-2xl font-black sm:text-3xl'>{section.title}</h2>
							<div className='mt-4 grid gap-4 text-base leading-8 text-muted'>{section.content}</div>
						</section>
					))}
				</div>
			</article>
		</div>
	);
}
