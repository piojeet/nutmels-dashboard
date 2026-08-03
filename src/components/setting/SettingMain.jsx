import React, { useState } from "react";
import useTabIndicator from "../../hooks/useTabIndicator";
import AuditLogsSection from "./AuditLogsSection";
import SettingsSectionsPanel from "./SettingsSectionsPanel";
import UsersSection from "./UsersSection";

const SETTING_TOP_TABS = [
  { id: "users", label: "Users" },
  { id: "settings", label: "Settings" },
  { id: "audit-logs", label: "Audit logs" },
];

const TAB_COMPONENTS = {
  users: <UsersSection />,
  settings: <SettingsSectionsPanel />,
  "audit-logs": <AuditLogsSection />,
};

function SettingMain() {
  const [activeTopTab, setActiveTopTab] = useState("settings");
  const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(activeTopTab);

  return (
    <section className="text-white-color pt-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-inter-b text-white-color">Settings</h1>

          <div
            ref={tabListRef}
            className="relative mt-4 flex w-full max-w-[420px] gap-5 overflow-x-auto border-b border-white-color/18 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SETTING_TOP_TABS.map((tab) => (
              <button
                key={tab.id}
                ref={getTabRef(tab.id)}
                data-tab-key={tab.id}
                type="button"
                onClick={() => setActiveTopTab(tab.id)}
                className={`relative shrink-0 px-1 pb-2 text-sm font-inter-s transition ${
                  activeTopTab === tab.id
                    ? "text-yellow-color"
                    : "text-white-color/50 hover:text-white-color"
                }`}
              >
                {tab.label}
              </button>
            ))}

            <div
              className="pointer-events-none absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
                opacity: underlineStyle.opacity,
              }}
            />
          </div>
        </div>

        <div>{TAB_COMPONENTS[activeTopTab]}</div>
      </div>
    </section>
  );
}

export default SettingMain;
