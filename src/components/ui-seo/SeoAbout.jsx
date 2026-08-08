import React from "react";
import { FiCheck, FiSave } from "react-icons/fi";
import { useSeoAbout } from "../../hooks/useSeoAbout";
import DeleteConfirmationModal from "./footer/DeleteConfirmationModal";
import AboutParagraphs from "./about/AboutParagraphs";
import AboutSideMedia from "./about/AboutSideMedia";
import AboutWhyUs from "./about/AboutWhyUs";

function SeoAbout() {
  const aboutEditor = useSeoAbout();
  const { about, pendingDeletion } = aboutEditor;

  return (
    <form
      className="seo-about-editor pb-4 text-white-color"
      onSubmit={(event) => {
        event.preventDefault();
        aboutEditor.saveAbout();
      }}
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-inter-b">About settings</h1>
          <p className="mt-1 text-sm text-white-color/50">
            Edit the content, side media and “Why us” highlights for your About
            page.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-yellow-color px-4 text-sm font-inter-s text-black-color shadow-side-bar transition hover:brightness-110"
        >
          <FiSave /> Save changes
        </button>
      </header>
      <div className="flex h-[calc(100dvh-250px)] min-h-0 flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2">
          <AboutParagraphs
            paragraphs={about.paragraphs}
            onChange={(paragraphs) =>
              aboutEditor.updateAbout("paragraphs", paragraphs)
            }
            onAdd={aboutEditor.addParagraph}
            onRequestDelete={aboutEditor.requestDeletion("paragraph")}
          />
          <AboutSideMedia
            media={about.sideMedia}
            mediaType={about.sideMediaType}
            caption={about.overlayCaption}
            onCaptionChange={(value) =>
              aboutEditor.updateAbout("overlayCaption", value)
            }
            onUpload={aboutEditor.uploadSideMedia}
            onRemove={() => {
              aboutEditor.updateAbout("sideMedia", "");
              aboutEditor.updateAbout("sideMediaType", "");
            }}
          />
          <AboutWhyUs
            whyUs={about.whyUs}
            onMetaChange={aboutEditor.updateWhyUs}
            onItemsChange={(items) => aboutEditor.updateWhyUs("items", items)}
            onAdd={aboutEditor.addWhyUsItem}
            onRequestDelete={aboutEditor.requestDeletion("why-us")}
            onUpload={aboutEditor.uploadWhyUsIcon}
          />

        </div>
      </div>
      <DeleteConfirmationModal
        item={pendingDeletion}
        onCancel={aboutEditor.cancelDeletion}
        onConfirm={aboutEditor.confirmDeletion}
      />
    </form>
  );
}

export default SeoAbout;
