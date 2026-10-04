import type { Metadata } from "next";
import { Toast } from "@heroui/react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import PlausibleProvider from "next-plausible";
import { ConsentManager } from "@/components/consent-manager";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://thedannicraft.de"),
	title: {
		default: "TheDanniCraft · Product Engineering & Systems",
		template: "%s · TheDanniCraft",
	},
	description: "Independent product engineering, system architecture, automation, and open-source work by TheDanniCraft.",
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "TheDanniCraft",
		title: "TheDanniCraft · Product Engineering & Systems",
		description: "Independent product engineering, system architecture, automation, and open-source work by TheDanniCraft.",
	},
	twitter: {
		card: "summary",
		title: "TheDanniCraft · Product Engineering & Systems",
		description: "Independent product engineering, system architecture, automation, and open-source work by TheDanniCraft.",
	},
	appleWebApp: {
		title: "TheDanniCraft.de",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
			<head />
			<body className='flex min-h-full flex-col overflow-x-hidden bg-background text-foreground' suppressHydrationWarning>
				<ConsentManager>
					<PlausibleProvider enabled>
						<ThemeProvider attribute='class'>
							<Toast.Provider placement='bottom end' />
							<SiteNavbar />
							<main className='flex-1'>{children}</main>
							<SiteFooter />
						</ThemeProvider>
					</PlausibleProvider>
				</ConsentManager>
			</body>
		</html>
	);
}
