import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
	return NextResponse.json(
		{
			status: "ok",
			revision: process.env.SOURCE_COMMIT ?? null,
			timestamp: new Date().toISOString(),
		},
		{ headers: { "Cache-Control": "no-store" } },
	);
}
