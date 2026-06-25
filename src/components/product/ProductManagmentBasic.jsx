import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";
import { LuPlus } from "react-icons/lu";
import { useProduct } from "../../context/Product";
import ProductBasic from "./ProductBasic";
import ProductMedia from "./ProductMedia";
import ProductBrief from "./ProductBrief";
import ProductNutritional from "./ProductNutritional";
import ProductInventory from "./ProductInventory";
import ProductShipping from "./ProductShipping";
import ProductSeo from "./ProductSeo";
import AddBulk from "./AddBulk";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { showAppToast } from "../../utils/appToast";
import useTabs from "../../hooks/useTabs";

function ProductManagmentBasic() {
  const notify = (detail, severity = "info") => {
    showAppToast({
      severity,
      summary: "Products",
      detail,
    });
  };

  const filterBtn = [
    "All Products (56)",
    "nuts",
    "seeds",
    "millets",
    "superfoods",
    "dried fruits",
    "nosh on",
    "energy bar",
    "spreads",
    "ethnic beverages",
    "gifts hampers",
  ];

  const statuses = [
    "basic",
    "media",
    "brief",
    "nutritional info",
    "inventory",
    "shipping",
    "seo",
  ];

  const {
    paginatedProducts,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = useProduct();

  const {
    selectedTab,
    setSelectedTab,
    getTabRef,
    tabListRef,
    underlineStyle,
  } = useTabs("basic");

  // State to track active filter
  const [activeFilter, setActiveFilter] = useState(filterBtn[0]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between pt-6">
        <div className="text-xl font-inter-b text-white-color">
          Product Management
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full sm:w-[260px] bg-white-color/5 border border-white-color/20 px-3 py-2.5 pl-10 rounded-lg text-sm outline-none text-white-color"
            />
            <CgSearch className="size-6 text-white-color absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex items-center gap-1 px-3.5 py-2.5 text-white-color text-sm font-inter-s rounded-lg bg-white-color/5 border border-white-color/20 cursor-pointer"
          >
            Add Bulk Product
          </button>
          <button
            onClick={() => notify("Add new product form opened.")}
            className="flex items-center gap-1 px-3.5 py-2.5 bg-yellow-color text-white-color text-sm font-inter-s rounded-lg cursor-pointer"
          >
            <LuPlus className="size-4" />
            Add New Product
          </button>
        </div>
      </div>

      {isOpen && (
        <AddBulk
          onClose={() => {
            setIsOpen(false);
          }}
        />
      )}

      <div className="mt-8 xl:grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px] 2xl:grid-cols-[1fr_500px]">
        <div className="flex flex-col xl:border-r xl:border-white-color/30 xl:pr-3">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-xl text-yellow-color">
              peanuts - roasted & salted &#8226; 200g
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => notify("Product changes updated.", "success")}
                className="flex items-center gap-1 px-4 py-1.5 text-white-color text-sm font-inter-s rounded-lg bg-white-color/5 border border-white-color/20 cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={() =>
                  notify("Unsaved product changes discarded.", "warn")
                }
                className="flex items-center gap-1 px-4.5 py-1.5 text-white-color text-sm font-inter-s rounded-lg border border-white-color/20 cursor-pointer bg-[#FE4949]"
              >
                Discard
              </button>
            </div>
          </div>

          <div className="mt-4 min-w-0">
            <div
              ref={tabListRef}
              className="relative flex min-w-0 gap-2 overflow-x-auto border-b border-white-color/30 pb-2 thumb-none"
            >
              {statuses.map((status) => (
                <button
                  key={status}
                  ref={getTabRef(status)}
                  data-tab-key={status}
                  onClick={() => setSelectedTab(status)}
                  className={`relative shrink-0 px-2.5 pb-2 font-inter-r text-sm transition ${
                    selectedTab === status
                      ? "text-yellow-color font-medium"
                      : "text-white-color/50 hover:text-yellow-color"
                  }`}
                >
                  <span className="whitespace-nowrap">{status}</span>
                </button>
              ))}

              <div
                className="pointer-events-none absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out"
                style={{
                  left: underlineStyle.left,
                  width: underlineStyle.width,
                  opacity: underlineStyle.opacity,
                }}
              />
            </div>
          </div>

          <div className="mt-4 h-full">
            {selectedTab === "basic" && <ProductBasic />}
            {selectedTab === "media" && <ProductMedia />}
            {selectedTab === "brief" && <ProductBrief />}
            {selectedTab === "nutritional info" && <ProductNutritional />}
            {selectedTab === "inventory" && <ProductInventory />}
            {selectedTab === "shipping" && <ProductShipping />}
            {selectedTab === "seo" && <ProductSeo />}
          </div>
        </div>
        <div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {filterBtn.map((btn) => (
              <button
                key={btn}
                className={
                  `border-b-2 px-2 pb-1 transition-colors duration-150 cursor-pointer ` +
                  (activeFilter === btn
                    ? "text-white-color border-white-color"
                    : "text-white-color/30 border-transparent hover:text-white-color/70 hover:border-white-color/40")
                }
                onClick={() => {
                  setActiveFilter(btn);
                }}
                // style={{ fontWeight: activeFilter === btn ? 600 : 400 }}
              >
                {btn}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {paginatedProducts.map((item) => (
                <div
                  key={item}
                  className="bg-white-color/5 border border-white-color/20 rounded-xl"
                >
                  <div className="flex items-center justify-center">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="p-2">
                    <div className="font-inter-m text-white-color/60 text-xs">
                      {item.name}
                    </div>
                    <div className="font-inter-m text-white-color/60 text-xs">
                      {item.weight}
                    </div>
                    <div className="text-white-color font-inter-b text-xs">
                      â‚¹{item.price}
                    </div>

                    <div className="flex justify-between pt-2 mt-2 border-t border-white-color/10 text-xs">
                      <div className="font-inter-r text-white-color/60">
                        {" "}
                        <span>Stock:</span>
                        <span className="font-inter-r text-white-color">
                          {item.stock}
                        </span>
                      </div>
                      <div className="font-inter-r text-white-color/60">
                        {" "}
                        <span>Sold:</span>
                        <span className="font-inter-r text-white-color">
                          {item.sold}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Buttons */}
            <div className="flex gap-2 items-center justify-center mt-8">
              {/* Prev */}
              <button
                onClick={() => {
                  prevPage();
                }}
                className="size-[32px] bg-white-color/10 text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer disabled:opacity-30"
                disabled={currentPage === 1}
              >
                <FaCaretLeft />
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(0, 5)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      goToPage(page);
                    }}
                    className={`size-[32px] ${
                      currentPage === page
                        ? "bg-yellow-color text-black-color"
                        : "bg-white-color/10 text-white-color"
                    } flex items-center justify-center rounded-xl cursor-pointer font-inter-s`}
                  >
                    {page}
                  </button>
                ))}

              {totalPages > 5 && (
                <>
                  <button className="size-[32px] bg-white-color/10 text-white-color flex items-center justify-center rounded-xl">
                    ...
                  </button>
                  <button
                    onClick={() => {
                      goToPage(totalPages);
                    }}
                    className={`size-[32px] ${
                      currentPage === totalPages
                        ? "bg-yellow-color text-black"
                        : "bg-white-color/10 text-black-color"
                    } flex items-center justify-center rounded-xl cursor-pointer`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={() => {
                  nextPage();
                }}
                className="size-[32px] bg-white-color/10 text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer disabled:opacity-30"
                disabled={currentPage === totalPages}
              >
                <FaCaretRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductManagmentBasic;
