import React from 'react';
import { useUiSeo } from '../../context/UiContext';
import SeoHome from './SeoHome';
import SeoAbout from './SeoAbout';
import SeoPolicy from './SeoPolicy';
import SeoHeader from './SeoHeader';
import SeoFooter from './SeoFooter';

function UiHome() {
  const { underlineStyle, setSelectedTab, selectedTab, getTabRef, tabListRef } = useUiSeo();

  const statuses = ['Home', 'About Us', 'Policy Docs', 'Header', 'Footer'];

  return (
    <div className='w-full pt-6'>
      <div className='text-xl font-inter-b text-white-color'>UI/SEO</div>

      <div className='mt-4'>
        <div ref={tabListRef} className='relative h-fit max-w-full border-b border-white-color/30 xl:max-w-[700px]'>
          <div className='flex gap-2 overflow-x-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4'>
            {statuses.map((status) => (
              <button
                key={status}
                ref={getTabRef(status)}
                data-tab-key={status}
                onClick={() => {
                  setSelectedTab(status);
                }}
                className={`relative shrink-0 px-2.5 pb-2 font-inter-r text-sm transition-all ${
                  selectedTab === status ? 'text-yellow-color font-medium' : 'text-white-color/50 hover:text-yellow-color'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div
            className='absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out'
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              opacity: underlineStyle.opacity,
            }}
          />
        </div>

        <div className='mt-4 h-full w-full'>
          {selectedTab === 'Home' && <SeoHome />}
          {selectedTab === 'About Us' && <SeoAbout />}
          {selectedTab === 'Policy Docs' && <SeoPolicy />}
          {selectedTab === 'Header' && <SeoHeader />}
          {selectedTab === 'Footer' && <SeoFooter />}
        </div>
      </div>
    </div>
  );
}

export default UiHome;
