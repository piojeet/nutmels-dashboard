import React from "react";
import { FieldShell, Panel, PrimaryButton, SelectInput, TextInput } from "../SettingUI";

function SmtpSection({ form, setForm }) {
  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Panel
      title="SMTP setting"
      description="Configure the outgoing mail server used for order notifications, password reset and transactional mail."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FieldShell label="SMTP host" className="md:col-span-2">
          <TextInput
            value={form.host}
            onChange={(event) => updateField("host", event.target.value)}
            placeholder="smtp.gmail.com"
          />
        </FieldShell>
        <FieldShell label="SMTP port">
          <TextInput
            value={form.port}
            onChange={(event) => updateField("port", event.target.value)}
            placeholder="465"
          />
        </FieldShell>
        <FieldShell label="SMTP encryption">
          <SelectInput
            value={form.encryption}
            onChange={(event) => updateField("encryption", event.target.value)}
            options={["SSL", "TLS", "None"]}
          />
        </FieldShell>
        <FieldShell label="SMTP username" className="md:col-span-2">
          <TextInput
            value={form.username}
            onChange={(event) => updateField("username", event.target.value)}
            placeholder="SMTP username"
          />
        </FieldShell>
        <FieldShell label="SMTP password" className="md:col-span-2">
          <TextInput
            type="password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            placeholder="SMTP password"
          />
        </FieldShell>
        <FieldShell label="Mail from" className="md:col-span-2">
          <TextInput
            value={form.from}
            onChange={(event) => updateField("from", event.target.value)}
            placeholder="noreply@store.com"
          />
        </FieldShell>
      </div>

      <div className="mt-6">
        <PrimaryButton>Submit</PrimaryButton>
      </div>
    </Panel>
  );
}

export default SmtpSection;
