import React, { useState } from "react";
import { FiCode, FiExternalLink, FiGitMerge, FiInfo, FiLink, FiSave } from "react-icons/fi";
import { showAppToast } from "../../../utils/appToast";

function SeoAiSection() {
  const [robotsText, setRobotsText] = useState(
    "User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /temp/\n\nSitemap: https://nutmeals.com/sitemap.xml"
  );
  const [schema, setSchema] = useState({
    organization: "Nutmeals",
    founder: "Aman Priyadarshi",
  });

  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  const updateSchema = (field, value) => setSchema((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="rounded-[28px] border border-[#e8edf4]/20 p-5 text-[#ebebeb] shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-color text-yellow-color">
              <FiCode />
            </span>
            <h2 className="text-xl font-inter-b text-yellow-color">Robots.txt Editor</h2>
          </div>
          <span className="rounded-full bg-[#e1e0e8] px-3 py-1 text-[11px] font-inter-b uppercase text-[#5e5f6c]">
            Live draft
          </span>
        </div>

        <textarea
          value={robotsText}
          onChange={(event) => setRobotsText(event.target.value)}
          className="mt-5 min-h-[172px] w-full resize-none rounded-lg bg-[#f8f9fb1c] p-4 font-mono text-sm leading-6 text-[#cfd3e2] outline-none ring-1 ring-transparent transition focus:ring-[#101f8e]/20"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => notify("Robots.txt draft saved.", "success")}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-yellow-color px-5 text-sm font-inter-b text-white transition hover:brightness-110"
          >
            <FiSave />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
        <div className="rounded-[26px] border border-[#e8edf4]/20 p-5 text-[#1A1A1A] shadow-sm">
          <h3 className="text-lg font-inter-b text-yellow-color">Sitemap URL</h3>
          <p className="mt-2 text-sm text-[#a2a6ad]">Point search engines to your XML index.</p>
          <div className="mt-5 flex items-center gap-3 rounded-lg bg-[#f8f9fb1c] p-4 text-sm font-inter-s text-white">
            <FiLink className="shrink-0 text-yellow-color" />
            <span className="break-all">https://nutmeals.com/sitemap.xml</span>
          </div>
        </div>

        <div className="rounded-[26px] border border-yellow-color/30 p-5 text-white shadow-sm">
          <h3 className="text-lg font-inter-b">AEO Insights</h3>
          <p className="mt-2 text-sm leading-6 text-white/90">
            Your brand presence in LLM training sets is currently high. Continue optimizing schema.
          </p>
          <button
            type="button"
            onClick={() => notify("AEO insights report opened.")}
            className="mt-3 inline-flex items-center gap-2 text-sm font-inter-b"
          >
            View Report
            <FiExternalLink />
          </button>
        </div>
      </div>

      <div className="rounded-[28px] border border-[#e8edf4]/20 p-5 text-[#1A1A1A] shadow-sm xl:col-span-2 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-yellow-color text-xl text-yellow-color">
              <FiGitMerge />
            </span>
            <div>
              <h2 className="text-2xl font-inter-b text-yellow-color">Schema.org Enrichment</h2>
              <p className="mt-1 text-sm text-[#cdced3]">
                Automated founder and brand linking for generative search models.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-inter-b text-[#e5e5eb]">Organization Name (Brand)</span>
              <input
                value={schema.organization}
                onChange={(event) => updateSchema("organization", event.target.value)}
                className="h-[52px] w-full rounded-2xl border border-white-color/14 bg-white-color/[3%] px-4 text-sm text-white-color outline-none transition placeholder:text-white-color/25 focus:border-yellow-color/40 focus:bg-white-color/[6%]"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-inter-b text-[#dedfe6]">Official Founder Name</span>
              <input
                value={schema.founder}
                onChange={(event) => updateSchema("founder", event.target.value)}
                className="h-[52px] w-full rounded-2xl border border-white-color/14 bg-white-color/[3%] px-4 text-sm text-white-color outline-none transition placeholder:text-white-color/25 focus:border-yellow-color/40 focus:bg-white-color/[6%]"
              />
            </label>
          </div>

          <div className="rounded-2xl border border-white/20 p-5 shadow-sm">
            <div className="flex gap-4">
              <FiInfo className="mt-1 shrink-0 text-xl text-yellow-color" />
              <div>
                <div className="text-sm font-inter-b text-yellow-color">GEO (Generative Engine Optimization)</div>
                <p className="mt-3 text-sm leading-6 text-[#adb1bb]">
                  These fields automatically populate your sameAs and knowsAbout schema properties, which AI models use
                  to verify entity authority.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:ml-auto lg:max-w-[400px]">
          <button
            type="button"
            onClick={() => notify("Schema changes discarded.", "warn")}
            className="h-11 rounded-lg border border-yellow-color text-sm font-inter-b text-yellow-color transition hover:bg-yellow-color hover:text-white"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={() => notify("Schema enrichment synced.", "success")}
            className="h-11 rounded-lg bg-yellow-color text-sm font-inter-b text-white shadow-side-bar transition hover:brightness-110 cursor-pointer"
          >
            Sync Schema
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeoAiSection;
