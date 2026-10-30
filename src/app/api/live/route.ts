import { NextResponse } from "next/server";
import { getLiveFeedSnapshot } from "@/lib/liveFeed";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const feed = await getLiveFeedSnapshot();
    return NextResponse.json(feed, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Failed to load live feed",
      },
      { status: 500 }
    );
  }
}
