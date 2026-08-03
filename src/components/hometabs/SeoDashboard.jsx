import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FiAlertTriangle,
  FiBell,
  FiCalendar,
  FiCheckCircle,
  FiChevronDown,
  FiCopy,
  FiDownload,
  FiExternalLink,
  FiFilter,
  FiMaximize2,
  FiMoreVertical,
  FiRefreshCw,
  FiSearch,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiX,
  FiZap,
} from "react-icons/fi";
import { TbSitemap } from "react-icons/tb";
import { showAppToast } from "../../utils/appToast";

const periods = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];
const filters = ["All Keywords", "Priority Keywords", "Low KD"];

const metrics = [
  {
    label: "Average rank",
    value: "12.4",
    note: "+2.1 vs last month",
    icon: FiTarget,
    tone: "teal",
  },
  {
    label: "Search impressions",
    value: "842.5K",
    note: "+14.2% organic reach",
    icon: FiTrendingUp,
    tone: "blue",
  },
  {
    label: "Sitemap status",
    value: "Healthy",
    note: "Indexed",
    icon: TbSitemap,
    tone: "green",
  },
  {
    label: "AI entity trust %",
    value: "94%",
    note: "Entity confidence",
    icon: FiShield,
    tone: "violet",
    progress: 94,
  },
];

const chartSeries = {
  "Last 7 Days": [
    { label: "Mon", value: 9800 },
    { label: "Tue", value: 12100 },
    { label: "Wed", value: 11600 },
    { label: "Thu", value: 15400 },
    { label: "Fri", value: 18600 },
    { label: "Sat", value: 17200 },
    { label: "Sun", value: 20800 },
  ],
  "Last 30 Days": [
    { label: "Jan", value: 12600 },
    { label: "Feb", value: 15200 },
    { label: "Mar", value: 14300 },
    { label: "Apr", value: 21500 },
    { label: "May", value: 27800 },
    { label: "Jun", value: 25400 },
    { label: "Jul", value: 31100 },
  ],
  "Last 90 Days": [
    { label: "Apr", value: 18200 },
    { label: "May", value: 19800 },
    { label: "Jun", value: 22100 },
    { label: "Jul", value: 24700 },
    { label: "Aug", value: 28600 },
    { label: "Sep", value: 30400 },
    { label: "Oct", value: 33600 },
  ],
};

const keywordRows = [
  {
    keyword: "saas analytics dashboard",
    tag: "Target",
    position: 3,
    move: "+2",
    volume: "12,500",
    kd: 68,
    trend: [20, 26, 22, 38, 30, 52, 60],
    tone: "#2bc6c4",
  },
  {
    keyword: "glassmorphism ui kit",
    tag: "",
    position: 1,
    move: "-",
    volume: "8,200",
    kd: 42,
    trend: [18, 18, 32, 16, 34, 50, 50],
    tone: "#aeb8df",
  },
  {
    keyword: "data visualization tools",
    tag: "",
    position: 14,
    move: "-3",
    volume: "45,000",
    kd: 89,
    trend: [62, 55, 58, 40, 33, 24, 18],
    tone: "#ff7070",
  },
  {
    keyword: "seo admin template",
    tag: "",
    position: 5,
    move: "+7",
    volume: "3,100",
    kd: 24,
    trend: [10, 14, 12, 22, 30, 35, 48],
    tone: "#2bc6c4",
  },
];

const initialErrors = [
  { path: "/old-pricing-page", hits: 142, seen: "2h ago", queued: false },
  { path: "/blog/seo-tips-2022", hits: 89, seen: "5h ago", queued: false },
];

const initialAlerts = [
  {
    id: "crawl",
    title: "Crawl required",
    body: "Metadata and nav structure changed",
    read: false,
  },
  {
    id: "links",
    title: "Broken links found",
    body: "4 redirect actions recommended",
    read: false,
  },
  {
    id: "sitemap",
    title: "Sitemap refreshed",
    body: "Last sync finished 2 hours ago",
    read: true,
  },
];

function readTheme() {
  if (typeof document === "undefined") return "default";
  return document.documentElement.getAttribute("data-theme") || "default";
}

function ChartTooltip({ active, payload, label, palette }) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="rounded-2xl border px-3 py-2 text-xs shadow-2xl backdrop-blur-xl"
      style={{
        background: palette.panelStrong,
        borderColor: palette.border,
        color: palette.text,
      }}
    >
      <div className="font-inter-m">{label}</div>
      <div className="mt-1" style={{ color: palette.muted }}>
        {payload[0].value.toLocaleString()} impressions
      </div>
    </div>
  );
}

function Sparkline({ values, stroke }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 48;
      const y = max === min ? 12 : 24 - ((value - min) / (max - min)) * 20;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 48 24" className="h-6 w-12 overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuSurface({ children, palette, className = "" }) {
  return (
    <div
      className={`absolute right-0 top-[calc(100%+10px)] z-30 min-w-[180px] rounded-[18px] border p-2 shadow-2xl backdrop-blur-xl bg-[#1C2037] ${className}`}
      style={{ borderColor: palette.border }}
    >
      {children}
    </div>
  );
}

function SeoDashboard() {
  const dashboardRef = useRef(null);
  const [themeName, setThemeName] = useState(readTheme);
  const [period, setPeriod] = useState(periods[1]);
  const [filterLabel, setFilterLabel] = useState(filters[0]);
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState("");
  const [showAllErrors, setShowAllErrors] = useState(false);
  const [crawlRequested, setCrawlRequested] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [alerts, setAlerts] = useState(initialAlerts);

  useEffect(() => {
    const observer = new MutationObserver(() => setThemeName(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!dashboardRef.current?.contains(event.target)) {
        setOpenMenu("");
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const palette =
    themeName === "dark"
      ? {
          shell:
            "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(243,245,251,0.96) 100%)",
          frame: "rgba(129, 143, 184, 0.18)",
          panel:
            "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(247,248,252,0.92) 100%)",
          panelStrong: "rgba(255,255,255,0.96)",
          card: "rgba(250,251,255,0.92)",
          cardAccent: "rgba(240,243,251,0.95)",
          border: "rgba(36,46,74,0.1)",
          text: "#1b2240",
          muted: "rgba(27,34,64,0.56)",
          teal: "#FAAA21",
          tealGlow: "rgba(29,157,153,0.16)",
          blue: "#5883ff",
          blueGlow: "rgba(88,131,255,0.18)",
          green: "#2DCA95",
          greenGlow: "rgba(45,202,149,0.18)",
          violet: "#9c6cff",
          violetGlow: "rgba(156,108,255,0.16)",
          danger: "#e85f6c",
          dangerGlow: "rgba(232,95,108,0.16)",
          progressTrack: "rgba(27,34,64,0.08)",
          chartFillStart: 0.28,
          chartFillEnd: 0.05,
          chartGrid: "rgba(36,46,74,0.07)",
          chip: "rgba(27,34,64,0.05)",
          ctaText: "#05273a",
        }
      : {
          shell:
            "linear-gradient(180deg, rgba(13,25,63,0.96) 0%, rgba(10,20,53,0.98) 100%)",
          frame: "rgba(255,255,255,0.08)",
          panel:
            "linear-gradient(180deg, rgba(18,31,72,0.94) 0%, rgba(15,27,63,0.97) 100%)",
          panelStrong: "rgba(18,31,72,0.98)",
          card: "rgba(24,37,79,0.84)",
          cardAccent: "rgba(18,31,72,0.86)",
          border: "rgba(255,255,255,0.08)",
          text: "#f8fbff",
          muted: "rgba(223,230,255,0.56)",
          teal: "#FAAA21",
          tealGlow: "rgba(43,198,196,0.18)",
          blue: "#5c8eff",
          blueGlow: "rgba(92,142,255,0.16)",
          green: "#2DCA95",
          greenGlow: "rgba(45,202,149,0.16)",
          violet: "#b06cff",
          violetGlow: "rgba(176,108,255,0.16)",
          danger: "#ff6f7e",
          dangerGlow: "rgba(255,111,126,0.16)",
          progressTrack: "rgba(255,255,255,0.08)",
          chartFillStart: 0.24,
          chartFillEnd: 0.02,
          chartGrid: "rgba(255,255,255,0.06)",
          chip: "rgba(255,255,255,0.04)",
          ctaText: "#072636",
        };

  const notify = (message) => {
    showAppToast({
      severity: "info",
      summary: "SEO",
      detail: message,
    });
  };

  const unreadAlerts = alerts.filter((item) => !item.read).length;

  const toggleMenu = (name) => {
    const isClosing = openMenu === name;
    setOpenMenu(isClosing ? "" : name);
  };

  const clearSearch = () => {
    setQuery("");
  };

  const toggleErrorList = () => {
    const next = !showAllErrors;
    setShowAllErrors(next);
  };

  const visibleKeywords = useMemo(() => {
    return keywordRows.filter((item) => {
      const matchesQuery = item.keyword
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesFilter =
        filterLabel === "All Keywords"
          ? true
          : filterLabel === "Priority Keywords"
            ? item.tag === "Target" || item.move.startsWith("+")
            : item.kd <= 45;

      return matchesQuery && matchesFilter;
    });
  }, [filterLabel, query]);

  const exportKeywords = () => {
    const csv = [
      ["Keyword", "Position", "Change", "Volume", "KD"],
      ...visibleKeywords.map((item) => [
        item.keyword,
        item.position,
        item.move,
        item.volume,
        item.kd,
      ]),
    ];
    const blob = new Blob([csv.map((row) => row.join(",")).join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "seo-keywords.csv";
    link.click();
    window.URL.revokeObjectURL(url);
    notify("SEO export downloaded");
  };

  const queueRedirect = (path) => {
    setErrors((current) =>
      current.map((item) =>
        item.path === path ? { ...item, queued: true } : item,
      ),
    );
    notify(`Redirect queued for ${path}`);
  };

  const markAlertsRead = () => {
    setAlerts((current) => current.map((item) => ({ ...item, read: true })));
    notify("Alerts marked as read");
  };

  const handleKeywordAction = async (action, row) => {
    if (action === "copy" && window.navigator?.clipboard) {
      try {
        await window.navigator.clipboard.writeText(row.keyword);
        notify(`Copied ${row.keyword}`);
      } catch {
        notify(`Copy unavailable for ${row.keyword}`);
      }
    } else if (action === "open") {
      notify(`Opened SERP view for ${row.keyword}`);
    } else if (action === "track") {
      notify(`Tracking enabled for ${row.keyword}`);
    }

    setOpenMenu("");
  };

  const errorItems = showAllErrors ? errors : errors.slice(0, 4);

  const accentMap = {
    teal: {
      iconBg: palette.tealGlow,
      iconColor: palette.teal,
      textColor: palette.teal,
    },
    blue: {
      iconBg: palette.blueGlow,
      iconColor: palette.blue,
      textColor: palette.blue,
    },
    green: {
      iconBg: palette.greenGlow,
      iconColor: palette.green,
      textColor: palette.green,
    },
    violet: {
      iconBg: palette.violetGlow,
      iconColor: palette.violet,
      textColor: palette.violet,
    },
  };

  return (
    <section
      ref={dashboardRef}
      className="relative"
      // style={{ background: palette.shell, borderColor: palette.frame }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        // style={{ background: 'radial-gradient(circle at top right, rgba(250,170,33,0.12), transparent 26%), radial-gradient(circle at bottom left, rgba(43,198,196,0.08), transparent 28%)' }}
      />

      <div className="relative z-10 grid gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-4">
          <div className="">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div
                  className="text-[20px] font-inter-b tracking-[-0.03em]"
                  style={{ color: palette.text }}
                >
                  Overview Dashboard
                </div>
                <div className="text-xs" style={{ color: palette.muted }}>
                  Track your search performance and AI entity metrics
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label
                  className="flex min-w-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm sm:min-w-[250px]"
                  style={{ borderColor: palette.border, color: palette.text }}
                >
                  <FiSearch size={16} style={{ color: palette.muted }} />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search metrics..."
                    className="w-full border-none bg-transparent text-sm outline-none placeholder:opacity-50"
                    style={{ color: palette.text }}
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="cursor-pointer rounded-full p-1 transition"
                      style={{ color: palette.muted }}
                    >
                      <FiX size={14} />
                    </button>
                  ) : null}
                </label>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleMenu("alerts")}
                    className="relative inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border px-3 transition hover:brightness-110"
                    style={{ borderColor: palette.border, color: palette.text }}
                  >
                    <FiBell size={15} />
                    {unreadAlerts ? (
                      <span
                        className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-inter-b text-[#071d2c]"
                        style={{ background: "#FAAA21" }}
                      >
                        {unreadAlerts}
                      </span>
                    ) : null}
                  </button>

                  {openMenu === "alerts" ? (
                    <MenuSurface palette={palette} className="w-[260px]">
                      <div className="flex items-center justify-between px-2 pb-2">
                        <div
                          className="text-sm font-inter-b"
                          style={{ color: palette.text }}
                        >
                          Alerts
                        </div>
                        <button
                          type="button"
                          onClick={markAlertsRead}
                          className="cursor-pointer text-xs font-inter-m transition"
                          style={{ color: "#FAAA21" }}
                        >
                          Mark all read
                        </button>
                      </div>
                      <div className="space-y-1">
                        {alerts.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              setAlerts((current) =>
                                current.map((alert) =>
                                  alert.id === item.id
                                    ? { ...alert, read: true }
                                    : alert,
                                ),
                              );
                              setOpenMenu("");
                            }}
                            className="block w-full cursor-pointer rounded-[14px] px-3 py-2 text-left transition"
                            style={{
                              background: item.read
                                ? "transparent"
                                : palette.chip,
                            }}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div
                                  className="text-sm font-inter-m"
                                  style={{ color: palette.text }}
                                >
                                  {item.title}
                                </div>
                                <div
                                  className="mt-1 text-xs leading-5"
                                  style={{ color: palette.muted }}
                                >
                                  {item.body}
                                </div>
                              </div>
                              {!item.read ? (
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-yellow-color" />
                              ) : null}
                            </div>
                          </button>
                        ))}
                      </div>
                    </MenuSurface>
                  ) : null}
                </div>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleMenu("period")}
                    className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm font-inter-m transition hover:brightness-110"
                    style={{ borderColor: palette.border, color: palette.text }}
                  >
                    <FiCalendar size={15} />
                    {period}
                    <FiChevronDown size={14} style={{ color: palette.muted }} />
                  </button>

                  {openMenu === "period" ? (
                    <MenuSurface palette={palette}>
                      {periods.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setPeriod(item);
                            setOpenMenu("");
                          }}
                          className="flex w-full cursor-pointer items-center justify-between rounded-[14px] px-3 py-2 text-sm transition"
                          style={{
                            background:
                              period === item ? palette.chip : "transparent",
                            color: palette.text,
                          }}
                        >
                          {item}
                          {period === item ? (
                            <span className="text-yellow-color">Active</span>
                          ) : null}
                        </button>
                      ))}
                    </MenuSurface>
                  ) : null}
                </div>

                <button
                  type="button"
                  className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border transition hover:brightness-110"
                  style={{ borderColor: palette.border, color: palette.text }}
                >
                  <FiMaximize2 size={13} />
                </button>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map((item) => {
                const Icon = item.icon;
                const accent = accentMap[item.tone];

                return (
                  <button
                    key={item.label}
                    type="button"
                    className="cursor-pointer rounded-xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg bg-white/5"
                    style={{ borderColor: palette.border }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div
                          className="text-[11px] uppercase tracking-[0.18em]"
                          style={{ color: palette.muted }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="mt-1 text-lg font-inter-b leading-none"
                          style={{ color: palette.text }}
                        >
                          {item.value}
                        </div>
                      </div>
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{
                          background: accent.iconBg,
                          color: accent.iconColor,
                        }}
                      >
                        <Icon size={16} />
                      </div>
                    </div>

                    {item.progress ? (
                      <div className="mt-3">
                        <div
                          className="h-1 overflow-hidden rounded-full"
                          style={{ background: palette.progressTrack }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.progress}%`,
                              background: `linear-gradient(90deg, ${palette.violet}, ${palette.teal})`,
                            }}
                          />
                        </div>
                        <div
                          className="mt-2 text-xs"
                          style={{ color: accent.textColor }}
                        >
                          {item.note}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="mt-5 text-xs"
                        style={{ color: accent.textColor }}
                      >
                        {item.note}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-xl border p-3 bg-white/5 pb-0"
            style={{ borderColor: palette.border }}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div
                  className="text-lg font-inter-b"
                  style={{ color: palette.text }}
                >
                  Search Keywords Performance
                </div>
                <div className="mt-1 text-sm" style={{ color: palette.muted }}>
                  Top driving queries and rank trends
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => toggleMenu("filter")}
                    className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border px-3 text-xs font-inter-m transition hover:brightness-110"
                    style={{ borderColor: palette.border, color: palette.text }}
                  >
                    <FiFilter size={13} />
                    {filterLabel}
                  </button>

                  {openMenu === "filter" ? (
                    <MenuSurface palette={palette}>
                      {filters.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setFilterLabel(item);
                            setOpenMenu("");
                          }}
                          className="flex w-full cursor-pointer items-center justify-between rounded-[14px] px-3 py-2 text-sm transition"
                          style={{
                            background:
                              filterLabel === item
                                ? palette.chip
                                : "transparent",
                            color: palette.text,
                          }}
                        >
                          {item}
                          {filterLabel === item ? (
                            <span className="text-yellow-color">Active</span>
                          ) : null}
                        </button>
                      ))}
                    </MenuSurface>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={exportKeywords}
                  className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl border px-3 text-xs font-inter-m transition hover:brightness-110"
                  style={{ borderColor: palette.border, color: palette.text }}
                >
                  <FiDownload size={13} />
                  Export
                </button>
              </div>
            </div>

            <div className="mt-2 h-[100px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartSeries[period]}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="seoPerformanceFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor={palette.teal}
                        stopOpacity={palette.chartFillStart}
                      />
                      <stop
                        offset="100%"
                        stopColor={palette.teal}
                        stopOpacity={palette.chartFillEnd}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke={palette.chartGrid} />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: palette.muted, fontSize: 12 }}
                    dy={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: palette.muted, fontSize: 12 }}
                    width={34}
                    tickFormatter={(value) => `${Math.round(value / 1000)}k`}
                  />
                  <Tooltip content={<ChartTooltip palette={palette} />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={palette.teal}
                    strokeWidth={2.4}
                    fill="url(#seoPerformanceFill)"
                    dot={false}
                    activeDot={{
                      r: 4,
                      fill: palette.teal,
                      stroke: palette.panelStrong,
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr
                    className="text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      borderColor: palette.border,
                      color: palette.muted,
                    }}
                  >
                    <th className="py-1.5 pr-4 font-inter-r">Keyword</th>
                    <th className="py-1.5 pr-4 font-inter-r">Position</th>
                    <th className="py-1.5 pr-4 font-inter-r">Volume</th>
                    <th className="py-1.5 pr-4 font-inter-r">KD %</th>
                    <th className="py-1.5 pr-4 font-inter-r">Trend (7D)</th>
                    <th className="py-1.5 text-right font-inter-r">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleKeywords.length ? (
                    visibleKeywords.map((row) => {
                      const movementColor = row.move.startsWith("+")
                        ? palette.green
                        : row.move.startsWith("-") && row.move !== "-"
                          ? palette.danger
                          : palette.muted;
                      const kdColor =
                        row.kd >= 75
                          ? palette.danger
                          : row.kd >= 45
                            ? "#f6c24d"
                            : palette.green;

                      return (
                        <tr
                          key={row.keyword}
                          className="border-t"
                          style={{
                            borderColor: palette.border,
                            color: palette.text,
                          }}
                        >
                          <td className="py-1 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="font-inter-m">
                                {row.keyword}
                              </span>
                              {row.tag ? (
                                <span
                                  className="rounded-full px-2 py-1 text-[10px] font-inter-m uppercase tracking-[0.08em]"
                                  style={{
                                    background: palette.tealGlow,
                                    color: palette.teal,
                                  }}
                                >
                                  {row.tag}
                                </span>
                              ) : null}
                            </div>
                          </td>
                          <td className="py-1 pr-4">
                            <span className="font-inter-m">{row.position}</span>{" "}
                            <span style={{ color: movementColor }}>
                              {row.move}
                            </span>
                          </td>
                          <td
                            className="py-1 pr-4"
                            style={{ color: palette.muted }}
                          >
                            {row.volume}
                          </td>
                          <td className="py-1 pr-4">
                            <div className="flex items-center gap-3">
                              <span
                                className="font-inter-m"
                                style={{ color: kdColor }}
                              >
                                {row.kd}
                              </span>
                              <div
                                className="h-1.5 w-16 overflow-hidden rounded-full"
                                style={{ background: palette.progressTrack }}
                              >
                                <div
                                  className="h-full rounded-full"
                                  style={{
                                    width: `${row.kd}%`,
                                    background: kdColor,
                                  }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-1 pr-4">
                            <Sparkline values={row.trend} stroke={row.tone} />
                          </td>
                          <td className="py-1 text-right">
                            <div className="relative inline-flex">
                              <button
                                type="button"
                                onClick={() => toggleMenu(`row:${row.keyword}`)}
                                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl border transition hover:brightness-110"
                                style={{
                                  background: palette.chip,
                                  borderColor: palette.border,
                                  color: palette.muted,
                                }}
                              >
                                <FiMoreVertical size={14} />
                              </button>

                              {openMenu === `row:${row.keyword}` ? (
                                <MenuSurface
                                  palette={palette}
                                  className="w-[170px] text-left"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleKeywordAction("open", row)
                                    }
                                    className="flex w-full cursor-pointer items-center gap-2 rounded-[14px] px-3 py-2 text-sm transition"
                                    style={{ color: palette.text }}
                                  >
                                    <FiExternalLink size={14} />
                                    Open SERP
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleKeywordAction("track", row)
                                    }
                                    className="flex w-full cursor-pointer items-center gap-2 rounded-[14px] px-3 py-2 text-sm transition"
                                    style={{ color: palette.text }}
                                  >
                                    <FiRefreshCw size={14} />
                                    Track keyword
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleKeywordAction("copy", row)
                                    }
                                    className="flex w-full cursor-pointer items-center gap-2 rounded-[14px] px-3 py-2 text-sm transition"
                                    style={{ color: palette.text }}
                                  >
                                    <FiCopy size={14} />
                                    Copy keyword
                                  </button>
                                </MenuSurface>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr
                      className="border-t"
                      style={{ borderColor: palette.border }}
                    >
                      <td
                        colSpan="6"
                        className="py-8 text-center text-sm"
                        style={{ color: palette.muted }}
                      >
                        No keywords match your current search and filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-xl border p-3"
            style={{ borderColor: palette.border }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div
                  className="flex items-center gap-2 font-inter-b"
                  style={{ color: palette.text }}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-xl"
                    style={{
                      background: palette.dangerGlow,
                      color: palette.danger,
                    }}
                  >
                    <FiAlertTriangle size={16} />
                  </span>
                  <div>
                    <div>404 Monitor</div>
                    <div
                      className="text-xs font-medium"
                      style={{ color: palette.muted }}
                    >
                      Broken links detected
                    </div>
                  </div>
                </div>
              </div>

              <span
                className="rounded-full px-2 py-1 text-[10px] font-inter-m uppercase tracking-[0.14em]"
                style={{ background: "#ff6f7e", color: "#fff" }}
              >
                {errors.filter((item) => !item.queued).length} New
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              {errorItems.map((item) => (
                <div
                  key={item.path}
                  className="rounded-[18px] border p-3 bg-white/5"
                  style={{ borderColor: palette.border }}
                >
                  <div
                    className="truncate text-sm font-inter-m"
                    style={{ color: palette.text }}
                  >
                    {item.path}
                  </div>
                  <div
                    className="mt-1 flex items-center justify-between gap-3 text-xs"
                    style={{ color: palette.muted }}
                  >
                    <span>{`Hits: ${item.hits} | ${item.seen}`}</span>
                    <button
                      type="button"
                      onClick={() => queueRedirect(item.path)}
                      disabled={item.queued}
                      className="cursor-pointer rounded-lg px-2.5 py-1.5 text-[11px] font-inter-m transition disabled:cursor-default disabled:opacity-70"
                      style={{
                        background: item.queued ? palette.teal : palette.chip,
                        border: `1px solid ${item.queued ? palette.teal : palette.border}`,
                        color: item.queued ? palette.ctaText : palette.text,
                      }}
                    >
                      {item.queued ? "Queued" : "Set Redirect"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleErrorList}
              className="mt-4 w-full cursor-pointer rounded-lg border px-3 py-2 text-sm font-inter-m transition hover:brightness-110"
              style={{ borderColor: palette.border, color: palette.text }}
            >
              {showAllErrors ? "Show Fewer Errors" : "View All Errors"}
            </button>
          </div>

          <div
            className="rounded-xl border p-3"
            style={{ borderColor: palette.border }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: palette.tealGlow, color: palette.teal }}
            >
              <FiZap size={13} />
            </div>

            <div
              className="mt-2 text-lg font-inter-b"
              style={{ color: palette.text }}
            >
              Crawl Required
            </div>
            <div
              className="text-xs leading-5"
              style={{ color: palette.muted }}
            >
              Major structural changes detected. Request Google to re-crawl your
              site.
            </div>

            <div
              className="mt-3 rounded-lg border p-3 text-xs"
              style={{
                background: palette.cardAccent,
                borderColor: palette.border,
                color: palette.muted,
              }}
            >
              <div className="flex items-center gap-2 font-inter-m">
                <FiCheckCircle size={16} style={{ color: palette.green }} />
                Suggested after navigation or metadata updates
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCrawlRequested(true);
                notify("Re-index request queued");
              }}
              className="mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-inter-b transition hover:brightness-110"
              style={{
                background: crawlRequested
                  ? "linear-gradient(135deg, #f6c24d, #ffd36a)"
                  : `linear-gradient(135deg, ${palette.teal}, #41d5ca)`,
                color: palette.ctaText,
              }}
            >
              <FiZap size={16} />
              {crawlRequested ? "Re-index Requested" : "Request Re-index"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeoDashboard;
