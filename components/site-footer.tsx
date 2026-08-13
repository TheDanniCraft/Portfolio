"use client";

import { ArrowUpRightFromSquare } from "@gravity-ui/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { socialLinks } from "@/lib/site-content";

type ServiceStatus = "DOWN" | "UP" | "PARTIAL" | "MAINTENANCE" | "UNKNOWN";

type FooterLink = {
	href: string;
	label: string;
	external?: boolean;
};

type FooterColumn = {
	title: string;
	links: FooterLink[];
};

const statusByState: Record<ServiceStatus, { color: string; text: string }> = {
	DOWN: { color: "#dc3545", text: "Major outage" },
	UP: { color: "#5cdd8b", text: "All systems operational" },
	PARTIAL: { color: "#f8a306", text: "Partial outage" },
	MAINTENANCE: { color: "#1747f5", text: "Under maintenance" },
	UNKNOWN: { color: "#ffffff", text: "Service status unknown" },
};

const footerColumns: FooterColumn[] = [
	{
		title: "Explore",
		links: [
			{ href: "/work", label: "Work" },
			{ href: "/case-studies", label: "Case Studies" },
			{ href: "/testimonials", label: "Testimonials" },
			{ href: "/contact", label: "Contact" },
		],
	},
	{
		title: "Services",
		links: [
			{ href: "/contact", label: "Technical Advisory" },
			{ href: "/contact", label: "System Architecture" },
			{ href: "/contact", label: "Custom Product Build" },
			{ href: "/contact", label: "Workflow Automation" },
			{ href: "/contact", label: "Performance Optimization" },
			{ href: "/contact", label: "Technical SEO & Growth" },
		],
	},
	{
		title: "Legal",
		links: [
			{ href: "/contact", label: "Imprint" },
			{ href: "/contact", label: "Privacy Policy" },
			{ href: "/contact", label: "Cookie Policy" },
			{ href: "/contact", label: "Terms of Service" },
		],
	},
];

export function SiteFooter() {
	const [serviceState, setServiceState] = useState<ServiceStatus>("UNKNOWN");
	const [statusText, setStatusText] = useState("Loading...");

	useEffect(() => {
		const readStatus = async () => {
			try {
				const response = await fetch("https://api.status.thedannicraft.de/thedannicraft", {
					cache: "no-store",
				});

				const data = (await response.json()) as { status?: ServiceStatus };
				const state = data.status ?? "UNKNOWN";

				setServiceState(state);
				setStatusText(statusByState[state]?.text ?? statusByState.UNKNOWN.text);
			} catch {
				setServiceState("UNKNOWN");
				setStatusText(statusByState.UNKNOWN.text);
			}
		};

		void readStatus();
	}, []);

	return (
		<footer className='border-t border-border bg-surface-secondary/40'>
			<div className='mx-auto grid w-full max-w-6xl gap-10 px-6 py-14'>
				<div className='grid gap-8 lg:grid-cols-[1.2fr_2fr]'>
					<div>
						<h2 className='text-3xl font-black'>TheDanniCraft</h2>

						<p className='mt-3 max-w-md text-base leading-7 text-muted'>Architecture-first digital products. Built for clarity, speed, and durable scaling.</p>

						<a className='mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-foreground' href='https://status.thedannicraft.de' rel='noreferrer' target='_blank'>
							<span aria-hidden='true' className='size-2.5 rounded-full' style={{ backgroundColor: statusByState[serviceState].color }} />
							<span>{statusText}</span>
							<ArrowUpRightFromSquare className='size-3.5 text-muted' />
						</a>
					</div>

					<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
						{footerColumns.map((column) => (
							<div key={column.title}>
								<h3 className='text-xs font-bold uppercase tracking-[0.18em] text-muted'>{column.title}</h3>

								<ul className='mt-4 grid gap-2'>
									{column.links.map((link) => (
										<li key={link.label}>
											{link.external ? (
												<a className='text-sm text-foreground hover:text-accent' href={link.href} rel='noreferrer' target='_blank'>
													{link.label}
												</a>
											) : (
												<Link className='text-sm text-foreground hover:text-accent' href={link.href}>
													{link.label}
												</Link>
											)}
										</li>
									))}
								</ul>
							</div>
						))}

						<div>
							<h3 className='text-xs font-bold uppercase tracking-[0.18em] text-muted'>Social</h3>

							<ul className='mt-4 grid gap-2'>
								{socialLinks.map((link) => (
									<li key={link.label}>
										<a className='text-sm text-foreground hover:text-accent' href={link.href} rel='noreferrer' target='_blank'>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className='flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5'>
					<p className='text-xs text-muted'>&copy; {new Date().getFullYear()} TheDanniCraft</p>
					<p className='text-xs text-muted'>Crafted with precision.</p>
				</div>
			</div>
		</footer>
	);
}
