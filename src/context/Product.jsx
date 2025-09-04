const ProductContext = createContext();
import { createContext, useContext, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState('Customer Profile');

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
        underlineStyle,
        tabRefs,
    }
    return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export { ProductProvider };