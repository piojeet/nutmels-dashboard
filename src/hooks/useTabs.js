import { useState } from "react";
import useTabIndicator from "./useTabIndicator";

const useTabs = (initialTab) => {
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const { getTabRef, tabListRef, underlineStyle } =
    useTabIndicator(selectedTab);

  return {
    selectedTab,
    setSelectedTab,
    getTabRef,
    tabListRef,
    underlineStyle,
  };
};

export default useTabs;