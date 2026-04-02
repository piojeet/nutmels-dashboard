import React from "react";
import { FieldShell, Panel, PrimaryButton, SelectInput } from "../SettingUI";

function CurrencySection({ form, setForm }) {
  return (
    <Panel
      title="Currency"
      description="Choose how prices should appear across the storefront, checkout and reporting screens."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FieldShell label="Currency" className="md:col-span-2">
          <SelectInput
            value={form.currency}
            onChange={(event) => setForm((prev) => ({ ...prev, currency: event.target.value }))}
            options={["United States Dollar", "Euro", "Indian Rupee", "British Pound"]}
          />
        </FieldShell>
        <FieldShell label="Currency position">
          <SelectInput
            value={form.position}
            onChange={(event) => setForm((prev) => ({ ...prev, position: event.target.value }))}
            options={["Left", "Right", "Left with space", "Right with space"]}
          />
        </FieldShell>
        <FieldShell label="Decimal format">
          <SelectInput
            value={form.format}
            onChange={(event) => setForm((prev) => ({ ...prev, format: event.target.value }))}
            options={[
              "US English (1,234,567.89)",
              "EU Style (1.234.567,89)",
              "Indian (12,34,567.89)",
            ]}
          />
        </FieldShell>
      </div>

      <div className="mt-6">
        <PrimaryButton>Update currency</PrimaryButton>
      </div>
    </Panel>
  );
}

export default CurrencySection;
