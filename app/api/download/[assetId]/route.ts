import { NextResponse } from "next/server";
import { findLessonByAssetId, isCatalogAssetId } from "@/lib/catalog";
import {
  isStreamingPlatformConfigured,
  mintStreamingDownloadUrl,
} from "@/lib/streaming-platform";
import { videoDownloadFilename } from "@/lib/download-filename";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  context: { params: Promise<{ assetId: string }> },
) {
  const { assetId: raw } = await context.params;
  const assetId = decodeURIComponent(raw).trim();

  if (!isCatalogAssetId(assetId)) {
    return new NextResponse("Unknown asset", { status: 404 });
  }
  if (!isStreamingPlatformConfigured()) {
    return new NextResponse("Streaming credentials are not configured.", {
      status: 503,
    });
  }

  const lesson = findLessonByAssetId(assetId)!;
  const { searchParams } = new URL(request.url);
  const filename =
    searchParams.get("filename")?.trim() ||
    videoDownloadFilename(lesson.title);

  try {
    const { downloadUrl } = await mintStreamingDownloadUrl(assetId, filename);
    const wantsJson =
      searchParams.get("format") === "json" ||
      request.headers.get("accept")?.includes("application/json");
    if (wantsJson) {
      return NextResponse.json({
        assetId,
        title: lesson.title,
        downloadUrl,
        filename,
      });
    }
    return NextResponse.redirect(downloadUrl);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not start download.";
    const wantsJson =
      searchParams.get("format") === "json" ||
      request.headers.get("accept")?.includes("application/json");
    if (wantsJson) {
      return NextResponse.json({ error: message }, { status: 502 });
    }
    return new NextResponse(message, { status: 502 });
  }
}
