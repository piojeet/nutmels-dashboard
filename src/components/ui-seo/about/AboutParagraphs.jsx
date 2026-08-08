import React from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

function AboutParagraphs({ paragraphs, onChange, onAdd, onRequestDelete }) {
  const updateParagraph = (id, value) =>
    onChange(
      paragraphs.map((paragraph) =>
        paragraph.id === id ? { ...paragraph, text: value } : paragraph,
      ),
    );
  return (
    <section className="rounded-xl border border-white-color/12 bg-white-color/[3%] p-4">
      <h2 className="font-inter-s text-base">Body paragraphs</h2>
      <div className="mt-4 space-y-3">
        {paragraphs.map((paragraph) => (
          <div
            key={paragraph.id}
            className="grid grid-cols-[minmax(0,1fr)_38px] gap-3"
          >
            <textarea
              aria-label="About paragraph"
              value={paragraph.text}
              onChange={(event) =>
                updateParagraph(paragraph.id, event.target.value)
              }
              rows={1}
              className="min-h-16 w-full resize-y rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 py-2.5 text-sm leading-6 text-white-color outline-none transition placeholder:text-white-color/25 focus:border-yellow-color/50 focus:bg-white-color/[6%]"
            />
            <button
              type="button"
              onClick={() => onRequestDelete(paragraph.id, "this paragraph")}
              aria-label="Remove paragraph"
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
        <FiPlus /> Add paragraph
      </button>
    </section>
  );
}

export default AboutParagraphs;
