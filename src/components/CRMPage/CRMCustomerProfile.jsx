import React, { useEffect, useState } from "react";
import { BsChat, BsDownload } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import {
  FaCalendarAlt,
  FaCaretLeft,
  FaCaretRight,
  FaSlidersH,
} from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import "react-datepicker/dist/react-datepicker.css";
import { GiCheckMark } from "react-icons/gi";
import { IoEyeSharp, IoPencil } from "react-icons/io5";
import { VscPackage } from "react-icons/vsc";
import OrderDetails from "../order/OrderDetails";
import { useCRM } from "../../context/CRMContext";
import Funnel from "./Funnel";
import SupportsCampaign from "./SupportsCampaign";
import RatingReview from "./RatingReview";

const statuses = [
  "Customer Profile",
  "Funnel",
  "Supports & Campaign",
  "Rating & Review",
];

function CRMCustomerProfile() {
  const {
    selectedTab,
    setSelectedTab,
    underlineStyle,
    getTabRef,
    tabListRef,
    filteredOrders,
    searchQuery,
    setSearchQuery,
    handleEdit,
    handleView,
    isViewing,
    currentOrder,
    setIsViewing,
    setCurrentPage,
    currentPage,
    totalPages,
    currentOrders,
  } = useCRM();

  // Local state for checkboxes
  const [checkedItems, setCheckedItems] = useState({});
  const [allCheckList, setAllCheckList] = useState(false);

  // Update allCheckList when individual checkboxes change
  useEffect(() => {
    const allChecked =
      filteredOrders.length > 0 &&
      filteredOrders.every((order) => checkedItems[order.id]);
    setAllCheckList(allChecked);
  }, [checkedItems, filteredOrders]);

  // Handle single checkbox toggle
  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle "select all" toggle
  const handleAllCheckboxChange = (isChecked) => {
    const updatedChecked = {};
    filteredOrders.forEach((order) => {
      updatedChecked[order.id] = isChecked;
    });
    setCheckedItems(updatedChecked);
    setAllCheckList(isChecked);
  };
  return (
    <div className="text-white-color">
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="text-xl font-inter-b">Order</div>
        <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[260px] bg-white-color/5 border border-white-color/20 px-3 py-2.5 pl-10 rounded-lg text-sm outline-none"
            />
            <CgSearch className="size-6 text-white-color absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button className="flex items-center gap-1 px-3.5 py-2.5 bg-yellow-color text-white-color text-sm font-inter-s rounded-lg">
            <LuPlus className="size-4" />
            Add Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        {/* Status Filters */}
        <div ref={tabListRef} className="relative w-fit h-fit">
          <div className="flex overflow-x-auto pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {statuses.map((status) => (
              <button
                key={status}
                ref={getTabRef(status)}
                data-tab-key={status}
                onClick={() => setSelectedTab(status)}
                className={`relative font-inter-r text-sm transition-all pb-2 px-2.5 ${
                  selectedTab === status
                    ? "text-yellow-color font-medium"
                    : "text-white-color/50 hover:text-yellow-color"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              opacity: underlineStyle.opacity,
            }}
          />
        </div>
      </div>

      {selectedTab === "Customer Profile" && (
        <>
          {/* table  */}
          <div className="mt-4 max-h-[600px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color">
            <table className="w-full min-w-[960px]">
              <thead className="text-white-color bg-white-color/10 rounded-t-md text-sm font-proxima-r">
                <tr>
                  <th>
                    <span className="px-2 py-2 flex items-center w-fit mx-auto">
                      <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={allCheckList}
                          onChange={(e) =>
                            handleAllCheckboxChange(e.target.checked)
                          }
                          className="hidden"
                        />
                        <span
                          className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${
                            allCheckList ? "border-yellow-color" : ""
                          }`}
                        >
                          <GiCheckMark
                            className={`${
                              allCheckList ? "block" : "hidden"
                            } text-yellow-color text-[10px]`}
                          />
                        </span>
                      </label>
                      <span className="px-2 py-2 inline-block">Order ID</span>
                    </span>
                  </th>
                  <th>
                    <span className="px-2 py-2 inline-block">
                      Customer Name
                    </span>
                  </th>
                  <th>
                    <span className="px-2 py-2 inline-block">Phone Number</span>
                  </th>
                  <th>
                    <span className="px-2 py-2 inline-block">Email Id</span>
                  </th>
                  <th>
                    <span className="px-2 py-2 inline-block">
                      Date of Birth
                    </span>
                  </th>
                  <th>
                    <span className="px-2 py-2 inline-block">Patronage</span>
                  </th>
                  <th>
                    <span className="px-2 py-2 inline-block">Action</span>
                  </th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {currentOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-white-color/50 py-4 font-proxima-r"
                    >
                      No matching orders
                    </td>
                  </tr>
                )}

                {currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="px-4 py-3 text-white-color border-b border-white/10 text-sm"
                  >
                    <td className="text-center">
                      <span className="px-2 py-2 flex w-fit mx-auto items-center">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={!!checkedItems[order.id]}
                            onChange={() => handleCheckboxChange(order.id)}
                            className="hidden"
                          />
                          <span
                            className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${
                              checkedItems[order.id]
                                ? "border-yellow-color"
                                : ""
                            }`}
                          >
                            <GiCheckMark
                              className={`${
                                checkedItems[order.id] ? "block" : "hidden"
                              } text-yellow-color text-[10px]`}
                            />
                          </span>
                        </label>
                        <span className="px-2 py-2 inline-block font-proxima-r">
                          {order.customerId}
                        </span>
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-2 inline-block font-proxima-r">
                        {order.customerName}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-2 inline-block font-proxima-r">
                        +91 {order.phoneNum}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-2 inline-block font-proxima-r">
                        {order.emailId}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-2 inline-block font-proxima-r">
                        {order.dateBirth}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="px-2 py-3 inline-block font-proxima-r">
                        <span
                          className={`px-2 py-1 rounded-md text-[10px] font-medium font-inter-m ${
                            order.patronage === "First Timer"
                              ? "bg-green-200 text-green-700"
                              : "bg-red-200 text-red-700"
                          }`}
                        >
                          {order.patronage}
                        </span>
                      </span>
                    </td>
                    <td>
                      <span className="flex items-center justify-center gap-4 px-2 py-2">
                        <button onClick={() => handleEdit(order.id)}>
                          <IoPencil className="cursor-pointer opacity-70 hover:opacity-100 transition" />
                        </button>
                        <button onClick={() => handleView(order)}>
                          <IoEyeSharp className="cursor-pointer opacity-70 hover:opacity-100 transition" />
                        </button>
                        <button>
                          <BsChat className="cursor-pointer opacity-70 hover:opacity-100 transition" />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center mt-8">
            {/* Pagination Buttons */}
            <div className="flex gap-2 items-center">
              {/* Prev */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="size-[32px] bg-white-color/10 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar disabled:opacity-30"
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
                    onClick={() => setCurrentPage(page)}
                    className={`size-[32px] ${
                      currentPage === page
                        ? "bg-yellow-color text-white-color"
                        : "bg-white-color/10 text-white-color/50"
                    } backdrop-blur-xl flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar font-inter-s`}
                  >
                    {page}
                  </button>
                ))}

              {/* Dots and last page (if many pages) */}
              {totalPages > 5 && (
                <>
                  <button className="size-[32px] bg-white-color/10 text-white-color/50 flex items-center justify-center rounded-xl shadow-side-bar">
                    ...
                  </button>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`size-[32px] ${
                      currentPage === totalPages
                        ? "bg-yellow-color text-black"
                        : "bg-white-color/10 text-white-color/50"
                    } backdrop-blur-xl flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar`}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              {/* Next */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="size-[32px] bg-white-color/10 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar disabled:opacity-30"
                disabled={currentPage === totalPages}
              >
                <FaCaretRight />
              </button>
            </div>
          </div>
        </>
      )}

      {isViewing && currentOrder && (
        <OrderDetails
          order={currentOrder}
          onClose={() => setIsViewing(false)}
        />
      )}

      <div className="mt-4">
        {selectedTab === "Funnel" && <Funnel />}
        {selectedTab === "Supports & Campaign" && <SupportsCampaign />}
        {selectedTab === "Rating & Review" && <RatingReview />}
      </div>
    </div>
  );
}

export default CRMCustomerProfile;







