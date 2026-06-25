import React, { useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiRefreshCw,
  FiShield,
  FiSliders,
  FiTruck,
} from "react-icons/fi";
import { showAppToast } from "../../../utils/appToast";

const PARTNERS = {
  amazon: {
    label: "Amazon",
    name: "Amazon SP-FCI API",
    status: "Authorized",
    latency: "0.4ms",
    lastSync: "Oct 24, 2023 • 14:22 PM",
    region: "IN Fulfillment",
  },
  delhivery: {
    label: "Delhivery",
    name: "Delhivery One API",
    status: "Ready",
    latency: "0.8ms",
    lastSync: "Today • 10:18 AM",
    region: "Metro Express",
  },
  indiaPost: {
    label: "India Post",
    name: "India Post eCommerce",
    status: "Sandbox",
    latency: "1.2ms",
    lastSync: "Yesterday • 18:05 PM",
    region: "National Postal",
  },
};

function LogisticsPartnersSection() {
  const [activePartner, setActivePartner] = useState("amazon");
  const partner = PARTNERS[activePartner];

  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  const partnerButtons = useMemo(() => Object.entries(PARTNERS), []);

  const activeIndex = partnerButtons.findIndex(([id]) => id === activePartner);

  return (
    <div className="mx-auto">
      <div className="rounded-[30px] p-5 text-[#1A1A1A] shadow-side-bar sm:p-8">
        <p className="text-sm font-inter-r text-[#8798ad]">
          Manage global shipping APIs.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-1 rounded-lg border border-white-color/10 bg-white-color/[5%] p-1 relative">
          <div
            className="absolute inset-y-1 rounded-md bg-yellow-color transition-all duration-300"
            style={{
              width: "calc(33.333% - 8px)",
              left: `calc(${activeIndex * 33.333}% + 4px)`,
            }}
          />
          {partnerButtons.map(([id, item]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActivePartner(id)}
              className={`h-10 rounded-md px-2 text-[11px] font-inter-b uppercase tracking-[0.08em] transition relative z-10 ${
                activePartner === id
                  ? "text-white shadow-sm"
                  : "text-[#8fa0b8] hover:text-yellow-color"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-9 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-color text-xl text-yellow-color">
              <FiTruck />
            </span>
            <div>
              <h2 className="text-lg font-inter-b text-white">
                {partner.name}
              </h2>
              <div className="mt-1 flex items-center gap-2 text-[11px] font-inter-b uppercase text-yellow-color">
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-color" />
                Active connection
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              notify(`${partner.label} routing preferences opened.`)
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#8ca0b8] transition hover:bg-[#f1f4f8] hover:text-[#14255c]"
            aria-label="Open logistics routing preferences"
          >
            <FiSliders />
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#e8edf4]/20 p-4">
            <div className="text-[11px] font-inter-b uppercase tracking-[0.16em] text-[#bdbdbd]">
              Status
            </div>
            <div className="mt-2 flex items-center gap-2 font-inter-b text-white">
              {partner.status}
              <FiCheckCircle className="text-[#24c16b]" />
            </div>
          </div>

          <div className="rounded-2xl border border-[#e8edf4]/20 p-4">
            <div className="text-[11px] font-inter-b uppercase tracking-[0.16em] text-[#bdbdbd]">
              Latency
            </div>
            <div className="mt-2 font-inter-b text-white">
              {partner.latency}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl border border-[#e8edf4]/20 p-4 shadow-sm">
          <div>
            <div className="text-[11px] font-inter-b uppercase tracking-[0.16em] text-[#bdbdbd]">
              Last connection sync
            </div>
            <div className="mt-2 text-sm font-inter-s text-white">
              {partner.lastSync}
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              notify(`${partner.label} sync refreshed.`, "success")
            }
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f9fc] text-yellow-color transition hover:bg-yellow-color hover:text-black-color"
            aria-label="Refresh logistics sync"
          >
            <FiRefreshCw />
          </button>
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-lg border border-dashed border-[#d7e0ea] px-4 py-3 text-[11px] font-inter-s uppercase tracking-[0.08em] text-[#7f91a8]">
          <FiShield className="text-base" />
          Secure 256-bit AES encryption enabled
        </div>

        <button
          type="button"
          onClick={() =>
            notify(`${partner.label} logistics settings submitted.`, "success")
          }
          className="mt-9 flex h-[52px] w-full items-center justify-center rounded-lg bg-yellow-color px-5 text-sm font-inter-b text-black-color shadow-side-bar transition hover:brightness-105"
        >
          Submit Changes
        </button>
      </div>
    </div>
  );
}

export default LogisticsPartnersSection;
