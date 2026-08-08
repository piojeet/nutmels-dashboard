import React from "react";
import { FiPlus, FiStar, FiTrash2 } from "react-icons/fi";
import { aboutFieldClass } from "./aboutData";

function AboutWhyUs({
  whyUs,
  onMetaChange,
  onItemsChange,
  onAdd,
  onRequestDelete,
  onUpload,
}) {
  const updateItem = (id, field, value) =>
    onItemsChange(
      whyUs.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  return (
    <section className="mt-4 rounded-xl border border-white-color/12 bg-white-color/[3%] p-4">
      <h2 className="font-inter-s text-base">“Why us” section</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="block text-sm text-white-color/65">
          Title
          <input
            value={whyUs.title}
            onChange={(event) => onMetaChange("title", event.target.value)}
            className={`${aboutFieldClass} mt-2`}
          />
        </label>
        <label className="block text-sm text-white-color/65">
          Subtitle
          <input
            value={whyUs.subtitle}
            onChange={(event) => onMetaChange("subtitle", event.target.value)}
            className={`${aboutFieldClass} mt-2`}
          />
        </label>
      </div>
      <div className="mt-4 space-y-3">
        {whyUs.items.map((item) => (
          <div
            key={item.id}
            className="grid gap-3 rounded-xl border border-white-color/12 bg-white-color/[2%] p-3 sm:grid-cols-[42px_minmax(0,1fr)_auto_38px] sm:items-center"
          >
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-white-color/25 text-yellow-color">
              {item.iconSvg ? (
                <img
                  src={item.iconSvg}
                  alt=""
                  className="size-5 object-contain"
                />
              ) : (
                <FiStar />
              )}
            </div>
            <input
              aria-label="Why us item label"
              value={item.label}
              onChange={(event) =>
                updateItem(item.id, "label", event.target.value)
              }
              placeholder="Item label"
              className={aboutFieldClass}
            />
            <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 text-xs font-inter-m text-white-color/65 transition hover:border-yellow-color/50 hover:text-yellow-color">
              Upload icon SVG
              <input
                type="file"
                accept=".svg,image/svg+xml"
                className="sr-only"
                onChange={(event) => onUpload(item.id, event.target.files?.[0])}
              />
            </label>
            <button
              type="button"
              onClick={() => onRequestDelete(item.id, item.label)}
              aria-label={`Remove ${item.label || "item"}`}
              className="flex h-10 w-[38px] items-center justify-center rounded-lg border border-white-color/10 text-white-color/45 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-inter-m text-yellow-color transition hover:brightness-110"
      >
        <FiPlus /> Add item
      </button>
    </section>
  );
}

export default AboutWhyUs;
