import React from 'react'
import { useUiSeo } from '../../context/UiContext'
import SeoHome from './SeoHome';
import SeoAbout from './SeoAbout';
import SeoPolicy from './SeoPolicy';
import SeoHeader from './SeoHeader';
import SeoFooter from './SeoFooter';

function UiHome() {
    const {underlineStyle,setSelectedTab,selectedTab,tabRefs} = useUiSeo();

    const statuses = [
        "Home",
        "About Us",
        "Policy Docs",
        "Header",
        "Footer",
      ];
  return (
    <div>
        <div className="text-xl font-inter-b text-white-color">UI/SEO</div>

        <div>
        <div className=" mt-4">
            {/* Status Filters */}
            <div className="relative h-fit border-b border-white-color/30 max-w-[700px]">
              <div className="flex justify-between">
                {statuses.map((status, i) => (
                  <button
                    key={status}
                    ref={(el) => (tabRefs.current[i] = el)}
                    onClick={() => setSelectedTab(status)}
                    className={`relative font-inter-r text-sm transition-all pb-2 px-2.5 ${selectedTab === status
                      ? "text-yellow-color font-medium"
                      : "text-white-color/50 hover:text-yellow-color"
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              {/* Underline */}
              <div
                className="absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out"
                style={{
                  left: underlineStyle.left,
                  width: underlineStyle.width,
                }}
              />
            </div>
          </div>

          <div className="mt-4 h-full">
            {selectedTab === "Home" && <SeoHome />}
            {selectedTab === "About Us " && <SeoAbout />}
            {selectedTab === "Policy Docs" && <SeoPolicy />}
            {selectedTab === "Header" && <SeoHeader />}
            {selectedTab === "Footer" && <SeoFooter />}
          </div>
        </div>
    </div>
  )
}

export default UiHome