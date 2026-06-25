import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiRefreshCw, FiZap } from "react-icons/fi";
import { Panel } from "../SettingUI";
import { RiSettings3Line } from "react-icons/ri";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import Chart from "chart.js/auto";
import { showAppToast } from "../../../utils/appToast";

const PAYMENTS = {
  juspay: {
    label: "Juspay",
    name: "Juspay Gateway",
    status: "Authorized",
    latency: "0.4ms",
    lastSync: "Oct 24, 2023 • 14:22 PM",
    region: "IN Fulfillment",
    labelsdata: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [12, 38, 22, 52, 36, 68, 82, 58, 100, 72, 44, 33],
    alphasdata: [
      0.28, 0.52, 0.38, 0.62, 0.45, 0.7, 0.78, 0.65, 0.72, 0.6, 0.38, 0.28,
    ],
  },
  kotak: {
    label: "Kotak Bank",
    name: "Kotak Gateway",
    status: "Ready",
    latency: "0.8ms",
    lastSync: "Today • 10:18 AM",
    region: "Metro Express",
    labelsdata: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    data: [12, 38, 22, 52, 36, 68, 82, 58, 140, 72, 44, 22],
    alphasdata: [
      0.28, 0.52, 0.38, 0.62, 0.45, 0.7, 0.78, 0.65, 0.72, 0.6, 0.38, 0.28,
    ],
  },
};

function PaymentSection() {
  const [activePayment, setActivePayment] = useState("juspay");

  const partnerButtons = useMemo(() => Object.entries(PAYMENTS), []);

  const activeIndex = partnerButtons.findIndex(([id]) => id === activePayment);

  const payment = PAYMENTS[activePayment];

  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false);

  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Settings",
      detail,
    });
  };

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const barData = payment.data;
    const labels = payment.labelsdata;
    const alphas = payment.alphasdata;

    const normalColors = alphas.map((a) => `rgba(255,235,170,${a})`);

    const hoverColors = alphas.map(() => "rgba(255,255,255,0.97)");

    const topLabelPlugin = {
      id: "topLabels",
      afterDatasetsDraw(chart) {
        const { ctx, data } = chart;

        chart.getDatasetMeta(0).data.forEach((bar, i) => {
          ctx.save();
          ctx.font = "600 10px sans-serif";
          ctx.fillStyle = "rgba(255,255,255,0.9)";
          ctx.textAlign = "center";
          ctx.fillText(`${data.datasets[0].data[i]}k`, bar.x, bar.y - 5);
          ctx.restore();
        });
      },
    };

    chartInstance.current?.destroy();
    const maxValue = Math.max(...barData);

    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      plugins: [topLabelPlugin],
      data: {
        labels,
        datasets: [
          {
            data: barData,
            backgroundColor: normalColors,
            hoverBackgroundColor: hoverColors,
            borderWidth: 0,
            borderRadius: 4,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "rgba(255,255,255,0.95)",
            titleColor: "#c17a10",
            bodyColor: "#333",
            borderColor: "rgba(200,150,0,0.2)",
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y}k units`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: false,
            },
          },
          y: {
            display: false,
            min: 0,
            max: maxValue + 20,
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [payment]);

  return (
    <Panel
      title="Payment Gateways"
      description="Manage and optimize transaction routing."
    >
      <div className="space-y-4">
        <div className="relative grid grid-cols-2 gap-1 rounded-lg border border-white-color/10 bg-white-color/[5%] p-1">
          <div
            className="absolute inset-y-1 rounded-md bg-yellow-color transition-all duration-300 ease-in-out"
            style={{
              width: "calc(50% - 8px)",
              left: `calc(${activeIndex * 50}% + 4px)`,
            }}
          />

          {partnerButtons.map(([id, item]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActivePayment(id)}
              className={`relative z-10 h-10 rounded-md px-2 text-[11px] font-inter-b uppercase tracking-[0.08em] transition-colors duration-300 ${
                activePayment === id
                  ? "text-white"
                  : "text-[#8fa0b8] hover:text-yellow-color"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="">
          <div>
            <div>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="border border-white/20 rounded-lg p-4 flex flex-col justify-between gap-4">
                  <div className="flex justify-between flex-wrap gap-4">
                    <div className="flex justify-between gap-6">
                      <div className="flex items-center gap-2">
                        <div className="shrink-0 size-10 bg-yellow-color rounded-md flex items-center justify-center text-white">
                          <FiZap size={25} />
                        </div>
                        <div>
                          <h3>{payment.name}</h3>
                          <div className="text-xs font-semibold text-yellow-color flex items-center gap-1">
                            <span className="size-1.5 shrink-0 bg-yellow-color rounded-full"></span>
                            <span>{maintenanceEnabled ? "Active" : "Inactive"}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          aria-pressed={maintenanceEnabled}
                          onClick={() => {
                            const next = !maintenanceEnabled;
                            setMaintenanceEnabled(next);
                          
                            notify(
                              `${payment.label} ${
                                next ? "activated successfully." : "deactivated successfully."
                              }`,
                              next ? "success" : "info"
                            );
                          }}
                          className={`relative h-8 w-16 rounded-full transition cursor-pointer ${
                            maintenanceEnabled
                              ? "bg-yellow-color"
                              : "bg-white/10"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-6 w-6 rounded-full bg-gray-400 shadow transition ${
                              maintenanceEnabled ? "left-9 bg-white" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="shrink-0 size-10 rounded-md bg-white/10 flex items-center justify-center text-yellow-color cursor-pointer hover:bg-white/20">
                        <RiSettings3Line size={25} />
                      </button>
                      <button className="bg-yellow-color w-fit h-10 px-3 flex items-center justify-center text-white cursor-pointer hover:brightness-95 gap-2 rounded-md">
                        <MdOutlineSettingsInputComponent /> Configure
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold text-white-color mb-2">
                      Enabled Features
                    </div>
                    <div className="flex gap-2 flex-wrap text-[10px] font-semibold text-yellow-color">
                      <div className="bg-[#7B3F01] rounded-md p-1">
                        HYPER SDK
                      </div>
                      <div className="bg-[#7B3F01] rounded-md p-1">3DS 2.0</div>
                      <div className="bg-[#7B3F01] rounded-md p-1">
                        SMART ROUTING
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border border-white/20 rounded-lg p-4 flex flex-col justify-between gap-2">
                    <div className="text-xl font-semibold text-white-color">
                      Avg Speed
                    </div>
                    <div>
                      <span className="text-xl font-semibold text-white-color">
                        180
                      </span>{" "}
                      <span className="text-xs font-semibold text-white-color">
                        ms
                      </span>
                    </div>
                    <div className="h-1 bg-gray-500 rounded-full w-full relative mt-3">
                      <span className="w-[60%] h-full bg-blue-500 rounded-full inline-block absolute top-0 left-0"></span>
                    </div>
                  </div>
                  <div className="border border-white/20 rounded-lg p-4 flex flex-col justify-between gap-2">
                    <div className="text-xl font-semibold text-white-color">
                      Success Rate
                    </div>
                    <div className="text-yellow-color">
                      <span className="text-xl font-semibold">99.4</span>{" "}
                      <sup>%</sup>
                    </div>
                    <div className="h-1 bg-gray-500 rounded-full w-full relative mt-3">
                      <span className="w-[60%] h-full bg-yellow-color rounded-full inline-block absolute top-0 left-0"></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full rounded-[18px] px-5 py-4 border border-white/20">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/90">
                      Volume Trend (24H)
                    </span>

                    <span className="rounded-full bg-white/20 px-[10px] py-[3px] text-xs font-semibold text-[#E8971E]">
                      +12.4%
                    </span>
                  </div>

                  <div className="relative h-[200px]">
                    <canvas
                      ref={chartRef}
                      aria-label="Volume trend over 24 hours, up 12.4%"
                      role="img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default PaymentSection;
