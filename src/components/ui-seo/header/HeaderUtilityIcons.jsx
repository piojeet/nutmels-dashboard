import React from "react";
import { FiLink, FiPlus, FiTrash2 } from "react-icons/fi";
import { headerFieldClass } from "./headerData";

function UtilityIconPreview({ item }) {
  const FallbackIcon = item.Icon || FiLink;
  return (
    <div className="group relative flex size-10 items-center justify-center overflow-hidden rounded-lg border border-white-color/25 text-lg text-white-color/75 transition hover:border-yellow-color">
      {item.outlineSvg ? (
        <img
          src={item.outlineSvg}
          alt=""
          className="size-5 object-contain transition group-hover:opacity-0"
        />
      ) : (
        <FallbackIcon className="transition group-hover:opacity-0" />
      )}
      {item.fillSvg ? (
        <img
          src={item.fillSvg}
          alt=""
          className="absolute size-5 object-contain opacity-0 transition group-hover:opacity-100"
        />
      ) : (
        <FallbackIcon className="absolute opacity-0 text-yellow-color transition group-hover:opacity-100" />
      )}
    </div>
  );
}

function HeaderUtilityIcons({
  items,
  onAdd,
  onUpdate,
  onRequestDelete,
  onUpload,
}) {
  return (
    <section className="mt-4 rounded-xl border border-white-color/12 bg-white-color/[3%] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-inter-s text-base">Utility icons</h2>
          <p className="mt-1 text-sm text-white-color/45">
            Set each icon as an in-page button or a link, then upload its
            outline and hover-fill SVG.
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-yellow-color px-3 text-xs font-inter-s text-black-color transition hover:brightness-110"
        >
          <FiPlus /> Add icon
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-3 rounded-xl border border-white-color/12 bg-white-color/[2%] p-3 xl:grid-cols-[42px_minmax(100px,0.55fr)_auto_minmax(170px,1fr)_auto_auto_38px] xl:items-center"
          >
            <UtilityIconPreview item={item} />
            <input
              aria-label="Utility icon name"
              value={item.label}
              onChange={(event) =>
                onUpdate(item.id, "label", event.target.value)
              }
              placeholder="Icon name"
              className={headerFieldClass}
            />
            <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-white-color/14 text-xs font-inter-m">
              {["button", "link"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onUpdate(item.id, "type", type)}
                  className={`h-10 px-3 capitalize transition ${item.type === type ? "bg-yellow-color text-black-color" : "bg-white-color/[3%] text-white-color/55 hover:bg-white-color/[8%]"}`}
                >
                  {type}
                </button>
              ))}
            </div>
            {item.type === "link" ? (
              <input
                aria-label={`${item.label || "Utility icon"} URL`}
                value={item.url}
                onChange={(event) =>
                  onUpdate(item.id, "url", event.target.value)
                }
                placeholder="https:// or /page"
                className={headerFieldClass}
              />
            ) : (
              <span className="text-sm text-white-color/45">
                Opens in-page (no URL)
              </span>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-white-color/60">
              <input
                type="checkbox"
                checked={item.isVisible}
                onChange={(event) =>
                  onUpdate(item.id, "isVisible", event.target.checked)
                }
                className="size-4 accent-yellow-color"
              />{" "}
              Show
            </label>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 text-xs font-inter-m text-white-color/65 transition hover:border-yellow-color/50 hover:text-yellow-color">
                Outline SVG
                <input
                  type="file"
                  accept=".svg,image/svg+xml"
                  className="sr-only"
                  onChange={(event) =>
                    onUpload(item.id, "outlineSvg", event.target.files?.[0])
                  }
                />
              </label>
              <label className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 text-xs font-inter-m text-white-color/65 transition hover:border-yellow-color/50 hover:text-yellow-color">
                Fill SVG
                <input
                  type="file"
                  accept=".svg,image/svg+xml"
                  className="sr-only"
                  onChange={(event) =>
                    onUpload(item.id, "fillSvg", event.target.files?.[0])
                  }
                />
              </label>
            </div>
            <button
              type="button"
              onClick={() => onRequestDelete(item.id, item.label)}
              aria-label={`Remove ${item.label || "utility icon"}`}
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
        <FiPlus /> Add icon
      </button>
    </section>
  );
}

export default HeaderUtilityIcons;
