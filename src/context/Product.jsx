import { createContext, useContext, useState } from "react";
import products from "../data/allProducts";

const ProductContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useProduct = () => useContext(ProductContext);

const ProductProvider = ({ children }) => {
  // -----------------------------
  // Pagination Logic
  // -----------------------------
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => setCurrentPage(page);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const prevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  // -----------------------------

  const value = {
    products,

    currentPage,
    setCurrentPage,

    totalPages,

    paginatedProducts,

    goToPage,
    nextPage,
    prevPage,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };