import React from "react";
import { FiCheck, FiRefreshCw } from "react-icons/fi";
import { Panel, PrimaryButton, SecondaryButton } from "../SettingUI";
import { showAppToast } from "../../../utils/appToast";

function CacheSection({ targets, setTargets }) {
  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  const toggleTarget = (targetId) => {
    setTargets((prev) =>
      prev.map((item) => (item.id === targetId ? { ...item, selected: !item.selected } : item))
    );
  };

  return (
    <Panel
      title="Clear cache"
      description="Choose which generated data should be refreshed. Only the useful cache actions are kept here."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {targets.map((target) => {
          const Icon = target.icon;

          return (
            <button
              key={target.id}
              type="button"
              onClick={() => toggleTarget(target.id)}
              className={`rounded-[26px] border p-5 text-left transition ${
                target.selected
                  ? "border-yellow-color/30 bg-yellow-color/10"
                  : "border-white-color/12 bg-white-color/[3%] hover:border-white-color/20"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                    target.selected
                      ? "bg-yellow-color text-black-color"
                      : "bg-white-color/[6%] text-white-color/60"
                  }`}
                >
                  <Icon />
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-lg border text-sm ${
                    target.selected
                      ? "border-yellow-color bg-yellow-color text-black-color"
                      : "border-white-color/20 bg-white-color/[4%] text-transparent"
                  }`}
                >
                  <FiCheck />
                </span>
              </div>
              <div className="mt-5 text-lg font-inter-s text-white-color">{target.title}</div>
              <div className="mt-2 text-sm leading-6 text-white-color/45">{target.description}</div>
              <div className="mt-4 text-xs uppercase tracking-[0.18em] text-white-color/35">
                Last cleared: {target.lastCleared}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <PrimaryButton onClick={() => notify("Selected cache targets cleared.", "success")}>
          <FiRefreshCw />
          Clear selected cache
        </PrimaryButton>
        <SecondaryButton
          className="cursor-pointer"
          onClick={() => {
            setTargets((prev) => prev.map((item) => ({ ...item, selected: false })));
          }}
        >
          Reset selection
        </SecondaryButton>
      </div>
    </Panel>
  );
}

export default CacheSection;
