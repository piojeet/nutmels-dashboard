import React from "react";
import { FiImage, FiTrash2, FiUploadCloud } from "react-icons/fi";

function HeaderLogoSection({ logo, onUpload, onRemove }) {
  return (
    <section className="rounded-xl border border-white-color/12 bg-white-color/[3%] p-4">
      <h2 className="font-inter-s text-base">Logo</h2>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex h-[72px] w-[140px] items-center justify-center overflow-hidden rounded-lg border border-white-color/14 bg-white-color/[2%]">
          {logo ? (
            <img
              src={logo}
              alt="Header logo preview"
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <span className="flex items-center gap-2 text-sm text-white-color/45">
              <FiImage /> No logo
            </span>
          )}
        </div>
        <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-white-color/14 bg-white-color/[3%] px-4 text-sm font-inter-m text-white-color/70 transition hover:border-yellow-color/50 hover:text-yellow-color">
          <FiUploadCloud /> Upload logo image
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="sr-only"
            onChange={(event) => onUpload(event.target.files?.[0])}
          />
        </label>
        {logo && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-400/25 bg-red-400/10 px-4 text-sm font-inter-m text-red-300 transition hover:bg-red-400/20"
          >
            <FiTrash2 /> Remove
          </button>
        )}
      </div>
    </section>
  );
}

export default HeaderLogoSection;
