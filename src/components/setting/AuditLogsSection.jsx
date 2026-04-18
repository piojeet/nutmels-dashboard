import React, { useMemo, useState } from "react";
import {
  FiAlertTriangle,
  FiArchive,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiDownload,
  FiShield,
  FiUsers,
} from "react-icons/fi";
import { showAppToast } from "../../utils/appToast";

const REALTIME_ROWS = [
  {
    id: "log-1",
    timestamp: "Oct 24, 2023",
    utc: "14:22:10 UTC",
    initials: "JD",
    adminId: "admin_jane_doe",
    module: "SEO & AI",
    action: "Parameter update",
    oldValue: "temp: 0.7",
    newValue: "temp: 0.85",
  },
  {
    id: "log-2",
    timestamp: "Oct 24, 2023",
    utc: "13:58:44 UTC",
    initials: "MK",
    adminId: "sys_master_k",
    module: "Governance",
    action: "Policy Override",
    oldValue: "AUTH_LEVEL: 2",
    newValue: "AUTH_LEVEL: 4",
  },
  {
    id: "log-3",
    timestamp: "Oct 24, 2023",
    utc: "12:05:12 UTC",
    initials: "LB",
    adminId: "leo_blanch",
    module: "SEO & AI",
    action: "Keywords Flush",
    oldValue: "list: cached",
    newValue: "list: empty",
  },
  {
    id: "log-4",
    timestamp: "Oct 24, 2023",
    utc: "11:42:30 UTC",
    initials: "SA",
    adminId: "system_auto",
    module: "Governance",
    action: "Key Rotation",
    oldValue: "sha256:v1",
    newValue: "sha256:v2",
  },
  {
    id: "log-5",
    timestamp: "Oct 24, 2023",
    utc: "09:15:00 UTC",
    initials: "JD",
    adminId: "admin_jane_doe",
    module: "SEO & AI",
    action: "Model upgrade",
    oldValue: "v4.2-stable",
    newValue: "v5.0-edge",
  },
  {
    id: "log-6",
    timestamp: "Oct 24, 2023",
    utc: "08:36:19 UTC",
    initials: "AR",
    adminId: "audit_runner",
    module: "Infrastructure",
    action: "Cache purge",
    oldValue: "cache: warm",
    newValue: "cache: purged",
  },
  {
    id: "log-7",
    timestamp: "Oct 24, 2023",
    utc: "07:18:43 UTC",
    initials: "JD",
    adminId: "admin_jane_doe",
    module: "SEO & AI",
    action: "Entity sync",
    oldValue: "status: queued",
    newValue: "status: synced",
  },
  {
    id: "log-8",
    timestamp: "Oct 24, 2023",
    utc: "06:11:52 UTC",
    initials: "MK",
    adminId: "sys_master_k",
    module: "Governance",
    action: "Access policy",
    oldValue: "policy:v8",
    newValue: "policy:v9",
  },
  {
    id: "log-9",
    timestamp: "Oct 24, 2023",
    utc: "05:44:16 UTC",
    initials: "LB",
    adminId: "leo_blanch",
    module: "SEO & AI",
    action: "Prompt tuning",
    oldValue: "boost: medium",
    newValue: "boost: high",
  },
  {
    id: "log-10",
    timestamp: "Oct 24, 2023",
    utc: "04:12:08 UTC",
    initials: "SA",
    adminId: "system_auto",
    module: "Infrastructure",
    action: "Health probe",
    oldValue: "status: stale",
    newValue: "status: recovered",
  },
];

const HISTORICAL_ROWS = [
  {
    id: "archive-1",
    timestamp: "Oct 17, 2023",
    utc: "15:04:18 UTC",
    initials: "RM",
    adminId: "risk_manager",
    module: "Governance",
    action: "Retention rule update",
    oldValue: "90 days",
    newValue: "120 days",
  },
  {
    id: "archive-2",
    timestamp: "Oct 15, 2023",
    utc: "10:10:42 UTC",
    initials: "JD",
    adminId: "admin_jane_doe",
    module: "SEO & AI",
    action: "Schema refresh",
    oldValue: "v2.1",
    newValue: "v2.2",
  },
  {
    id: "archive-3",
    timestamp: "Oct 11, 2023",
    utc: "08:14:26 UTC",
    initials: "MK",
    adminId: "sys_master_k",
    module: "Governance",
    action: "Access grant",
    oldValue: "read-only",
    newValue: "editor",
  },
  {
    id: "archive-4",
    timestamp: "Oct 08, 2023",
    utc: "19:32:59 UTC",
    initials: "LB",
    adminId: "leo_blanch",
    module: "SEO & AI",
    action: "Keyword import",
    oldValue: "213 items",
    newValue: "466 items",
  },
  {
    id: "archive-5",
    timestamp: "Oct 03, 2023",
    utc: "07:45:13 UTC",
    initials: "SA",
    adminId: "system_auto",
    module: "Infrastructure",
    action: "Token rotation",
    oldValue: "key:v3",
    newValue: "key:v4",
  },
  {
    id: "archive-6",
    timestamp: "Sep 29, 2023",
    utc: "18:02:41 UTC",
    initials: "RM",
    adminId: "risk_manager",
    module: "Governance",
    action: "Retention export",
    oldValue: "batch: pending",
    newValue: "batch: archived",
  },
  {
    id: "archive-7",
    timestamp: "Sep 24, 2023",
    utc: "16:47:15 UTC",
    initials: "JD",
    adminId: "admin_jane_doe",
    module: "SEO & AI",
    action: "Keyword regroup",
    oldValue: "clusters: 14",
    newValue: "clusters: 18",
  },
  {
    id: "archive-8",
    timestamp: "Sep 18, 2023",
    utc: "12:21:37 UTC",
    initials: "LB",
    adminId: "leo_blanch",
    module: "Infrastructure",
    action: "Storage rotation",
    oldValue: "bucket:v2",
    newValue: "bucket:v3",
  },
  {
    id: "archive-9",
    timestamp: "Sep 10, 2023",
    utc: "09:18:22 UTC",
    initials: "MK",
    adminId: "sys_master_k",
    module: "Governance",
    action: "User permission",
    oldValue: "reviewer",
    newValue: "editor",
  },
  {
    id: "archive-10",
    timestamp: "Sep 03, 2023",
    utc: "07:03:14 UTC",
    initials: "SA",
    adminId: "system_auto",
    module: "SEO & AI",
    action: "Index flush",
    oldValue: "state: cached",
    newValue: "state: rebuilt",
  },
];

const PAGE_SIZE = 5;
const TOTAL_EVENT_COUNTS = {
  "real-time": 1402,
  historical: 12824,
};

function exportRowsToCsv(rows) {
  const csvRows = [
    ["Timestamp", "UTC", "Admin", "Module", "Action", "Old value", "New value"],
    ...rows.map((row) => [
      row.timestamp,
      row.utc,
      row.adminId,
      row.module,
      row.action,
      row.oldValue,
      row.newValue,
    ]),
  ];

  const csvString = csvRows
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "audit-logs.csv";
  link.click();
  window.URL.revokeObjectURL(url);
}

function MetricCard({ icon, title, value, badge, badgeClass, hint, iconClass = "" }) {
  return (
    <div className="rounded-[26px] border border-white-color/12 bg-white-color/[4%] p-5 shadow-side-bar backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white-color/10 bg-white-color/[5%] text-xl ${iconClass}`}>
          {React.createElement(icon)}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-inter-s ${badgeClass}`}>{badge}</span>
      </div>

      <div className="mt-5 text-[11px] font-inter-s uppercase tracking-[0.18em] text-white-color/45">
        {title}
      </div>
      <div className="mt-2 text-[44px] font-inter-b leading-none text-white-color">{value}</div>
      <div className="mt-3 text-sm text-white-color/45">{hint}</div>
    </div>
  );
}

function getModuleTone(module) {
  if (module === "Governance") {
    return "bg-[#dbd4ff] text-[#5347b5]";
  }

  if (module === "Infrastructure") {
    return "bg-[#d7ebff] text-[#2c6d98]";
  }

  return "bg-[#e1defb] text-[#5d58ad]";
}

function getValueTone(value) {
  if (value.includes("AUTH_LEVEL") || value.includes("temp:")) {
    return "bg-[#ffd7d3] text-[#c45841]";
  }

  if (value.includes("v5.0") || value.includes("120 days")) {
    return "bg-[#ffe3cf] text-[#bc6a32]";
  }

  if (value.includes("empty") || value.includes("editor")) {
    return "bg-[#d8f6e9] text-[#23885f]";
  }

  return "bg-white-color/[7%] text-white-color/72";
}

function AuditLogsSection() {
  const [mode, setMode] = useState("real-time");
  const [currentPage, setCurrentPage] = useState(1);

  const rows = useMemo(() => (mode === "real-time" ? REALTIME_ROWS : HISTORICAL_ROWS), [mode]);
  const totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const visibleRows = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return rows.slice(startIndex, startIndex + PAGE_SIZE);
  }, [currentPage, rows]);
  const summaryCards = useMemo(
    () =>
      mode === "real-time"
        ? [
            {
              title: "Total events (24H)",
              value: "1,402",
              badge: "+12.4%",
              badgeClass: "bg-[#ffe1d4] text-[#b66039]",
              hint: "Detected across security, SEO and admin workflows.",
              icon: FiClock,
              iconClass: "text-yellow-color",
            },
            {
              title: "Active admins",
              value: "14",
              badge: "Stable",
              badgeClass: "bg-[#e3def8] text-[#615a97]",
              hint: "Accounts triggered at least one tracked action today.",
              icon: FiUsers,
              iconClass: "text-[#a6a1ff]",
            },
            {
              title: "Critical updates",
              value: "28",
              badge: "High Risk",
              badgeClass: "bg-[#ffd8d8] text-[#cf4545]",
              hint: "Priority actions flagged for governance review.",
              icon: FiAlertTriangle,
              iconClass: "text-[#ff8b75]",
            },
          ]
        : [
            {
              title: "Archive events",
              value: "12,824",
              badge: "30 days",
              badgeClass: "bg-[#e3def8] text-[#615a97]",
              hint: "Historical records ready for compliance and recovery.",
              icon: FiArchive,
              iconClass: "text-[#a6a1ff]",
            },
            {
              title: "Archived admins",
              value: "23",
              badge: "Tracked",
              badgeClass: "bg-[#d8ecff] text-[#3c6d97]",
              hint: "Distinct admin identities found in the archive window.",
              icon: FiUsers,
              iconClass: "text-[#79b7ff]",
            },
            {
              title: "Critical updates",
              value: "116",
              badge: "Reviewed",
              badgeClass: "bg-[#d8f6e9] text-[#24855d]",
              hint: "Previously escalated actions already verified.",
              icon: FiShield,
              iconClass: "text-green-color",
            },
          ],
    [mode]
  );

  const metaText =
    `Showing ${(currentPage - 1) * PAGE_SIZE + 1}-${Math.min(currentPage * PAGE_SIZE, TOTAL_EVENT_COUNTS[mode])} of ${TOTAL_EVENT_COUNTS[mode].toLocaleString()} events detected ${mode === "real-time" ? "in last 24h" : "in archive window"}`;

  const handleGenerateCsv = () => {
    exportRowsToCsv(rows);
    showAppToast({
      severity: "success",
      summary: "Audit Logs",
      detail: "Audit log CSV generated successfully.",
    });
  };

  const handleArchive = () => {
    showAppToast({
      severity: "info",
      summary: "Audit Logs",
      detail: "Archive export queued.",
    });
  };

  return (
    <section className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[repeat(3,minmax(0,1fr))_280px]">
        {summaryCards.map((card) => (
          <MetricCard key={card.title} {...card} />
        ))}

        <div className="relative overflow-hidden rounded-[26px] border border-white-color/12 bg-[linear-gradient(180deg,rgba(40,52,147,0.92),rgba(20,26,74,0.96))] p-5 text-white shadow-[0_26px_70px_rgba(10,8,24,0.3)]">
          <div className="absolute right-[-36px] top-[-36px] h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10">
            <div className="text-[11px] font-inter-s uppercase tracking-[0.18em] text-white/70">System Health</div>
            <div className="mt-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-xl text-yellow-color">
                <FiShield />
              </span>
              <div>
                <div className="text-lg font-inter-b">Export Full Audit</div>
                <div className="text-sm text-white/62">Archive and compliance ready snapshot</div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleArchive}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-left text-sm font-inter-s transition hover:bg-white/14"
              >
                Archive
                <FiArchive />
              </button>

              <button
                type="button"
                onClick={handleGenerateCsv}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white/16 px-4 py-3 text-sm font-inter-b transition hover:bg-white/22"
              >
                Generate CSV
                <FiDownload />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-white-color/12 bg-white-color/[4%] shadow-side-bar backdrop-blur-xl">
        <div className="flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-7">
          <div>
            <div className="text-[30px] font-inter-b text-white-color">Recent Activity Dashboard</div>
            <div className="mt-1 text-sm text-white-color/48">
              Track admin changes across users, governance and system level actions.
            </div>
          </div>

          <div className="inline-flex rounded-2xl border border-white-color/10 bg-white-color/[5%] p-1 text-sm font-inter-s text-white-color/55">
            <button
              type="button"
              onClick={() => {
                setMode("real-time");
                setCurrentPage(1);
              }}
              className={`rounded-[14px] px-4 py-2 transition ${
                mode === "real-time" ? "bg-white-color text-[#23308d] shadow-sm" : ""
              }`}
            >
              Real-time
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("historical");
                setCurrentPage(1);
              }}
              className={`rounded-[14px] px-4 py-2 transition ${
                mode === "historical" ? "bg-white-color text-[#23308d] shadow-sm" : ""
              }`}
            >
              Historical
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="border-y border-white-color/10 bg-white-color/[3%] text-[11px] uppercase tracking-[0.18em] text-white-color/40">
              <tr>
                <th className="px-7 py-4 font-inter-s">Timestamp</th>
                <th className="px-7 py-4 font-inter-s">Admin ID</th>
                <th className="px-7 py-4 font-inter-s">Module</th>
                <th className="px-7 py-4 font-inter-s">Action</th>
                <th className="px-7 py-4 font-inter-s">Old Value</th>
                <th className="px-7 py-4 font-inter-s">New Value</th>
              </tr>
            </thead>

            <tbody>
              {visibleRows.map((row) => (
                <tr key={row.id} className="border-b border-white-color/8 align-top">
                  <td className="px-7 py-5">
                    <div className="text-[28px] font-inter-b leading-[1.05] text-white-color">{row.timestamp}</div>
                    <div className="mt-1 text-sm text-white-color/42">{row.utc}</div>
                  </td>
                  <td className="px-7 py-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white-color/[7%] text-sm font-inter-b text-white-color/80">
                        {row.initials}
                      </span>
                      <span className="text-lg font-inter-s text-white-color/82">{row.adminId}</span>
                    </div>
                  </td>
                  <td className="px-7 py-5">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-inter-s ${getModuleTone(row.module)}`}>
                      {row.module}
                    </span>
                  </td>
                  <td className="px-7 py-5 text-lg font-inter-s text-yellow-color">{row.action}</td>
                  <td className="px-7 py-5">
                    <span className="inline-flex rounded-xl bg-white-color/[7%] px-3 py-2 text-sm text-white-color/60">
                      {row.oldValue}
                    </span>
                  </td>
                  <td className="px-7 py-5">
                    <span className={`inline-flex rounded-xl px-3 py-2 text-sm font-inter-s ${getValueTone(row.newValue)}`}>
                      {row.newValue}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-white-color/10 px-5 py-5 text-sm text-white-color/45 md:flex-row md:items-center md:justify-between md:px-7">
          <div>{metaText}</div>

          <div className="flex items-center gap-2 text-base text-white-color/45">
            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.max(previous - 1, 1))}
              disabled={currentPage === 1}
              className="rounded-full p-1 transition hover:bg-white-color/[6%] hover:text-white-color disabled:cursor-not-allowed disabled:opacity-35"
            >
              <FiChevronLeft />
            </button>
            <span className="min-w-[72px] text-center text-sm text-white-color/55">
              {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((previous) => Math.min(previous + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="rounded-full p-1 transition hover:bg-white-color/[6%] hover:text-white-color disabled:cursor-not-allowed disabled:opacity-35"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuditLogsSection;
