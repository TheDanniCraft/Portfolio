import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const requireFromReactPdf = createRequire(require.resolve("react-pdf/package.json"));

// Handle different install ways
const candidates = [
	// Nested under react-pdf
	() => requireFromReactPdf.resolve("pdfjs-dist/build/pdf.worker.min.mjs"),

	// Hoisted to project root
	() => require.resolve("pdfjs-dist/build/pdf.worker.min.mjs"),
];

let workerPath;

for (const resolveCandidate of candidates) {
	try {
		workerPath = resolveCandidate();
		break;
	} catch {}
}

if (!workerPath) {
	throw new Error("Could not resolve pdfjs-dist worker from react-pdf or root.");
}

fs.mkdirSync("public", { recursive: true });
fs.copyFileSync(workerPath, path.join("public", "pdf.worker.min.mjs"));

console.log(`Copied PDF worker from: ${workerPath}`);
