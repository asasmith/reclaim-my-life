"use client";

type PreviewBannerProps = {
  isPreview: boolean;
};

export default function PreviewBanner({ isPreview }: PreviewBannerProps) {
  if (!isPreview) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-amber-500 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-sm sm:px-6 lg:px-8">
        <span className="font-semibold">Preview Mode</span>
        <a
          href="/api/exit-preview"
          className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/30"
        >
          Exit Preview
        </a>
      </div>
    </div>
  );
}
