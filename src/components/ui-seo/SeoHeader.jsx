import React from "react";
import { FiCheck, FiSave } from "react-icons/fi";
import { useSeoHeader } from "../../hooks/useSeoHeader";
import DeleteConfirmationModal from "./footer/DeleteConfirmationModal";
import HeaderLogoSection from "./header/HeaderLogoSection";
import HeaderNavigationLinks from "./header/HeaderNavigationLinks";
import HeaderUtilityIcons from "./header/HeaderUtilityIcons";

function SeoHeader() {
  const headerEditor = useSeoHeader();
  const { header, pendingDeletion } = headerEditor;

  return (
    <form
      className="seo-header-editor pb-4 text-white-color"
      onSubmit={(event) => {
        event.preventDefault();
        headerEditor.saveHeader();
      }}
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-inter-b">Header settings</h1>
          <p className="mt-1 text-sm text-white-color/50">
            Manage your logo, navigation and utility actions.
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
          <HeaderLogoSection
            logo={header.logo}
            onUpload={headerEditor.uploadLogo}
            onRemove={() => headerEditor.updateHeader("logo", "")}
          />
          <HeaderNavigationLinks
            links={header.navigationLinks}
            onChange={(links) =>
              headerEditor.updateHeader("navigationLinks", links)
            }
            onAdd={headerEditor.addNavLink}
            onRequestDelete={headerEditor.requestDeletion("navigation")}
          />
          <HeaderUtilityIcons
            items={header.utilityIcons}
            onAdd={headerEditor.addUtilityIcon}
            onUpdate={headerEditor.updateUtilityIcon}
            onRequestDelete={headerEditor.requestDeletion("utility")}
            onUpload={headerEditor.uploadUtilitySvg}
          />
        </div>
      </div>
      <DeleteConfirmationModal
        item={pendingDeletion}
        onCancel={headerEditor.cancelDeletion}
        onConfirm={headerEditor.confirmDeletion}
      />
    </form>
  );
}

export default SeoHeader;
