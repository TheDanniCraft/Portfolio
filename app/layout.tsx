import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import PlausibleProvider from "next-plausible";
import { SiteFooter } from "@/components/site-footer";
import { SiteNavbar } from "@/components/site-navbar";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "TheDanniCraft",
	description: "Portfolio for TheDanniCraft.",
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
			<body className='flex min-h-full flex-col bg-background text-foreground' suppressHydrationWarning>
				<PlausibleProvider enabled>
					<ThemeProvider attribute='class'>
						<SiteNavbar />
						<main className='flex-1'>{children}</main>
						<SiteFooter />
					</ThemeProvider>
				</PlausibleProvider>
			</body>
		</html>
	);
}
