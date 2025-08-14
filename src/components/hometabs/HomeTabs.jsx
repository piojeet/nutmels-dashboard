import React, { useState, useRef, useEffect } from 'react';
import SummaryTabs from '../analyticsorder/SummaryTabs';
import CRM from '../crm/CRM';

const tabs = ['Analytics', 'CRM', 'SEO', 'Website'];

const componentMap = {
  Analytics: <SummaryTabs />,
  CRM: <CRM />,
  SEO: "This is SEO content.",
  Website: "This is Website content.",
};

function HomeTabs() {
 const [activeTab, setActiveTab] = useState(tabs[0] || '');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef([]);

  useEffect(() => {
    const currentTab = tabRefs.current[tabs.indexOf(activeTab)];
    if (currentTab) {
      const { offsetLeft, offsetWidth } = currentTab;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab, tabs]);

  if (!tabs.length) return null; // No tabs passed

  return (
    <div className="w-full mx-auto mt-8 relative">
      {/* Tabs */}
      <div className="flex space-x-4 pb-2 relative">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => setActiveTab(tab)}
            className={`relative px-4 font-inter-r text-sm transition-all duration-300 ease-in-out
              ${
                activeTab === tab
                  ? 'text-yellow-color font-medium'
                  : 'text-white-color/50 hover:text-yellow-color'
              }`}
          >
            {tab}
          </button>
        ))}

        {/* Moving Underline */}
        <div
          className="absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out"
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
          }}
        />
      </div>

      {/* Content */}
      <div className="mt-6 text-white text-sm transition-opacity duration-300 ease-in-out opacity-100">
        {componentMap?.[activeTab] || 'No content available'}
      </div>
    </div>
  );
}

export default HomeTabs;
