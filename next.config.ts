import crypto from "node:crypto";
import type { NextConfig } from "next";
import { withPlausibleProxy } from "next-plausible";

const plausibleSrc = "https://analytics.thedannicraft.de/js/pa-vjEfRmCPakwCirroPOV8h.js";
const plausibleScriptName = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_NAME ?? process.env.PLAUSIBLE_SCRIPT_NAME ?? `${crypto.randomInt(1000, 10000)}-${crypto.randomBytes(8).toString("hex")}`;

const nextConfig: NextConfig = {
	allowedDevOrigins: ["*.coder.cloud.thedannicraft.de"],
	poweredByHeader: false,
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=()" },
				],
			},
		];
	},
};

export default withPlausibleProxy({
	src: plausibleSrc,
	scriptPath: `/js/${plausibleScriptName}.js`,
})(nextConfig);
