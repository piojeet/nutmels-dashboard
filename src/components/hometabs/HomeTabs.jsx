import React, { useState } from 'react';
import SummaryTabs from '../analyticsorder/SummaryTabs';
import CRM from '../crm/CRM';
import useTabIndicator from '../../hooks/useTabIndicator';
import SeoDashboard from './SeoDashboard';
import WebsiteDashboard from './WebsiteDashboard';

const tabs = ['Analytics', 'CRM', 'SEO', 'Website'];

const componentMap = {
  Analytics: <SummaryTabs />,
  CRM: <CRM />,
  SEO: <SeoDashboard />,
  Website: <WebsiteDashboard />,
};

function HomeTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0] || '');
  const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(activeTab);

  if (!tabs.length) return null;

  return (
    <div className='relative mt-6 w-full sm:mt-8'>
      <div ref={tabListRef} className='relative flex w-full gap-2 overflow-x-auto pb-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4'>
        {tabs.map((tab) => (
          <button
            key={tab}
            ref={getTabRef(tab)}
            data-tab-key={tab}
            onClick={() => {
              setActiveTab(tab);
            }}
            className={`relative shrink-0 px-3 py-1 font-inter-r text-sm transition-all duration-300 ease-in-out sm:px-4 ${
              activeTab === tab ? 'text-yellow-color font-medium' : 'text-white-color/50 hover:text-yellow-color'
            }`}
          >
            {tab}
          </button>
        ))}

        <div
          className='absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out'
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
            opacity: underlineStyle.opacity,
          }}
        />
      </div>

      <div className='mt-5 text-sm text-white transition-opacity duration-300 ease-in-out opacity-100 sm:mt-6'>
        {componentMap?.[activeTab] || 'No content available'}
      </div>
    </div>
  );
}

export default HomeTabs;
