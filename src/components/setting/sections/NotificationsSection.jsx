import React, { useState } from "react";
import { FiBell, FiBox, FiBriefcase, FiCheckCircle, FiEdit2, FiPlus, FiShield, FiTruck } from "react-icons/fi";
import { showAppToast } from "../../../utils/appToast";

const TEMPLATES = [
  { name: "Order_Confirmation_v2", type: "Transactional", icon: FiBell },
  { name: "Shipping_Update_Dynamic", type: "Marketing", icon: FiTruck },
];

const INITIAL_TRIGGERS = [
  {
    id: "newOrder",
    label: "New Order Placed",
    description: "Send confirmation immediately after payment.",
    icon: FiBriefcase,
    enabled: true,
  },
  {
    id: "delivery",
    label: "Out for Delivery",
    description: "Notify when the courier starts the route.",
    icon: FiBox,
    enabled: true,
  },
  {
    id: "returns",
    label: "Return Requests",
    description: "Updates regarding customer returns and refunds.",
    icon: FiBell,
    enabled: false,
  },
];

function NotificationsSection() {
  const [triggers, setTriggers] = useState(INITIAL_TRIGGERS);

  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  const toggleTrigger = (triggerId) => {
    setTriggers((prev) =>
      prev.map((trigger) =>
        trigger.id === triggerId ? { ...trigger, enabled: !trigger.enabled } : trigger
      )
    );
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="xl:col-span-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded border border-emerald-400 text-emerald-400">
                <FiBell className="text-sm" />
              </span>
              <h2 className="text-2xl font-inter-b text-white-color">WhatsApp Business API</h2>
            </div>
            <p className="mt-2 text-sm text-white-color/70">
              Manage Meta Cloud credentials and messaging templates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => notify("Meta Cloud API connection started.")}
            className="h-11 rounded-xl bg-yellow-color px-6 text-sm font-inter-b text-white shadow-side-bar transition hover:brightness-110 cursor-pointer"
          >
            Connect API
          </button>
        </div>
      </div>

      <div className="rounded-[24px] border border-white/20 p-5 text-[#1A1A1A] shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-inter-b text-[#ffffff]">Active Templates</h3>
          <span className="rounded-full bg-[#e0e5ff] px-3 py-1 text-[11px] font-inter-b uppercase tracking-[0.08em] text-[#3735d5]">
            4 syncing
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;

            return (
              <div key={template.name} className="flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-white/5 p-3">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-yellow-color text-yellow-color">
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-inter-b text-[#bbbecc]">{template.name}</div>
                    <div className="text-xs text-[#9a9da5]">{template.type} • Approved</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => notify(`${template.name} opened for editing.`)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#aaacb9] hover:bg-white"
                  aria-label={`Edit ${template.name}`}
                >
                  <FiEdit2 />
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => notify("New WhatsApp template flow opened.")}
          className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#bfc4dc] text-sm font-inter-s text-[#c3c5ce] transition hover:border-yellow-color hover:text-yellow-color cursor-pointer"
        >
          <FiPlus />
          Create New Template
        </button>
      </div>

      <div className="rounded-[24px] bg-white/5 p-5 text-white shadow-sm border border-white/20">
        <div className="flex items-center gap-3">
          <FiShield className="text-2xl text-[#c8d2ff]" />
          <h3 className="text-xl font-inter-b">Meta Cloud Configuration</h3>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#c7d0ff]">
          System-wide authentication for WhatsApp Business templates is verified.
        </p>
        <div className="mt-8 grid gap-4 font-mono text-xs">
          <div className="flex justify-between gap-4 border-b border-white/15 pb-3">
            <span className="text-white/60">WABA ID</span>
            <span>9281...4402</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-white/60">Phone ID</span>
            <span>1023...9921</span>
          </div>
        </div>
      </div>

      <div className="xl:col-span-2">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center">
          <h3 className="text-xl font-inter-b text-yellow-color">Order Notifications</h3>
          <p className="text-sm text-white-color/75">Configure automated triggers for customer lifecycle events.</p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-white/20 p-3 text-[#ffffff] shadow-sm">
          {triggers.map((trigger) => {
            const Icon = trigger.icon;

            return (
              <div
                key={trigger.id}
                className="flex items-center justify-between gap-4 border-b border-white/20 px-3 py-3 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-color text-xl text-yellow-color">
                    <Icon />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate font-inter-b text-[#ced0db]">{trigger.label}</div>
                    <div className="text-sm text-[#a2a6b1]">{trigger.description}</div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-pressed={trigger.enabled}
                  onClick={() => toggleTrigger(trigger.id)}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition cursor-pointer ${
                    trigger.enabled ? "bg-yellow-color" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-5 w-5 rounded-full shadow transition ${
                      trigger.enabled ? "left-6 bg-black" : "left-1 bg-white"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-[28px] p-6 text-[#ffffff] shadow-sm border border-white/20">
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-inter-b uppercase text-emerald-700">
          Healthy
        </span>
        <div className="mt-4 flex items-end gap-3">
          <div>
            <div className="text-3xl font-inter-b text-yellow-color">99.8%</div>
            <div className="mt-1 text-sm font-inter-s text-[#8b91a0]">Delivery Success Rate</div>
          </div>
          <FiCheckCircle className="ml-auto text-5xl text-[#edf0ff]" />
        </div>
      </div>

      <div className="rounded-[28px] border border-white/20 p-6 text-[#ffffff] shadow-sm">
        <h3 className="text-lg font-inter-b text-[#ffffff]">System Alerts</h3>
        <div className="mt-5 flex gap-3 text-sm leading-6 text-[#979ba7]">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-600" />
          <span>2 templates currently pending manual review by Meta Policy Team.</span>
        </div>
      </div>
    </div>
  );
}

export default NotificationsSection;
