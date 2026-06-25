import React, { useState } from "react";
import { FiClock, FiRefreshCw, FiShield, FiTool, FiZap } from "react-icons/fi";
import { showAppToast } from "../../../utils/appToast";

const LOGS = [
  { label: "Cache Purge Success", time: "2m ago", tone: "bg-emerald-500" },
  { label: "Config Exported", time: "45m ago", tone: "bg-yellow-color" },
  { label: "Backup Scheduled", time: "2h ago", tone: "bg-slate-300" },
];

function SystemGovernanceSection() {
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);

  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="rounded-[28px] border border-white/20 p-5 text-[#1A1A1A] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-inter-b text-white">
              Global Maintenance
            </h2>
            <p className="mt-2 text-sm text-[#babcc4]">
              Redirect all traffic to static maintenance page
            </p>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-color text-2xl text-yellow-color">
            <FiTool />
          </span>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-inter-b uppercase tracking-[0.18em] text-[#c9cbd4]">
            Current status: {maintenanceEnabled ? "Maintenance" : "Operational"}
          </div>
          <button
            type="button"
            aria-pressed={maintenanceEnabled}
            onClick={() => {
              const next = !maintenanceEnabled;
              setMaintenanceEnabled(next);
            
              notify(
                `Maintenance mode ${next ? "enabled" : "disabled"}.`,
                next ? "success" : "warn"
              );
            }}
            className={`relative h-8 w-16 cursor-pointer rounded-full transition ${
              maintenanceEnabled ? "bg-yellow-color" : "bg-white/10"
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full shadow transition-all duration-300 ${
                maintenanceEnabled ? "left-9 bg-white" : "left-1 bg-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="rounded-[28px] border border-yellow-color p-8 text-white shadow-sm bg-white/5">
        <FiShield className="text-3xl" />
        <div className="mt-4 text-3xl font-inter-b">99.9%</div>
        <div className="mt-1 text-xs font-inter-s uppercase tracking-[0.2em] text-white/85">
          System Health
        </div>
      </div>

      <div className="rounded-[28px] border border-white/20 p-5 text-[#dfdfdf] shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-yellow-color text-xl text-yellow-color">
            <FiZap />
          </span>
          <h2 className="text-xl font-inter-b text-[#e9e9e9]">Edge Network</h2>
        </div>
        <p className="mt-7 text-sm leading-6 text-[#a7adbb]">
          Instantly purge the global cache across all Cloudflare points of
          presence.
        </p>
        <button
          type="button"
          onClick={() => notify("Cloudflare cache flush queued.", "success")}
          className="mt-10 flex h-[56px] w-full items-center justify-center gap-2 rounded-lg bg-yellow-color px-5 text-sm font-inter-b text-white transition hover:brightness-110 cursor-pointer"
        >
          <FiZap />
          Cloudflare Cache Flush
        </button>
      </div>

      <div className="rounded-[28px] border border-white/20 p-5 text-[#e9e9e9] shadow-sm sm:p-8">
        <div className="flex items-center gap-2">
          <FiClock className="text-xl text-white" />
          <h2 className="text-xl font-inter-b text-[#ffffff]">Recent Logs</h2>
        </div>

        <div className="mt-6 grid gap-4">
          {LOGS.map((log) => (
            <div
              key={log.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/20 p-4 shadow-sm bg-white/5"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className={`h-2 w-2 shrink-0 rounded-full ${log.tone}`} />
                <span className="truncate text-sm font-inter-s text-[#dfe1e6]">
                  {log.label}
                </span>
              </div>
              <span className="shrink-0 text-[11px] text-[#6c7586]">
                {log.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="xl:col-span-2">
        <div className="relative min-h-[92px] p-7">
          <div className="absolute inset-0 border border-white/20 rounded-lg" />
          <div className="relative">
            <div className="text-xs font-inter-s uppercase tracking-[0.22em] text-white/70">
              Infrastructure
            </div>
            <div className="mt-2 flex items-center gap-2 text-xl font-inter-b text-white">
              <FiRefreshCw className="text-yellow-color" />
              Node Synchronization active
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemGovernanceSection;
