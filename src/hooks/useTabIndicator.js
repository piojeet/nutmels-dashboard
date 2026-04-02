import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

function escapeSelectorValue(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function useTabIndicator(activeTab) {
  const tabListRef = useRef(null);
  const tabElementsRef = useRef(new Map());
  const frameRef = useRef(null);
  const timeoutRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const resolveCurrentTab = useCallback(() => {
    const normalizedKey = String(activeTab);
    const mappedElement = tabElementsRef.current.get(normalizedKey);

    if (mappedElement && mappedElement.isConnected) {
      return mappedElement;
    }

    const container = tabListRef.current;
    if (!container) {
      return null;
    }

    const queriedElement = container.querySelector(
      `[data-tab-key="${escapeSelectorValue(normalizedKey)}"]`
    );

    if (queriedElement) {
      tabElementsRef.current.set(normalizedKey, queriedElement);
    }

    return queriedElement;
  }, [activeTab]);

  const updateIndicator = useCallback(() => {
    const container = tabListRef.current;
    const currentTab = resolveCurrentTab();

    if (!container || !currentTab) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const tabRect = currentTab.getBoundingClientRect();

    const nextStyle = {
      left: tabRect.left - containerRect.left,
      width: tabRect.width,
      opacity: tabRect.width > 0 ? 1 : 0,
    };

    setUnderlineStyle((previousStyle) =>
      previousStyle.left === nextStyle.left &&
      previousStyle.width === nextStyle.width &&
      previousStyle.opacity === nextStyle.opacity
        ? previousStyle
        : nextStyle
    );
  }, [resolveCurrentTab]);

  const scheduleUpdate = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      updateIndicator();

      frameRef.current = requestAnimationFrame(() => {
        updateIndicator();
      });

      timeoutRef.current = window.setTimeout(() => {
        updateIndicator();
      }, 90);
    });
  }, [updateIndicator]);

  const getTabRef = useCallback(
    (tabKey) => (element) => {
      const normalizedKey = String(tabKey);

      if (element) {
        tabElementsRef.current.set(normalizedKey, element);
      } else {
        tabElementsRef.current.delete(normalizedKey);
      }

      if (normalizedKey === String(activeTab) && element) {
        scheduleUpdate();
      }
    },
    [activeTab, scheduleUpdate]
  );

  useLayoutEffect(() => {
    scheduleUpdate();

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [scheduleUpdate]);

  useEffect(() => {
    scheduleUpdate();

    const handleResize = () => scheduleUpdate();
    const handleWindowLoad = () => scheduleUpdate();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleWindowLoad);

    const container = tabListRef.current;
    let resizeObserver;

    if (typeof ResizeObserver !== "undefined" && container) {
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdate();
      });

      resizeObserver.observe(container);
      tabElementsRef.current.forEach((element) => {
        if (element?.isConnected) {
          resizeObserver.observe(element);
        }
      });
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        scheduleUpdate();
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleWindowLoad);
      resizeObserver?.disconnect();
    };
  }, [activeTab, scheduleUpdate]);

  return { getTabRef, tabListRef, underlineStyle };
}

export default useTabIndicator;
