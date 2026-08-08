import React from "react";
import { FiImage, FiTrash2, FiUploadCloud, FiVideo } from "react-icons/fi";
import { aboutFieldClass } from "./aboutData";

function AboutSideMedia({
  media,
  mediaType,
  caption,
  onCaptionChange,
  onUpload,
  onRemove,
}) {
  const isVideo = mediaType.startsWith("video/");
  return (
    <section className="mt-4 rounded-xl border border-white-color/12 bg-white-color/[3%] p-4">
      <h2 className="font-inter-s text-base">Side media</h2>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <span className="text-sm text-white-color/65">Image or video</span>
          <div className="mt-1 flex min-h-10 items-center justify-between gap-3 rounded-lg border border-white-color/14 bg-white-color/[3%] px-3">
            <span className="truncate text-sm text-white-color/55">
              {media
                ? isVideo
                  ? "Video uploaded"
                  : "Image uploaded"
                : "No media"}
            </span>
            {media ? (
              isVideo ? (
                <FiVideo className="shrink-0 text-yellow-color" />
              ) : (
                <FiImage className="shrink-0 text-yellow-color" />
              )
            ) : null}
          </div>
          {media && (
            <div className="mt-3 h-68 overflow-hidden rounded-lg border border-white-color/12 bg-black-color/20">
              {isVideo ? (
                <video
                  src={media}
                  className="h-full w-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={media}
                  alt="About side media preview"
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-3">
            <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-white-color/14 bg-white-color/[3%] px-4 text-sm font-inter-m text-white-color/70 transition hover:border-yellow-color/50 hover:text-yellow-color">
              <FiUploadCloud /> Upload image or video
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml,video/mp4,video/webm"
                className="sr-only"
                onChange={(event) => onUpload(event.target.files?.[0])}
              />
            </label>
            {media && (
              <button
                type="button"
                onClick={onRemove}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-400/25 bg-red-400/10 px-4 text-sm font-inter-m text-red-300 transition hover:bg-red-400/20"
              >
                <FiTrash2 /> Remove
              </button>
            )}
          </div>
        </div>
        <label className="block text-sm text-white-color/65">
          Overlay caption text
          <input
            value={caption}
            onChange={(event) => onCaptionChange(event.target.value)}
            placeholder="Add overlay caption"
            className={`${aboutFieldClass} mt-2`}
          />
        </label>
      </div>
    </section>
  );
}

export default AboutSideMedia;
