import type { Metadata } from "next";
import { pageMetadata, siteDescription, siteTitle, siteUrl } from "@/lib/metadata";
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
	...pageMetadata("/", siteTitle, siteDescription),
	metadataBase: new URL(siteUrl),
	title: {
		default: siteTitle,
		template: "%s · TheDanniCraft",
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
