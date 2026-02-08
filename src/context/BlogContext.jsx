import { createContext, useContext, useEffect, useRef, useState } from 'react';
import products from '../data/allProducts';

const BlogContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBlog = () => useContext(BlogContext);

const BlogProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('basic');

  const tabRefs = useRef([]);

  // Handle tab underline animation
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  useEffect(() => {
    const current = tabRefs.current?.find((el) => el?.innerText === selectedTab);
    if (current) {
      setUnderlineStyle({ left: current.offsetLeft, width: current.offsetWidth });
    }
  }, [selectedTab]);

  // -----------------------------
  // Pagination Logic
  // -----------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // ek page me kitne products dikhane hain

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => setCurrentPage(page);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const value = {
    // Tabs
    setSelectedTab,
    selectedTab,
    underlineStyle,
    tabRefs,

    // Pagination
    products,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedProducts,
    goToPage,
    nextPage,
    prevPage,
  };
    return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

export { BlogProvider };