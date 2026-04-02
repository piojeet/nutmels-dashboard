import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useCRM } from "../../context/CRMContext";
import { GiCheckMark } from "react-icons/gi";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function RatingReview() {
  const { currentOrders, filteredOrders, handleDelete, totalPages, currentPage, setCurrentPage } = useCRM();

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
    <div>
      <div className="max-h-[600px] overflow-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color">
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
                      className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${allCheckList ? "border-yellow-color" : ""
                        }`}
                    >
                      <GiCheckMark
                        className={`${allCheckList ? "block" : "hidden"
                          } text-yellow-color text-[10px]`}
                      />
                    </span>
                  </label>
                  <span className="px-2 py-2 inline-block">Checkbox</span>
                </span>
              </th>
              <th>Date</th>
              <th>Customer</th>
              <th>Rating</th>
              <th>Review Feedback</th>
              <th>Media Files</th>
              <th>Action</th>
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
                        className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${checkedItems[order.id] ? "border-yellow-color" : ""
                          }`}
                      >
                        <GiCheckMark
                          className={`${checkedItems[order.id] ? "block" : "hidden"
                            } text-yellow-color text-[10px]`}
                        />
                      </span>
                    </label>
                    <span className="px-2 py-2 inline-block font-proxima-r">
                      {order.customerId}
                    </span>
                  </span>
                </td>
                <td className="text-center">{order.date}</td>
                <td className="text-center">{order.customerName}</td>
                <td className="text-center text-xl">
                  <span className="flex items-center justify-center gap-1">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < order.rating ? (
                        <IoMdHeart key={i} className="text-[#FAAA21]" />
                      ) : (
                        <IoIosHeartEmpty key={i} className="text-white/30" />
                      )
                    )}
                  </span>
                </td>
                <td className="text-start">
                  <span className="max-w-[300px] w-full m-auto inline-block">{order.reviewFeedback}</span>
                </td>
                <td className="text-center">
                  <span className="flex gap-2 justify-center">
                    {order.mediaFiles.slice(0, 2).map((file, index) => (
                      <span
                        className="inline-flex border-2 border-white size-10 rounded-lg overflow-hidden relative"
                        key={index}
                      >
                        <img
                          src={file}
                          alt={`Media ${index + 1}`}
                          className="inline-block size-full object-cover"
                        />
                        {index === 1 && order.mediaFiles.length > 2 && (
                          <span className="absolute top-0 left-0 size-full z-50 bg-[#372B56AB] flex items-center justify-center font-inter-m text-sm text-white">
                            {order.mediaFiles.length}+
                          </span>
                        )}
                      </span>
                    ))}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                  >
                    <RiDeleteBin5Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-center justify-center">
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
    </div>
  );
}

export default RatingReview;

