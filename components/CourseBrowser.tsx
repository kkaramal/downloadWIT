"use client";

import { useEffect, useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import type { Lesson, Module } from "@/lib/catalog";
import { videoDownloadFilename } from "@/lib/download-filename";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
      />
    </svg>
  );
}

function downloadHref(lesson: Lesson) {
  return `/api/download/${encodeURIComponent(lesson.assetId)}?filename=${encodeURIComponent(videoDownloadFilename(lesson.title))}`;
}

export function CourseBrowser({ modules }: { modules: Module[] }) {
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selected) {
      setPlaybackUrl(null);
      setPlaybackError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setPlaybackUrl(null);
    setPlaybackError(null);
    setLoading(true);

    fetch(`/api/playback/${encodeURIComponent(selected.assetId)}`)
      .then(async (res) => {
        const json = (await res.json().catch(() => ({}))) as {
          playbackUrl?: string;
          error?: string;
        };
        if (cancelled) return;
        if (!res.ok || !json.playbackUrl) {
          setPlaybackError(json.error || "Could not start video playback.");
          return;
        }
        setPlaybackUrl(json.playbackUrl);
      })
      .catch(() => {
        if (!cancelled) setPlaybackError("Could not start video playback.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selected]);

  return (
    <div className="mx-auto grid min-h-full w-full max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,28rem)]">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Course videos
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Click a lesson to play it on the right. Download uses a signed MP4
          when one exists for that asset.
        </p>

        <div className="mt-8 space-y-8">
          {modules.map((module) => (
            <section key={module.id}>
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                {module.title}
              </h2>
              <ul className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {module.lessons.map((lesson) => {
                  const active = selected?.assetId === lesson.assetId;
                  return (
                    <li key={lesson.assetId}>
                      <div
                        className={`flex items-start gap-3 px-2 py-3 ${
                          active
                            ? "bg-zinc-100 dark:bg-zinc-900"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setSelected(lesson)}
                          className="min-w-0 flex-1 cursor-pointer text-left text-sm text-zinc-800 dark:text-zinc-200"
                        >
                          <span className="text-zinc-400">{lesson.id}.</span>{" "}
                          {lesson.title}
                        </button>
                        <a
                          href={downloadHref(lesson)}
                          title={`Download ${lesson.title}`}
                          aria-label={`Download ${lesson.title}`}
                          onClick={(event) => event.stopPropagation()}
                          className="inline-flex shrink-0 items-center gap-1.5 pt-0.5 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                        >
                          <DownloadIcon className="h-4 w-4" />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-6 lg:self-start">
        <div className="border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          {selected ? (
            <>
              <p className="text-xs uppercase tracking-wide text-zinc-500">
                Now playing
              </p>
              <h2 className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {selected.title}
              </h2>
              <div className="mt-4">
                {playbackUrl ? (
                  <VideoPlayer key={playbackUrl} src={playbackUrl} />
                ) : playbackError ? (
                  <p className="text-sm text-red-600">{playbackError}</p>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-900">
                    {loading ? "Loading video…" : "Loading video…"}
                  </div>
                )}
              </div>
              <a
                href={downloadHref(selected)}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 underline-offset-4 hover:underline dark:text-zinc-300"
              >
                <DownloadIcon className="h-4 w-4" />
                Download video
              </a>
            </>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-zinc-50 text-sm text-zinc-500 dark:bg-zinc-900">
              Select a lesson to play
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
