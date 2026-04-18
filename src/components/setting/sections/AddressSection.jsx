import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FieldShell, Panel, PrimaryButton, TextInput } from "../SettingUI";
import { showAppToast } from "../../../utils/appToast";

function AddressSection({ form, setForm }) {
  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  return (
    <Panel
      title="Address"
      description="Primary business contact information shown in invoices, receipts and outgoing email templates."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FieldShell label="Email" className="md:col-span-2">
          <TextInput
            icon={FiMail}
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Enter support email"
          />
        </FieldShell>
        <FieldShell label="Phone" className="md:col-span-2">
          <TextInput
            icon={FiPhone}
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Enter support phone"
          />
        </FieldShell>
        <FieldShell label="Address line 1" className="md:col-span-2">
          <TextInput
            value={form.address1}
            onChange={(event) => updateField("address1", event.target.value)}
            placeholder="Street, building, area"
          />
        </FieldShell>
        <FieldShell label="Address line 2" className="md:col-span-2">
          <TextInput
            value={form.address2}
            onChange={(event) => updateField("address2", event.target.value)}
            placeholder="Landmark or suite"
          />
        </FieldShell>
        <FieldShell label="City">
          <TextInput
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="City"
          />
        </FieldShell>
        <FieldShell label="State">
          <TextInput
            value={form.state}
            onChange={(event) => updateField("state", event.target.value)}
            placeholder="State"
          />
        </FieldShell>
        <FieldShell label="Zip">
          <TextInput
            value={form.zip}
            onChange={(event) => updateField("zip", event.target.value)}
            placeholder="Postal code"
          />
        </FieldShell>
        <FieldShell label="Country">
          <TextInput
            icon={FiMapPin}
            value={form.country}
            onChange={(event) => updateField("country", event.target.value)}
            placeholder="Country"
          />
        </FieldShell>
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={() => notify("Business address details saved.", "success")}>
          Submit
        </PrimaryButton>
      </div>
    </Panel>
  );
}

export default AddressSection;
