import React from "react";
import { FiEdit2, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { LANGUAGE_ROWS } from "../settingData";
import {
  FieldShell,
  Panel,
  PrimaryButton,
  SecondaryButton,
  SelectInput,
  StatusPill,
  TextInput,
} from "../SettingUI";
import { showAppToast } from "../../../utils/appToast";

function LanguagesSection({ controls, setControls }) {
  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };
  const filteredLanguages = [...LANGUAGE_ROWS]
    .filter((item) => {
      const search = controls.search.trim().toLowerCase();
      const matchesSearch =
        !search ||
        item.name.toLowerCase().includes(search) ||
        item.code.toLowerCase().includes(search);
      const matchesAction =
        controls.action === "all" ||
        (controls.action === "public" && item.status === "Public") ||
        (controls.action === "draft" && item.status === "Draft");

      return matchesSearch && matchesAction;
    })
    .sort((first, second) => {
      let comparison = 0;

      if (controls.sortBy === "name") {
        comparison = first.name.localeCompare(second.name);
      } else if (controls.sortBy === "default") {
        comparison = Number(second.isDefault) - Number(first.isDefault);
      } else {
        comparison = second.order - first.order;
      }

      return controls.direction === "asc" ? comparison : comparison * -1;
    });

  const updateControl = (field, value) => setControls((prev) => ({ ...prev, [field]: value }));

  return (
    <Panel
      title="Languages"
      description="Manage storefront languages, default locale and publishing status for each translation package."
    >
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <FieldShell label="Order by">
            <SelectInput
              value={controls.sortBy}
              onChange={(event) => updateControl("sortBy", event.target.value)}
              options={[
                { value: "recent", label: "Date" },
                { value: "name", label: "Name" },
                { value: "default", label: "Default" },
              ]}
            />
          </FieldShell>
          <FieldShell label="Sort direction">
            <SelectInput
              value={controls.direction}
              onChange={(event) => updateControl("direction", event.target.value)}
              options={[
                { value: "desc", label: "DESC" },
                { value: "asc", label: "ASC" },
              ]}
            />
          </FieldShell>
          <FieldShell label="Action">
            <SelectInput
              value={controls.action}
              onChange={(event) => updateControl("action", event.target.value)}
              options={[
                { value: "all", label: "All" },
                { value: "public", label: "Public" },
                { value: "draft", label: "Draft" },
              ]}
            />
          </FieldShell>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <FieldShell label="Search">
            <TextInput
              icon={FiSearch}
              value={controls.search}
              onChange={(event) => updateControl("search", event.target.value)}
              placeholder="Search language"
              className="sm:w-[260px]"
            />
          </FieldShell>
          <PrimaryButton className="shrink-0" onClick={() => notify("Add language flow opened.")}>
            <FiPlus />
            Add language
          </PrimaryButton>
        </div>
      </div>

      <div className="mt-3 text-sm text-white-color/45">
        Showing 1 to {filteredLanguages.length} of {LANGUAGE_ROWS.length} results
      </div>

      <div className="mt-2 overflow-hidden rounded-lg border border-white-color/10 bg-white-color/[3%]">
        <div className="overflow-x-auto max-h-[300px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-2">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-[var(--table-h)] text-sm font-inter-s text-white-color/70 sticky top-0 z-50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Direction</th>
                <th className="px-4 py-2">Default</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLanguages.map((item) => (
                <tr key={item.id} className="border-t border-white-color/8 text-sm text-white-color/80">
                  <td className="px-4 py-2 font-inter-s text-white-color underline decoration-white-color/20 underline-offset-4">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 uppercase text-white-color/60 text-xs">{item.code}</td>
                  <td className="px-4 py-2 text-xs">{item.direction}</td>
                  <td className="px-4 py-2">
                    <StatusPill tone={item.isDefault ? "success" : "danger"}>
                      {item.isDefault ? "Yes" : "No"}
                    </StatusPill>
                  </td>
                  <td className="px-4 py-2">
                    <StatusPill tone={item.status === "Public" ? "success" : "warning"}>
                      {item.status}
                    </StatusPill>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-end gap-2">
                      <SecondaryButton className="h-10 rounded-xl px-4" onClick={() => notify(`${item.name} opened for editing.`)}>
                        <FiEdit2 />
                        Edit
                      </SecondaryButton>
                      <button
                        type="button"
                        onClick={() => notify(`${item.name} deleted from the language list.`, "success")}
                        className="inline-flex h-[35px] items-center justify-center gap-2 rounded-xl border border-rose-300/20 bg-rose-400/15 px-4 text-sm font-inter-s text-rose-200 transition hover:bg-rose-400/20"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Panel>
  );
}

export default LanguagesSection;
