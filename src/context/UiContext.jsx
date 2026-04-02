import { createContext, useContext, useState } from 'react';
import useTabIndicator from '../hooks/useTabIndicator';

const UiSeoContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components 
export const useUiSeo = () => useContext(UiSeoContext);

const UiSeoProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState('Home');
    const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(selectedTab);

    const value = {
        setSelectedTab,
        selectedTab,
        underlineStyle,
        getTabRef,
        tabListRef,
    }
    return <UiSeoContext.Provider value={value}>{children}</UiSeoContext.Provider>;
}

export { UiSeoProvider };



