import React from "react";
import { FieldShell, Panel, PrimaryButton, TextInput, ToggleSwitch } from "../SettingUI";

function AnalyticsSection({ form, setForm }) {
  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Panel
      title="Analytics"
      description="Toggle measurement platforms and keep tracking IDs organised in one place."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[24px] border border-white-color/12 bg-white-color/[3%] p-5">
          <ToggleSwitch
            checked={form.googleEnabled}
            onChange={() => updateField("googleEnabled", !form.googleEnabled)}
            label="Enable Google Analytics"
            description="Track page views, conversions and campaign performance."
          />
          <div className="mt-4">
            <FieldShell label="Google Analytics ID">
              <TextInput
                value={form.googleAnalyticsId}
                onChange={(event) => updateField("googleAnalyticsId", event.target.value)}
                placeholder="eg. G-XXXXXXXXXX"
              />
            </FieldShell>
          </div>
        </div>

        <div className="rounded-[24px] border border-white-color/12 bg-white-color/[3%] p-5">
          <ToggleSwitch
            checked={form.facebookEnabled}
            onChange={() => updateField("facebookEnabled", !form.facebookEnabled)}
            label="Facebook Pixel"
            description="Use Meta pixel events for paid acquisition and retargeting."
          />
          <div className="mt-4">
            <FieldShell label="Facebook Pixel ID">
              <TextInput
                value={form.facebookPixelId}
                onChange={(event) => updateField("facebookPixelId", event.target.value)}
                placeholder="eg. 516935765764356"
              />
            </FieldShell>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <PrimaryButton>Save</PrimaryButton>
      </div>
    </Panel>
  );
}

export default AnalyticsSection;
