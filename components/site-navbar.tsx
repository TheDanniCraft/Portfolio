"use client";

import { Display, Moon, Sun } from "@gravity-ui/icons";
import { Navbar, Segment } from "@heroui-pro/react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "@heroui/react";
import { AvailabilityIndicator } from "@/components/availability-indicator";
import { useSyncExternalStore } from "react";

const navItems = [
	{ href: "/work", label: "Work" },
	{ href: "/testimonials", label: "Testimonials" },
	{ href: "/contact", label: "Contact" },
];

const LogoSVG = ({ size = 200 }) => (
	<svg width={size} height={size} viewBox='0 0 6000 6000' preserveAspectRatio='xMidYMid meet'>
		<g>
			<g id='Player'>
				<g id='Body'>
					<rect x='2147.368' y='3347.368' width='600' height='300' style={{ fill: "#c3a884" }} />
					<path d='M1847.368,3347.368l0,600l600,0l0,-300l-300,-0l0,-300l-300,0Z' style={{ fill: "#920e12" }} />
					<path d='M1847.368,3947.368l0,-600l-300.066,0l0,300l-299.934,0l0,300l600,0Z' style={{ fill: "#800d11" }} />
					<rect x='2447.368' y='3647.368' width='300' height='300' style={{ fill: "#8d0d11" }} />
					<path d='M2747.368,3647.509c0,0.492 -0,-300.141 -0,-300.141l600,0l0,600l-300,0l-0,-300l-300,0.141Z' style={{ fill: "#800d11" }} />
					<rect x='2747.368' y='3647.368' width='300' height='300' style={{ fill: "#920e12" }} />
					<rect x='3347.368' y='3647.368' width='300' height='300' style={{ fill: "#770b0f" }} />
					<rect x='947.368' y='3947.368' width='600' height='300' style={{ fill: "#860d11" }} />
					<rect x='1547.368' y='3947.368' width='300' height='300' style={{ fill: "#ad1111" }} />
					<rect x='1847.368' y='3947.368' width='1200' height='1800' style={{ fill: "#bd1313" }} />
					<path d='M2447.368,4547.368l300,0l0,600l-300,0l0,300l-300,0l0,-600l300,0l0,-300Z' style={{ fill: "#9a0f0f" }} />
					<rect x='3047.368' y='3947.368' width='300' height='300' style={{ fill: "#a51111" }} />
					<rect x='3347.368' y='3947.368' width='300' height='300' style={{ fill: "#800d11" }} />
					<rect x='3647.368' y='3947.368' width='300' height='300' style={{ fill: "#860d11" }} />
					<rect x='947.368' y='4247.368' width='300' height='300' style={{ fill: "#8a0d11" }} />
					<rect x='947.368' y='4547.368' width='300' height='1200' style={{ fill: "#920e12" }} />
					<rect x='1247.368' y='4247.368' width='300' height='300' style={{ fill: "#b31212" }} />
					<rect x='1247.368' y='4547.368' width='300' height='1200' style={{ fill: "#bd1313" }} />
					<rect x='1547.368' y='4247.368' width='300' height='300' style={{ fill: "#9f1012" }} />
					<rect x='1547.368' y='4547.368' width='300' height='1200' style={{ fill: "#a71113" }} />
					<rect x='3047.368' y='4247.368' width='300' height='900' style={{ fill: "#a21012" }} />
					<rect x='3047.368' y='5147.368' width='300' height='300' style={{ fill: "#a71113" }} />
					<rect x='3047.368' y='5447.368' width='300' height='300' style={{ fill: "#a71113" }} />
					<rect x='3347.368' y='4247.368' width='300' height='900' style={{ fill: "#a51111" }} />
					<rect x='3347.368' y='5147.368' width='300' height='300' style={{ fill: "#9a0f0f" }} />
					<rect x='3347.368' y='5447.368' width='300' height='300' style={{ fill: "#a51111" }} />
					<rect x='3647.368' y='4247.368' width='300' height='300' style={{ fill: "#b31212" }} />
					<rect x='3647.368' y='4547.368' width='300' height='1200' style={{ fill: "#bd1313" }} />
				</g>

				<g id='TV'>
					<rect x='947.368' y='947.368' width='900' height='2100' style={{ fill: "#553b45" }} />
					<rect x='1847.368' y='947.368' width='300' height='2100' style={{ fill: "#6f6572" }} />
					<rect x='2147.368' y='2747.368' width='1800' height='300' style={{ fill: "#7d7380" }} />
					<rect x='947.368' y='3047.368' width='900' height='300' style={{ fill: "#625664" }} />
					<rect x='1847.368' y='3047.368' width='300' height='300' style={{ fill: "#60454e" }} />
					<rect x='2147.368' y='3047.368' width='1800' height='300' style={{ fill: "#6c4f57" }} />

					<g id='Screen'>
						<rect x='2147.368' y='947.368' width='300' height='300' style={{ fill: "#ece20a" }} />
						<rect x='2147.368' y='1247.368' width='300' height='1500' style={{ fill: "#fff51a" }} />
						<rect x='2447.368' y='947.368' width='300' height='300' style={{ fill: "#08ded6" }} />
						<rect x='2447.368' y='1247.368' width='300' height='1500' style={{ fill: "#1afff6" }} />
						<rect x='2747.368' y='947.368' width='300' height='300' style={{ fill: "#19db10" }} />
						<rect x='2747.368' y='1247.368' width='300' height='1500' style={{ fill: "#24ff1a" }} />
						<rect x='3047.368' y='947.368' width='300' height='300' style={{ fill: "#ea0cd4" }} />
						<rect x='3047.368' y='1247.368' width='300' height='1500' style={{ fill: "#ff1ae9" }} />
						<rect x='3347.368' y='947.368' width='300' height='300' style={{ fill: "#8817b6" }} />
						<rect x='3347.368' y='1247.368' width='300' height='1500' style={{ fill: "#9e1ad2" }} />
						<rect x='3647.368' y='947.368' width='300' height='300' style={{ fill: "#6a15c7" }} />
						<rect x='3647.368' y='1247.368' width='300' height='1500' style={{ fill: "#8118f3" }} />
					</g>
				</g>
			</g>
		</g>
	</svg>
);

function BrandMark() {
	return <LogoSVG size={32} />;
}

export function SiteNavbar() {
	const pathname = usePathname();
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);

	const iconClass = "size-4 text-muted";

	return (
		<Navbar aria-label='Global navigation' className='border-border border-b bg-background/90 backdrop-blur' maxWidth='xl' navigate={router.push} position='sticky' shouldBlockScroll={false}>
			<Navbar.Header>
				<Navbar.MenuToggle className='md:hidden' />

				<Navbar.Brand>
					<Link className='flex items-center' href='/'>
						<BrandMark />
						<span className='font-bold'>TheDanniCraft</span>
					</Link>
				</Navbar.Brand>

				<Navbar.Spacer />

				<Navbar.Content className='hidden gap-0 md:flex'>
					<Navbar.Item className={`font-bold ${pathname === "/" ? "text-accent" : ""}`} href='/' isCurrent={pathname === "/"}>
						Home
					</Navbar.Item>

					{navItems.map((item) => (
						<Navbar.Item className={`font-bold ${pathname === item.href ? "text-accent" : ""}`} key={item.href} href={item.href} isCurrent={pathname === item.href}>
							{item.label}
						</Navbar.Item>
					))}
				</Navbar.Content>

				<Navbar.Spacer />

				<Navbar.Content>
					<Navbar.Item aria-label='availability' className='hidden lg:flex'>
						<AvailabilityIndicator compact />
					</Navbar.Item>

					<Navbar.Item aria-label='cta'>
						<Link className={buttonVariants({ variant: "primary" })} href='/contact'>
							Book Me
						</Link>
					</Navbar.Item>

					<Navbar.Separator className='hidden sm:block' />

					<Navbar.Item aria-label='Theme switcher' render={(props) => <a {...props} />}>
						{mounted && theme ? (
							<Segment className='gap-0' selectedKey={theme} onSelectionChange={(key) => setTheme(String(key))} size='sm'>
								<Segment.Item aria-label='Light' className='size-7 px-0' id='light'>
									<Sun className={iconClass} />
								</Segment.Item>

								<Segment.Item aria-label='Dark' className='size-7 px-0' id='dark'>
									<Moon className={iconClass} />
								</Segment.Item>

								<Segment.Item aria-label='System' className='size-7 px-0' id='system'>
									<Display className={iconClass} />
								</Segment.Item>
							</Segment>
						) : (
							<div aria-hidden className='h-7 w-21' />
						)}
					</Navbar.Item>
				</Navbar.Content>
			</Navbar.Header>

			<Navbar.Menu>
				<Navbar.MenuItem href='/' isCurrent={pathname === "/"}>
					Home
				</Navbar.MenuItem>

				{navItems.map((item) => (
					<Navbar.MenuItem className='font-bold' key={item.href} href={item.href} isCurrent={pathname === item.href}>
						{item.label}
					</Navbar.MenuItem>
				))}
			</Navbar.Menu>
		</Navbar>
	);
}
