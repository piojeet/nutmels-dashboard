import React from "react";
import { FiCheck, FiSave } from "react-icons/fi";
import DeleteConfirmationModal from "./footer/DeleteConfirmationModal";
import FooterAbout from "./footer/FooterAbout";
import FooterContactInfo from "./footer/FooterContactInfo";
import FooterLinkEditor from "./footer/FooterLinkEditor";
import FooterSocialLinks from "./footer/FooterSocialLinks";
import { useSeoFooter } from "../../hooks/useSeoFooter";

function SeoFooter() {
  const footerEditor = useSeoFooter();
  const { footer, pendingDeletion } = footerEditor;

  return (
    <form
      className="seo-footer-editor pb-4 text-white-color"
      onSubmit={(event) => {
        event.preventDefault();
        footerEditor.saveFooter();
      }}
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 sticky top-0">
        <div>
          <h1 className="text-xl font-inter-b">Footer settings</h1>
          <p className="mt-1 text-sm text-white-color/50">
            Manage the content and links displayed in your website footer.
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
          <FooterAbout
            value={footer.aboutText}
            onChange={(value) => footerEditor.updateFooter("aboutText", value)}
          />
          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <FooterLinkEditor
              title="Quick links"
              links={footer.quickLinks}
              onChange={(links) =>
                footerEditor.updateFooter("quickLinks", links)
              }
              onAdd={() => footerEditor.addLink("quickLinks")}
              onRequestDelete={footerEditor.requestDeletion("quick")}
            />
            <FooterLinkEditor
              title="Policy links"
              links={footer.policyLinks}
              onChange={(links) =>
                footerEditor.updateFooter("policyLinks", links)
              }
              onAdd={() => footerEditor.addLink("policyLinks")}
              onRequestDelete={footerEditor.requestDeletion("policy")}
            />
          </div>
          <FooterContactInfo
            contact={footer.contact}
            onChange={footerEditor.updateContact}
          />
          <FooterSocialLinks
            socialLinks={footer.socialLinks}
            onAdd={footerEditor.addSocial}
            onUpdate={footerEditor.updateSocial}
            onRequestDelete={footerEditor.requestDeletion("social")}
            onUpload={footerEditor.uploadSocialSvg}
          />
          
        </div>
      </div>

      <DeleteConfirmationModal
        item={pendingDeletion}
        onCancel={footerEditor.cancelDeletion}
        onConfirm={footerEditor.confirmDeletion}
      />
    </form>
  );
}

export default SeoFooter;
