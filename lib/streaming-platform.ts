export function isStreamingPlatformConfigured(): boolean {
  return Boolean(
    stripEnvQuotes(process.env.STREAMING_API_BASE_URL ?? "") &&
      stripEnvQuotes(process.env.STREAMING_API_KEY ?? ""),
  );
}

function stripEnvQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function requireStreamingConfig() {
  const baseUrl = stripEnvQuotes(
    process.env.STREAMING_API_BASE_URL ?? "",
  ).replace(/\/$/, "");
  const apiKey = stripEnvQuotes(process.env.STREAMING_API_KEY ?? "");
  if (!baseUrl || !apiKey) {
    throw new Error(
      "STREAMING_API_BASE_URL and STREAMING_API_KEY must be set for R2 playback.",
    );
  }
  return { baseUrl, apiKey };
}

/** Mint a short-lived signed HLS URL for a streaming-platform asset. */
export async function mintStreamingPlaybackUrl(
  platformAssetId: string,
): Promise<string> {
  const { baseUrl, apiKey } = requireStreamingConfig();
  const res = await fetch(`${baseUrl}/api/v1/playback-tokens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assetId: platformAssetId }),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as {
    playbackUrl?: string;
    error?: string;
  };
  if (!res.ok) {
    throw new Error(json.error || res.statusText || "Playback token failed");
  }
  const url = json.playbackUrl?.trim();
  if (!url) throw new Error("Playback token returned no playbackUrl");
  return url;
}

export type StreamingDownload = {
  downloadUrl: string;
  bytes: number | null;
};

/** Mint a short-lived signed MP4 download URL for a streaming-platform asset. */
export async function mintStreamingDownloadUrl(
  platformAssetId: string,
  filename?: string,
): Promise<StreamingDownload> {
  const { baseUrl, apiKey } = requireStreamingConfig();
  const res = await fetch(`${baseUrl}/api/v1/download-tokens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assetId: platformAssetId,
      ...(filename?.trim() ? { filename: filename.trim() } : {}),
    }),
    cache: "no-store",
  });
  const json = (await res.json().catch(() => ({}))) as {
    downloadUrl?: string;
    bytes?: number;
    error?: string;
  };
  if (!res.ok) {
    throw new Error(json.error || res.statusText || "Download token failed");
  }
  const downloadUrl = json.downloadUrl?.trim();
  if (!downloadUrl) throw new Error("Download token returned no downloadUrl");
  const bytes = Number(json.bytes);
  return {
    downloadUrl,
    bytes: Number.isFinite(bytes) && bytes > 0 ? Math.round(bytes) : null,
  };
}
