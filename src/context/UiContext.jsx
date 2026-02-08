import { createContext, useContext, useEffect, useRef, useState } from 'react';

const UiSeoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components 
export const useUiSeo = () => useContext(UiSeoContext);

const UiSeoProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState('Home');

    const tabRefs = useRef([]);

    // Handle tab underline animation
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    useEffect(() => {
      const current = tabRefs.current?.find((el) => el?.innerText === selectedTab);
      if (current) {
        setUnderlineStyle({ left: current.offsetLeft, width: current.offsetWidth });
      }
    }, [selectedTab]);

    const value = {
        setSelectedTab,
        selectedTab,
        underlineStyle,
        tabRefs,
    }
    return <UiSeoContext.Provider value={value}>{children}</UiSeoContext.Provider>;
}

export { UiSeoProvider };