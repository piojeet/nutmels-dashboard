import React from "react";
import { FiCheckCircle, FiPlus, FiTrash2 } from "react-icons/fi";
import { LuPlugZap } from "react-icons/lu";
import { Panel, PrimaryButton, SecondaryButton, StatusPill } from "../SettingUI";

function PluginsSection({ plugins, selectedPlugin, setSelectedPlugin }) {
  const selectedEntry = plugins.find((plugin) => plugin.id === selectedPlugin);

  return (
    <Panel
      title="Plugins"
      description="Installed add-ons appear here as frontend cards so the layout mirrors the reference screen."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plugins.map((plugin) => (
          <button
            key={plugin.id}
            type="button"
            onClick={() => setSelectedPlugin(plugin.id)}
            className={`rounded-[28px] border p-6 text-left transition ${
              selectedPlugin === plugin.id
                ? "border-emerald-300/25 bg-emerald-400/15"
                : "border-white-color/12 bg-white-color/[3%] hover:border-white-color/20"
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                  selectedPlugin === plugin.id
                    ? "bg-emerald-500/40 text-emerald-100"
                    : "bg-white-color/[6%] text-white-color/60"
                }`}
              >
                {plugin.active ? <FiCheckCircle /> : <LuPlugZap />}
              </span>
              <StatusPill tone={plugin.active ? "success" : "default"}>
                {plugin.active ? "Active" : "Installed"}
              </StatusPill>
            </div>
            <div className="mt-5 text-xl font-inter-s text-white-color">{plugin.name}</div>
            <div className="mt-2 text-sm leading-6 text-white-color/45">{plugin.description}</div>
          </button>
        ))}

        <button
          type="button"
          className="flex min-h-[240px] flex-col items-center justify-center rounded-[28px] border border-dashed border-white-color/14 bg-white-color/[2%] p-6 text-center transition hover:border-yellow-color/35 hover:bg-white-color/[4%]"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white-color/15 bg-white-color/[5%] text-3xl text-white-color/60">
            <FiPlus />
          </span>
          <div className="mt-4 text-xl font-inter-s text-white-color">Add plugin</div>
          <div className="mt-2 text-sm leading-6 text-white-color/45">
            Browse more integrations and enable new modules for this admin panel.
          </div>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <SecondaryButton>
          <FiTrash2 />
          Delete {selectedEntry?.name || "plugin"}
        </SecondaryButton>
        <PrimaryButton>
          <FiPlus />
          Add plugin
        </PrimaryButton>
      </div>
    </Panel>
  );
}

export default PluginsSection;
