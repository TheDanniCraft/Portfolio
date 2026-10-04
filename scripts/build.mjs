import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const nextBin = fileURLToPath(
	new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const plausibleScriptName =
	process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_NAME ??
	process.env.PLAUSIBLE_SCRIPT_NAME ??
	`${crypto.randomInt(1000, 10000)}-${crypto.randomBytes(8).toString("hex")}`;

const result = spawnSync(process.execPath, [nextBin, "build"], {
	stdio: "inherit",
	env: {
		...process.env,
		NODE_ENV: "production",
		NEXT_PUBLIC_PLAUSIBLE_SCRIPT_NAME: plausibleScriptName,
	},
});

if (result.error) {
	throw result.error;
}

if (result.status !== 0) {
	process.exit(result.status ?? 1);
}

writeFileSync(
	new URL("../.next/plausible-script-name", import.meta.url),
	plausibleScriptName,
	"utf8",
);
