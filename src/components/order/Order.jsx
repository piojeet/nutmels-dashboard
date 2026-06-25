import React, { useEffect } from 'react';
import { BsDownload } from 'react-icons/bs';
import { CgSearch } from 'react-icons/cg';
import { FaCalendarAlt, FaCaretLeft, FaCaretRight, FaSlidersH } from 'react-icons/fa';
import { LuPlus } from 'react-icons/lu';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GiCheckMark } from 'react-icons/gi';
import { IoEyeSharp, IoPencil } from 'react-icons/io5';
import { useOrder } from '../../context/OrderContext';
import OrderDetails from './OrderDetails';
import { VscPackage } from "react-icons/vsc";
import { showAppToast } from '../../utils/appToast';

const statuses = ['All State', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
const statusesfilter = ['All', 'Processing', 'Delivered', 'Cancelled'];


function Order() {
  const notify = (detail, severity = 'info') => {
    showAppToast({
      severity,
      summary: 'Orders',
      detail,
    });
  };

  const {
    selectedTab,
    setSelectedTab,
    underlineStyle,
    getTabRef,
    tabListRef,
    startDate,
    setStartDate,
    openCalendar,
    setOpenCalendar,
    showFilter,
    setShowFilter,
    selectedStatuses,
    toggleStatus,
    calendarRef,
    filterRef,
    filteredOrders,
    checkedItems,
    handleCheckboxChange,
    allCheckList,
    setAllCheckList,
    searchQuery,
    setSearchQuery,
    handleExport,
    handleEdit,
    handleView,
    isViewing,
    currentOrder,
    setIsViewing,
    setCheckedItems,
    totalItems,
    startItem,
    endItem,
    setCurrentPage,
    currentPage,
    totalPages,
    currentOrders
  } = useOrder();

  useEffect(() => {
    const allChecked =
      filteredOrders.length > 0 &&
      filteredOrders.every(order => checkedItems[order.id]);
    setAllCheckList(allChecked);
  }, [checkedItems, filteredOrders, setAllCheckList]);


  return (
    <div className="text-white-color pt-6">
      {/* Header */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="text-xl font-inter-b">Order</div>
        <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
          <button onClick={handleExport} className="flex items-center gap-1 px-3.5 py-2.5 bg-white-color text-black-color text-sm font-inter-s rounded-lg cursor-pointer">
            <BsDownload className="size-4" />
            Export
          </button>
          <button
            onClick={() => notify('Add order flow opened.')}
            className="flex items-center gap-1 px-3.5 py-2.5 bg-yellow-color text-white-color text-sm font-inter-s rounded-lg"
          >
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
                onClick={() => {
                  setSelectedTab(status);
                }}
                className={`relative font-inter-r text-sm transition-all pb-2 px-2.5 ${selectedTab === status
                  ? 'text-yellow-color font-medium'
                  : 'text-white-color/50 hover:text-yellow-color'
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

        {/* Search + Date + Filters */}
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

          {/* Select Date */}
          <div className="relative" ref={calendarRef}>
            <button
              onClick={() => {
                setOpenCalendar(!openCalendar);
              }}
              className="flex items-center gap-2 px-3 py-2.5 bg-white-color/5 border border-white-color/20 rounded-lg text-sm cursor-pointer"
            >
              <FaCalendarAlt className="text-white-color text-lg" />
              <span className="font-inter-r">Select Date</span>
            </button>
            {openCalendar && (
              <div className="absolute mt-2 z-10">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setOpenCalendar(false);
                  }}
                  inline
                  calendarClassName="!bg-white-color/5 !text-white-color p-2 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Filters Button */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => {
                setShowFilter(!showFilter);
              }}
              className="flex items-center gap-2 px-3 py-2.5 bg-white-color/5 border border-white-color/20 rounded-lg text-sm cursor-pointer"
            >
              <FaSlidersH className="text-white-color text-lg" />
              <span className="font-inter-r">Filters</span>
            </button>
            {showFilter && (
              <div className="absolute right-0 mt-2 w-64 bg-white-color/5 text-white-color border border-white/20 rounded-lg p-4 z-10">
                <h3 className="text-sm font-semibold mb-3 font-inter-s">Filter by Status</h3>
                <div className="flex flex-col gap-2 font-inter-r">
                  {statusesfilter.map((status, i) => {
                    const isChecked = selectedStatuses.includes(status);

                    return (
                      <label key={`filter-${status}-${i}`} className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleStatus(status)}
                          className="hidden"
                        />
                        <span
                          className={`size-4 border flex items-center justify-center rounded-xs transition-all
                ${isChecked ? 'border-yellow-color' : 'border-white-color/30'}`}
                        >
                          <GiCheckMark
                            className={`text-yellow-color text-[10px] ${isChecked ? 'block' : 'hidden'}`}
                          />
                        </span>
                        <span className={`text-sm transition-all ${isChecked ? 'text-yellow-color' : 'text-white-color/50'}`}>
                          {status}
                        </span>
                      </label>
                    );
                  })}
                </div>
                <button
                  className="mt-4 w-full bg-yellow-color hover:bg-yellow-color/90 text-white-color py-1.5 rounded-md text-sm font-inter-r"
                  onClick={() => {
                    setShowFilter(false);
                  }}
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* table  */}
      <div className='mt-4 max-h-[600px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color'>
        <table className='w-full min-w-[1100px]'>
          <thead className='text-white-color bg-white-color/10 rounded-t-md text-sm font-proxima-r'>
            <tr>
              <th>
                <span className='px-2 py-2 flex items-center w-fit mx-auto'>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={allCheckList}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setAllCheckList(isChecked);

                        const updatedCheckedItems = {};
                        filteredOrders.forEach(order => {
                          updatedCheckedItems[order.id] = isChecked;
                        });

                        setCheckedItems(updatedCheckedItems); // âœ… This will update individual checkboxes
                      }}
                      className="hidden"
                    />

                    <span className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${allCheckList ? 'border-yellow-color' : ''}`}>
                      <GiCheckMark className={`${allCheckList ? 'block' : 'hidden'} text-yellow-color text-[10px]`} />
                    </span>
                  </label>
                  <span className='px-2 py-2 inline-block'>Order ID</span>
                </span>
              </th>
              <th><span className='px-2 py-2 inline-block'>Product</span></th>
              <th><span className='px-2 py-2 inline-block'>Date</span></th>
              <th><span className='px-2 py-2 inline-block'>Customer</span></th>
              <th><span className='px-2 py-2 inline-block'>Total</span></th>
              <th><span className='px-2 py-2 inline-block'>Payment Method</span></th>
              <th><span className='px-2 py-2 inline-block'>Status</span></th>
              <th><span className='px-2 py-2 inline-block'>Action</span></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.length === 0 && (
              <tr><td colSpan={7} className='text-center text-white-color/50 py-4 font-proxima-r'>No matching orders</td></tr>
            )}

            {currentOrders.map(order => (
              <tr key={order.id} className='px-4 py-3 text-white-color border-b border-white/10 text-sm'>
                <td className='text-center'>
                  <span className='px-2 py-2 flex w-fit mx-auto items-center'>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input type="checkbox" checked={!!checkedItems[order.id]} onChange={() => handleCheckboxChange(order.id)} className="hidden" />
                      <span className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${checkedItems[order.id] ? 'border-yellow-color' : ''}`}>
                        <GiCheckMark className={`${checkedItems[order.id] ? 'block' : 'hidden'} text-yellow-color text-[10px]`} />
                      </span>
                    </label>
                    <span className='px-2 py-2 inline-block font-proxima-r'>{order.orderId}</span>
                  </span>
                </td>
                <td className='text-center'><span className='flex gap-1 w-fit mx-auto'><span className='px-2 py-2 font-proxima-r shrink-0 flex text-3xl'><VscPackage /></span> <span> <span className='px-2 inline-block font-proxima-r'>{order.items?.[0]?.product || 'â€”'}</span> <br />  <span>+{order.items?.length || 1} Products</span></span></span></td>
                <td className='text-center'><span className='px-2 py-2 inline-block font-proxima-r'>{order.date}</span></td>
                <td className='text-center'><span className='px-2 py-2 inline-block font-proxima-r'>{order.customer}</span></td>
                <td className='text-center'>
                  <span className='px-2 py-2 inline-block font-proxima-r'>
                    â‚¹{(
                      (order.items || []).reduce((acc, item) => {
                        const unitPrice = parseFloat(item.UnitPrice || "0");
                        const discount = parseFloat(item.discount || "0");
                        const tax = parseFloat(item.tax || "0");
                        const qty = parseInt(item.qty || "1", 10);

                        // âœ… Correct amount per item
                        const amount = (unitPrice - discount) * qty;
                        const total = amount + tax;

                        return acc + total;
                      }, 0) + parseFloat(order.shippingCost || 0)
                    ).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </td>
                <td className='text-center'><span className='px-2 py-2 inline-block font-proxima-r'>{order.payMehod}</span></td>
                <td className='text-center'>
                  <span className='px-2 py-3 inline-block font-proxima-r'>
                    <span className={`px-2 py-1 rounded-md text-[10px] font-medium font-inter-m ${order.status === 'Delivered' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                      {order.status}
                    </span>
                  </span>
                </td>
                <td>
                  <span className='flex items-center gap-4 px-2 py-2 justify-center'>
                    <button onClick={() => handleEdit(order.id)}><IoPencil className='cursor-pointer opacity-70 hover:opacity-100 transition' /></button>
                    <button onClick={() => handleView(order)}><IoEyeSharp className='cursor-pointer opacity-70 hover:opacity-100 transition' /></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        {/* Showing Xâ€“Y from Z */}
        <div className='text-sm font-inter-m text-white-color/30'>
          Showing <span>{startItem}-{endItem}</span> from <span>{totalItems}</span>
        </div>

        {/* Pagination Buttons */}
        <div className='flex gap-2 items-center'>
          {/* Prev */}
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }}
            className='size-[32px] bg-white-color/10 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar disabled:opacity-30'
            disabled={currentPage === 1}
          >
            <FaCaretLeft />
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((page) => (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
              }}
              className={`size-[32px] ${currentPage === page ? 'bg-yellow-color text-white-color' : 'bg-white-color/10 text-white-color/50'
                } backdrop-blur-xl flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar font-inter-s`}
            >
              {page}
            </button>
          ))}

          {/* Dots and last page (if many pages) */}
          {totalPages > 5 && (
            <>
              <button className='size-[32px] bg-white-color/10 text-white-color/50 flex items-center justify-center rounded-xl shadow-side-bar'>...</button>
              <button
                onClick={() => {
                  setCurrentPage(totalPages);
                }}
                className={`size-[32px] ${currentPage === totalPages ? 'bg-yellow-color text-black' : 'bg-white-color/10 text-white-color/50'
                  } backdrop-blur-xl flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next */}
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }}
            className='size-[32px] bg-white-color/10 backdrop-blur-xl text-white-color/50 flex items-center justify-center rounded-xl cursor-pointer shadow-side-bar disabled:opacity-30'
            disabled={currentPage === totalPages}
          >
            <FaCaretRight />
          </button>
        </div>
      </div>


      {isViewing && currentOrder && (
        <OrderDetails
          order={currentOrder}
          onClose={() => {
            setIsViewing(false);
          }}
        />
      )}


    </div>
  );
}

export default Order;







