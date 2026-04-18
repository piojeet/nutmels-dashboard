import React from "react";
import { FiCheck } from "react-icons/fi";
import { FieldShell, Panel, PrimaryButton, TextInput } from "../SettingUI";
import { showAppToast } from "../../../utils/appToast";

function SocialSection({ form, setForm }) {
  const providers = [
    {
      key: "google",
      label: "Google login",
      enabled: form.googleEnabled,
      clientId: form.googleClientId,
      clientSecret: form.googleClientSecret,
    },
    {
      key: "facebook",
      label: "Facebook login",
      enabled: form.facebookEnabled,
      clientId: form.facebookClientId,
      clientSecret: form.facebookClientSecret,
    },
  ];

  const updateValue = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));
  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  return (
    <Panel
      title="Social login"
      description="Let users sign in with social providers. This page is a frontend-only preview of the configuration layout."
    >
      <div className="grid gap-4 xl:grid-cols-2">
        {providers.map((provider) => (
          <div
            key={provider.key}
            className="rounded-[24px] border border-white-color/12 bg-white-color/[3%] p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-inter-s text-white-color">{provider.label}</div>
                <div className="mt-1 text-sm text-white-color/45">
                  Control OAuth credentials and provider visibility.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  updateValue(`${provider.key}Enabled`, !provider.enabled);
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg transition ${
                  provider.enabled
                    ? "border-yellow-color bg-yellow-color text-black-color"
                    : "border-white-color/14 bg-white-color/[4%] text-white-color/35"
                }`}
              >
                <FiCheck />
              </button>
            </div>

            <div className="mt-5 grid gap-4">
              <FieldShell label={`${provider.label} client ID`}>
                <TextInput
                  value={provider.clientId}
                  onChange={(event) => updateValue(`${provider.key}ClientId`, event.target.value)}
                  placeholder={`Enter ${provider.label} client ID`}
                />
              </FieldShell>
              <FieldShell label={`${provider.label} client secret`}>
                <TextInput
                  value={provider.clientSecret}
                  onChange={(event) => updateValue(`${provider.key}ClientSecret`, event.target.value)}
                  placeholder={`Enter ${provider.label} client secret`}
                />
              </FieldShell>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={() => notify("Social login settings saved.", "success")}>Submit</PrimaryButton>
      </div>
    </Panel>
  );
}

export default SocialSection;
