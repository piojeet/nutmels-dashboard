import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  createAddressForm,
  createAnalyticsForm,
  createCurrencyForm,
  createLanguageControls,
  createMediaForm,
  createPaymentSettings,
  createSocialForm,
  SETTING_TABS,
} from "./settingData";
import AddressSection from "./sections/AddressSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import CurrencySection from "./sections/CurrencySection";
import LanguagesSection from "./sections/LanguagesSection";
import LogisticsPartnersSection from "./sections/LogisticsPartnersSection";
import MediaSection from "./sections/MediaSection";
import NotificationsSection from "./sections/NotificationsSection";
import PaymentSection from "./sections/PaymentSection";
import SeoAiSection from "./sections/SeoAiSection";
import SystemGovernanceSection from "./sections/SystemGovernanceSection";
import SocialSection from "./sections/SocialSection";

const TAB_COMPONENTS = {
  currency: CurrencySection,
  address: AddressSection,
  languages: LanguagesSection,
  social: SocialSection,
  analytics: AnalyticsSection,
  payment: PaymentSection,
  media: MediaSection,
  logistics: LogisticsPartnersSection,
  "seo-ai": SeoAiSection,
  "system-governance": SystemGovernanceSection,
  notifications: NotificationsSection,
};

function SettingsSectionsPanel() {
  const [activeTab, setActiveTab] = useState("currency");
  const [isDesktopTabs, setIsDesktopTabs] = useState(false);
  const [tabIndicatorStyle, setTabIndicatorStyle] = useState({
    left: 0,
    width: 0,
    top: 0,
    height: 0,
    opacity: 0,
  });
  const [currencyForm, setCurrencyForm] = useState(createCurrencyForm);
  const [addressForm, setAddressForm] = useState(createAddressForm);
  const [languageControls, setLanguageControls] = useState(
    createLanguageControls,
  );
  const [socialForm, setSocialForm] = useState(createSocialForm);
  const [analyticsForm, setAnalyticsForm] = useState(createAnalyticsForm);
  const [paymentSettings, setPaymentSettings] = useState(createPaymentSettings);
  const [mediaForm, setMediaForm] = useState(createMediaForm);
  const tabRefs = useRef(new Map());
  const tabsContainerRef = useRef(null);
  const frameRef = useRef(null);
  const timeoutRef = useRef(null);

  const sectionProps = {
    currency: { form: currencyForm, setForm: setCurrencyForm },
    address: { form: addressForm, setForm: setAddressForm },
    languages: { controls: languageControls, setControls: setLanguageControls },
    social: { form: socialForm, setForm: setSocialForm },
    analytics: { form: analyticsForm, setForm: setAnalyticsForm },
    payment: { settings: paymentSettings, setSettings: setPaymentSettings },
    media: { form: mediaForm, setForm: setMediaForm },
  };

  const ActiveSection = TAB_COMPONENTS[activeTab];

  const updateTabIndicator = useCallback(() => {
    const currentTab = tabRefs.current.get(activeTab);
    const container = tabsContainerRef.current;
    const isDesktop = window.innerWidth >= 1280;

    const handleScroll = () => scheduleIndicatorUpdate();

    container?.addEventListener("scroll", handleScroll);

    setIsDesktopTabs(isDesktop);

    if (!currentTab || !container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const tabRect = currentTab.getBoundingClientRect();

    if (isDesktop) {
      const nextStyle = {
        left: 0,
        width: 0,
        top: tabRect.top - containerRect.top + 4,
        height: Math.max(tabRect.height - 8, 24),
        opacity: 1,
      };

      setTabIndicatorStyle((previousStyle) =>
        previousStyle.top === nextStyle.top &&
        previousStyle.height === nextStyle.height &&
        previousStyle.opacity === nextStyle.opacity
          ? previousStyle
          : nextStyle,
      );
      return;
    }

    const nextStyle = {
      left: currentTab.offsetLeft,
      width: currentTab.offsetWidth,
      top: 0,
      height: 0,
      opacity: currentTab.offsetWidth > 0 ? 1 : 0,
    };

    setTabIndicatorStyle((previousStyle) =>
      previousStyle.left === nextStyle.left &&
      previousStyle.width === nextStyle.width &&
      previousStyle.opacity === nextStyle.opacity
        ? previousStyle
        : nextStyle,
    );
  }, [activeTab]);

  const scheduleIndicatorUpdate = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      updateTabIndicator();

      frameRef.current = requestAnimationFrame(() => {
        updateTabIndicator();
      });

      timeoutRef.current = window.setTimeout(() => {
        updateTabIndicator();
      }, 90);
    });
  }, [updateTabIndicator]);

  const getTabRef = useCallback(
    (tabId) => (element) => {
      if (element) {
        tabRefs.current.set(tabId, element);
      } else {
        tabRefs.current.delete(tabId);
      }

      if (tabId === activeTab && element) {
        scheduleIndicatorUpdate();
      }
    },
    [activeTab, scheduleIndicatorUpdate],
  );

  useLayoutEffect(() => {
    scheduleIndicatorUpdate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scheduleIndicatorUpdate]);

  useEffect(() => {
    scheduleIndicatorUpdate();

    const handleResize = () => scheduleIndicatorUpdate();
    const handleWindowLoad = () => scheduleIndicatorUpdate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleWindowLoad);

    const container = tabsContainerRef.current;
    let resizeObserver;

    if (typeof ResizeObserver !== "undefined" && container) {
      resizeObserver = new ResizeObserver(() => {
        scheduleIndicatorUpdate();
      });

      resizeObserver.observe(container);
      tabRefs.current.forEach((element) => {
        if (element?.isConnected) {
          resizeObserver.observe(element);
        }
      });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        scheduleIndicatorUpdate();
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleWindowLoad);
      resizeObserver?.disconnect();
    };
  }, [activeTab, scheduleIndicatorUpdate]);

  return (
    <div className="">
      <div className="grid min-w-0 gap-6 xl:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="min-w-0 xl:border-r xl:border-white-color/10 xl:pr-6">
          <div
            ref={tabsContainerRef}
            className="relative flex min-w-0 gap-2 overflow-x-auto border-b border-white-color/10 pb-2 xl:flex-col xl:gap-0 xl:overflow-visible xl:border-b-0 xl:border-l xl:border-white-color/10 xl:pb-0 xl:pl-4 h-full thumb-none"
          >
            {SETTING_TABS.map((tab) => (
              <button
                key={tab.id}
                ref={getTabRef(tab.id)}
                data-tab-id={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`relative shrink-0 rounded-[22px] px-4 text-left font-inter-s transition xl:w-full xl:rounded-none xl:px-0 xl:py-1.5 xl:pl-5 cursor-pointer text-sm ${
                  activeTab === tab.id
                    ? "text-yellow-color"
                    : "text-white-color/70 hover:text-white-color"
                }`}
              >
                <span className="whitespace-nowrap xl:whitespace-normal">
                  {tab.label}
                </span>
              </button>
            ))}

            <div
              className={`pointer-events-none absolute bg-yellow-color transition-all duration-300 ease-in-out ${
                isDesktopTabs ? "left-0 w-0.5 rounded-full" : "bottom-0 h-0.5"
              }`}
              style={
                isDesktopTabs
                  ? {
                      top: tabIndicatorStyle.top,
                      height: tabIndicatorStyle.height,
                      opacity: tabIndicatorStyle.opacity,
                    }
                  : {
                      left: tabIndicatorStyle.left,
                      width: tabIndicatorStyle.width,
                      opacity: tabIndicatorStyle.opacity,
                    }
              }
            />
          </div>
        </aside>

        <div className="min-w-0 pb-6">
          <ActiveSection {...sectionProps[activeTab]} />
        </div>
      </div>
    </div>
  );
}

export default SettingsSectionsPanel;
