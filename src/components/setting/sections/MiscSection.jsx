import React from "react";
import { CheckRow, FieldShell, Panel, PrimaryButton, SelectInput } from "../SettingUI";

function MiscSection({ form, setForm }) {
  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Panel
      title="Miscellaneous"
      description="Extra storefront controls that do not fit into a single feature module."
    >
      <div className="rounded-[24px] border border-sky-300/20 bg-sky-400/15 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-inter-s text-sky-100">This script is activated.</div>
            <div className="mt-1 text-sm text-sky-100/75">
              Frontend preview of the status banner shown when custom store scripts are active.
            </div>
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-white-color/10 px-5 text-sm font-inter-s text-white-color transition hover:bg-white-color/15"
          >
            Deactivate
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 xl:grid-cols-2">
        <CheckRow
          checked={form.guestCheckout}
          onChange={() => updateField("guestCheckout", !form.guestCheckout)}
          label="Guest checkout"
          description="Allow customers to place orders without creating an account."
        />
        <CheckRow
          checked={form.cookieBanner}
          onChange={() => updateField("cookieBanner", !form.cookieBanner)}
          label="Cookie banner"
          description="Display a consent banner for tracking and analytics scripts."
        />
        <CheckRow
          checked={form.vendorRegistration}
          onChange={() => updateField("vendorRegistration", !form.vendorRegistration)}
          label="Vendor registration"
          description="Open seller onboarding from the storefront registration flow."
        />
        <CheckRow
          checked={form.attachPdf}
          onChange={() => updateField("attachPdf", !form.attachPdf)}
          label="Attach PDF in user email"
          description="Send invoice PDF with order confirmation and status emails."
        />
        <CheckRow
          checked={form.translatePdf}
          onChange={() => updateField("translatePdf", !form.translatePdf)}
          label="Translate attached PDF in email"
          description="Use selected language when generating invoice PDFs."
        />
        <CheckRow
          checked={form.sellerEmail}
          onChange={() => updateField("sellerEmail", !form.sellerEmail)}
          label="Send email to seller on new orders"
          description="Notify vendors immediately when their product gets ordered."
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <FieldShell label="Default location for shipping">
          <SelectInput
            value={form.country}
            onChange={(event) => updateField("country", event.target.value)}
            options={["Afghanistan", "India", "United States", "United Kingdom"]}
          />
        </FieldShell>
        <FieldShell label="State / region">
          <SelectInput
            value={form.region}
            onChange={(event) => updateField("region", event.target.value)}
            options={["Badakhshan", "Delhi", "California", "England"]}
          />
        </FieldShell>
      </div>

      <div className="mt-6">
        <PrimaryButton>Save</PrimaryButton>
      </div>
    </Panel>
  );
}

export default MiscSection;
