"use client";

import { useEffect, useMemo, useState } from "react";
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadLesson(lesson: Lesson): Promise<string | null> {
  const res = await fetch(`${downloadHref(lesson)}&format=json`, {
    headers: { Accept: "application/json" },
  });
  const json = (await res.json().catch(() => ({}))) as {
    downloadUrl?: string;
    error?: string;
  };

  if (!res.ok || !json.downloadUrl) {
    return json.error || "Download failed.";
  }

  // Hidden iframe follows the signed URL without navigating this page.
  // More reliable than programmatic <a> clicks after async work.
  const iframe = document.createElement("iframe");
  iframe.style.display = "none";
  iframe.src = json.downloadUrl;
  document.body.appendChild(iframe);
  window.setTimeout(() => iframe.remove(), 60_000);
  return null;
}

export function CourseBrowser({ modules }: { modules: Module[] }) {
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [playbackUrl, setPlaybackUrl] = useState<string | null>(null);
  const [playbackError, setPlaybackError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(() => new Set());
  const [batchStatus, setBatchStatus] = useState<string | null>(null);
  const [batchBusy, setBatchBusy] = useState(false);

  const allLessons = useMemo(
    () => modules.flatMap((module) => module.lessons),
    [modules],
  );

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

  function toggleLesson(assetId: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(assetId)) next.delete(assetId);
      else next.add(assetId);
      return next;
    });
  }

  function setModuleChecked(module: Module, value: boolean) {
    setChecked((prev) => {
      const next = new Set(prev);
      for (const lesson of module.lessons) {
        if (value) next.add(lesson.assetId);
        else next.delete(lesson.assetId);
      }
      return next;
    });
  }

  function moduleCheckState(module: Module): boolean | "mixed" {
    const total = module.lessons.length;
    const count = module.lessons.filter((l) => checked.has(l.assetId)).length;
    if (count === 0) return false;
    if (count === total) return true;
    return "mixed";
  }

  async function downloadChecked() {
    const lessons = allLessons.filter((lesson) => checked.has(lesson.assetId));
    if (lessons.length === 0 || batchBusy) return;

    setBatchBusy(true);
    const failures: string[] = [];

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i]!;
      setBatchStatus(`Downloading ${i + 1}/${lessons.length}: ${lesson.title}`);
      try {
        const error = await downloadLesson(lesson);
        if (error) failures.push(`${lesson.title} — ${error}`);
      } catch {
        failures.push(`${lesson.title} — Could not start download.`);
      }
      if (i < lessons.length - 1) await sleep(900);
    }

    if (failures.length === 0) {
      setBatchStatus(`Finished ${lessons.length} download${lessons.length === 1 ? "" : "s"}.`);
    } else {
      setBatchStatus(
        `Finished with ${failures.length} issue${failures.length === 1 ? "" : "s"}: ${failures.join(" · ")}`,
      );
    }
    setBatchBusy(false);
  }

  const checkedCount = checked.size;

  return (
    <div className="mx-auto grid min-h-full w-full max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,28rem)]">
      <div className="min-w-0">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Why Islam is True videos
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Click a lesson to play it on the right. Check lessons to download
          several at once.
        </p>

        <div className="sticky top-0 z-10 mt-4 flex flex-wrap items-center gap-3 border-b border-zinc-200 bg-white/95 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
          <button
            type="button"
            disabled={checkedCount === 0 || batchBusy}
            onClick={() => void downloadChecked()}
            className="inline-flex items-center gap-2 bg-zinc-900 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
          >
            <DownloadIcon className="h-4 w-4" />
            Download selected{checkedCount > 0 ? ` (${checkedCount})` : ""}
          </button>
          {checkedCount > 0 ? (
            <button
              type="button"
              disabled={batchBusy}
              onClick={() => setChecked(new Set())}
              className="text-sm text-zinc-600 hover:text-zinc-900 disabled:opacity-40 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Clear selection
            </button>
          ) : null}
          {batchStatus ? (
            <p className="w-full text-sm text-zinc-600 dark:text-zinc-400" role="status">
              {batchStatus}
            </p>
          ) : null}
        </div>

        <div className="mt-6 space-y-8">
          {modules.map((module) => {
            const moduleState = moduleCheckState(module);
            return (
              <section key={module.id}>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-zinc-900"
                    checked={moduleState === true}
                    ref={(el) => {
                      if (el) el.indeterminate = moduleState === "mixed";
                    }}
                    onChange={(event) =>
                      setModuleChecked(module, event.target.checked)
                    }
                    aria-label={`Select all lessons in ${module.title}`}
                  />
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                    {module.title}
                  </h2>
                </div>
                <ul className="mt-3 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                  {module.lessons.map((lesson) => {
                    const active = selected?.assetId === lesson.assetId;
                    const isChecked = checked.has(lesson.assetId);
                    return (
                      <li key={lesson.assetId}>
                        <div
                          className={`flex items-start gap-3 px-2 py-3 ${
                            active
                              ? "bg-zinc-100 dark:bg-zinc-900"
                              : "hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 shrink-0 accent-zinc-900"
                            checked={isChecked}
                            onChange={() => toggleLesson(lesson.assetId)}
                            onClick={(event) => event.stopPropagation()}
                            aria-label={`Select ${lesson.title}`}
                          />
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
            );
          })}
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
