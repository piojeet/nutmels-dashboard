import { createContext, useContext, useState } from 'react';
import products from '../data/allProducts';
import useTabIndicator from '../hooks/useTabIndicator';

const BlogContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useBlog = () => useContext(BlogContext);

const BlogProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('basic');
  const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(selectedTab);

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
    getTabRef,
    tabListRef,

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



