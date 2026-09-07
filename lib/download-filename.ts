export function videoDownloadFilename(title: string): string {
  const base = title
    .trim()
    .replace(/[/\\]/g, "")
    .replace(/[^\w.\- ()]/g, "")
    .slice(0, 120);
  if (!base) return "video.mp4";
  return base.toLowerCase().endsWith(".mp4") ? base : `${base}.mp4`;
}
