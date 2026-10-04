import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const nextBin = fileURLToPath(
	new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const plausibleScriptName = readFileSync(
	new URL("../.next/plausible-script-name", import.meta.url),
	"utf8",
).trim();

if (!plausibleScriptName) {
	throw new Error("The Plausible proxy path generated during build is missing.");
}

const result = spawnSync(
	process.execPath,
	[nextBin, "start", ...process.argv.slice(2)],
	{
		stdio: "inherit",
		env: {
			...process.env,
			NODE_ENV: "production",
			NEXT_PUBLIC_PLAUSIBLE_SCRIPT_NAME: plausibleScriptName,
		},
	},
);

if (result.error) {
	throw result.error;
}

process.exit(result.status ?? 1);
