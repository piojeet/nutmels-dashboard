import React from "react";
import { FiGlobe } from "react-icons/fi";
import { FieldShell, Panel, PrimaryButton, SelectInput, TextInput } from "../SettingUI";

function MediaSection({ form, setForm }) {
  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Panel
      title="Media storage"
      description="Preview storage driver, CDN pathing and bucket details used for product media."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <FieldShell label="Media storage" className="md:col-span-2">
          <SelectInput
            value={form.storage}
            onChange={(event) => updateField("storage", event.target.value)}
            options={["Google cloud storage", "Amazon S3", "Local storage"]}
          />
        </FieldShell>
        <FieldShell label="Thumb prefix" className="md:col-span-2">
          <TextInput
            value={form.thumbPrefix}
            onChange={(event) => updateField("thumbPrefix", event.target.value)}
            placeholder="thumb-"
          />
        </FieldShell>
        <FieldShell label="Default image" className="md:col-span-2">
          <TextInput
            value={form.defaultImage}
            onChange={(event) => updateField("defaultImage", event.target.value)}
            placeholder="default-image.webp"
          />
        </FieldShell>
        <FieldShell label="CDN URL" className="md:col-span-2">
          <TextInput
            icon={FiGlobe}
            value={form.cdnUrl}
            onChange={(event) => updateField("cdnUrl", event.target.value)}
            placeholder="https://cdn.store.com/"
          />
        </FieldShell>
        <FieldShell label="Google cloud project ID" className="md:col-span-2">
          <TextInput
            value={form.projectId}
            onChange={(event) => updateField("projectId", event.target.value)}
            placeholder="project-id"
          />
        </FieldShell>
        <FieldShell label="Google cloud storage bucket" className="md:col-span-2">
          <TextInput
            value={form.bucket}
            onChange={(event) => updateField("bucket", event.target.value)}
            placeholder="bucket-name"
          />
        </FieldShell>
        <FieldShell label="Google cloud storage path prefix" className="md:col-span-2">
          <TextInput
            value={form.pathPrefix}
            onChange={(event) => updateField("pathPrefix", event.target.value)}
            placeholder="media/uploads/"
          />
        </FieldShell>
      </div>

      <div className="mt-6">
        <PrimaryButton>Update storage</PrimaryButton>
      </div>
    </Panel>
  );
}

export default MediaSection;
