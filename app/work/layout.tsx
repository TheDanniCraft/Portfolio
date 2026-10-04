import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("/work", "Selected Work", "Explore TheDanniCraft’s web applications, developer tools, bots, and open-source projects, including the engineering decisions behind each build.");

export default function WorkLayout({ children }: { children: ReactNode }) {
	return children;
}
