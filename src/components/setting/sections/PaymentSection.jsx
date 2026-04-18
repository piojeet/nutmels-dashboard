import React from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { FieldShell, Panel, PrimaryButton, SelectInput, TextInput } from "../SettingUI";
import { showAppToast } from "../../../utils/appToast";

function PaymentSection({ settings, setSettings }) {
  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  const updateMethod = (methodId, field, value) => {
    setSettings((prev) => ({
      ...prev,
      methods: prev.methods.map((method) =>
        method.id === methodId ? { ...method, [field]: value } : method
      ),
    }));
  };

  return (
    <Panel
      title="Payment"
      description="Configure available gateways, default checkout method and basic credential placeholders."
    >
      <div className="mb-5 max-w-sm">
        <FieldShell label="Default">
          <SelectInput
            value={settings.defaultMethod}
            onChange={(event) => {
              setSettings((prev) => ({ ...prev, defaultMethod: event.target.value }));
            }}
            options={settings.methods.map((item) => item.name)}
          />
        </FieldShell>
      </div>

      <div className="space-y-3">
        {settings.methods.map((method) => (
          <div
            key={method.id}
            className="overflow-hidden rounded-[24px] border border-white-color/12 bg-white-color/[3%]"
          >
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
              <button
                type="button"
                onClick={() => {
                  updateMethod(method.id, "enabled", !method.enabled);
                }}
                className="flex items-center gap-3 text-left"
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg border transition ${
                    method.enabled
                      ? "border-yellow-color bg-yellow-color text-black-color"
                      : "border-white-color/20 bg-white-color/[4%] text-transparent"
                  }`}
                >
                  <FiCheck />
                </span>
                <span>
                  <span className="block text-lg font-inter-s text-white-color">{method.name}</span>
                  <span className="block text-sm text-white-color/45">{method.summary}</span>
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  updateMethod(method.id, "expanded", !method.expanded);
                }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white-color/12 bg-white-color/[4%] text-white-color/60 transition hover:border-white-color/25 hover:text-white-color"
              >
                <FiChevronDown className={`transition ${method.expanded ? "rotate-180" : ""}`} />
              </button>
            </div>

            {method.expanded ? (
              <div className="border-t border-white-color/10 p-4">
                {method.fields.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-white-color/15 bg-white-color/[2%] p-4 text-sm text-white-color/45">
                    This method does not need API credentials. It stays visible as a simple manual payment
                    option in checkout.
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {method.fields.map((field) => (
                      <FieldShell key={field.key} label={field.label}>
                        <TextInput
                          value={field.value}
                          onChange={(event) =>
                            setSettings((prev) => ({
                              ...prev,
                              methods: prev.methods.map((entry) =>
                                entry.id === method.id
                                  ? {
                                      ...entry,
                                      fields: entry.fields.map((item) =>
                                        item.key === field.key
                                          ? { ...item, value: event.target.value }
                                          : item
                                      ),
                                    }
                                  : entry
                              ),
                            }))
                          }
                          placeholder={field.label}
                        />
                      </FieldShell>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <PrimaryButton onClick={() => notify("Payment settings saved.", "success")}>Submit</PrimaryButton>
      </div>
    </Panel>
  );
}

export default PaymentSection;
