import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const snapPath = path.join(process.cwd(), "src/lib/realDataSnapshot.json");
    if (fs.existsSync(snapPath)) {
      const snap = JSON.parse(fs.readFileSync(snapPath, "utf-8"));
      return NextResponse.json(
        {
          articles: snap.articles || [],
          generatedAt: snap.generatedAt || new Date().toISOString(),
        },
        {
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }
  } catch {
    // Fallback
  }
  return NextResponse.json({ articles: [], generatedAt: new Date().toISOString() });
}
