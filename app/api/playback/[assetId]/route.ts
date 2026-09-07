import { NextResponse } from "next/server";
import { findLessonByAssetId, isCatalogAssetId } from "@/lib/catalog";
import {
  isStreamingPlatformConfigured,
  mintStreamingPlaybackUrl,
} from "@/lib/streaming-platform";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: { params: Promise<{ assetId: string }> },
) {
  const { assetId: raw } = await context.params;
  const assetId = decodeURIComponent(raw).trim();

  if (!isCatalogAssetId(assetId)) {
    return NextResponse.json({ error: "Unknown asset" }, { status: 404 });
  }
  if (!isStreamingPlatformConfigured()) {
    return NextResponse.json(
      { error: "Streaming credentials are not configured." },
      { status: 503 },
    );
  }

  try {
    const playbackUrl = await mintStreamingPlaybackUrl(assetId);
    const lesson = findLessonByAssetId(assetId)!;
    return NextResponse.json({
      assetId,
      title: lesson.title,
      playbackUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not start video playback.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
