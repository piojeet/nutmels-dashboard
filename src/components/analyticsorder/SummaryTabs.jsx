import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import OrderChart from './OrderChart';
import OrderList from './OrderList';
import ProductPerformance from './ProductPerformance';
import Transactions from './Transactions';
import useTabIndicator from '../../hooks/useTabIndicator';

const tabs = ['Analytics', 'CRM', 'SEO', 'Website'];
const componentMap = {
  Analytics: <OrderChart />,
  CRM: 'This is CRM content.',
  SEO: 'This is SEO content.',
  Website: 'This is Website content.',
};
const options = ['Last 7 days', 'Last 30 days', 'Last 60 days', 'Last 90 days', 'Last 1 year'];

function SummaryTabs() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [activeTab, setActiveTab] = useState(tabs[0] || '');
  const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(activeTab);
  if (!tabs.length) return null;

  return (
    <div className='flex flex-col gap-4 lg:grid lg:grid-cols-2'>
      <div className='rounded-xl border border-white-color/20 bg-white-color/5'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between px-3 pt-3'>
          <div className='flex flex-col gap-4 xl:flex-row xl:items-center'>
            <div className='font-inter-b text-white-color'>Summary</div>
            <div ref={tabListRef} className='relative flex overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  ref={getTabRef(tab)}
                  data-tab-key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                  }}
                  className={`relative shrink-0 px-3 text-sm font-inter-r transition-all duration-300 ease-in-out sm:px-3 ${
                    activeTab === tab ? 'text-yellow-color font-inter-b' : 'text-white-color/50 hover:text-yellow-color'
                  }`}
                >
                  {tab}
                </button>
              ))}

              <div
                className='absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out'
                style={{ left: underlineStyle.left, width: underlineStyle.width, opacity: underlineStyle.opacity }}
              />
            </div>
          </div>

          <div className='relative z-20 w-full select-none text-white-color sm:w-fit'>
            <div className='flex min-w-full cursor-pointer items-center justify-between gap-2 rounded-lg border border-white-color/20 bg-transparent px-3 py-1.5 sm:min-w-[140px]' onClick={() => {
              setIsOpen(!isOpen);
            }}>
              <span>{selected}</span>
              <BiChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
              <div className='absolute left-0 top-full mt-2 w-full overflow-hidden rounded-lg border border-white-color/10 bg-black-color shadow-lg'>
                {options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-2 text-sm transition-all hover:bg-yellow-color/20 hover:text-yellow-color ${
                      selected === option ? 'bg-white/10 text-yellow-color' : 'text-white-color/80'
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className='mt-4 text-sm text-white transition-opacity duration-300 ease-in-out opacity-100'>
          {componentMap?.[activeTab] || 'No content available'}
        </div>
      </div>

      <OrderList />
      <ProductPerformance />
      <Transactions />
    </div>
  );
}

export default SummaryTabs;
