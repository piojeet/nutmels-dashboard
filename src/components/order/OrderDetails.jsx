import React from 'react';
import { BsFillCreditCardFill } from 'react-icons/bs';
import { FaCalendarAlt } from 'react-icons/fa';
import { IoClose, IoPencil } from 'react-icons/io5';
import { RiTruckFill } from "react-icons/ri";

const OrderDetails = ({ order, onClose }) => {
  if (!order) return null;

  const items = order.items || [];

  const subtotal = items.reduce((acc, item) => {
    const unitPrice = parseFloat(item.UnitPrice || 0);
    const discount = parseFloat(item.discount || 0);
    const qty = parseFloat(item.qty || 1);
    const tax = parseFloat(item.tax || 0);
    return acc + ((unitPrice - discount) * qty + tax);
  }, 0);

  const shipping = parseFloat(order.shippingCost || 0);
  const grandTotal = subtotal  + shipping;



  return (
    <div className="fixed inset-0 bg-white-color/5 backdrop-blur-sm flex justify-end z-50">
      <div className="bg-[#3C325C] max-w-[900px] w-full p-6 rounded-xl shadow-xl relative text-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-black-color hover:opacity-80 bg-white-color p-1 rounded-full cursor-pointer"
        >
          <IoClose />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-inter-b mb-4 text-white-color">Order ID: {order.orderId}</h2>

        {/* Preogress bar */}
        <div className='flex items-center'>
          <div className='px-2 h-fit flex items-center justify-center'><span className='bg-yellow-color size-6 rounded-full inline-block'></span></div>
          <div className='w-full bg-yellow-color h-px'></div>
          <div className='px-2 h-fit flex items-center justify-center'><span className='bg-yellow-color size-6 rounded-full inline-block'></span></div>
          <div className='w-full bg-yellow-color h-px'></div>
          <div className='px-2 h-fit flex items-center justify-center'><span className='bg-yellow-color size-6 rounded-full inline-block'></span></div>
          <div className='w-full bg-yellow-color h-px'></div>
          <div className='px-2 h-fit flex items-center justify-center'><span className='bg-yellow-color size-6 rounded-full inline-block'></span></div>
          <div className='w-full bg-yellow-color h-px'></div>
          <div className='px-2 h-fit flex items-center justify-center'><span className='bg-yellow-color size-6 rounded-full inline-block'></span></div>
        </div>

        <div className='lg:grid lg:grid-cols-2 flex flex-col gap-4 mt-8'>
          <div className='bg-white-color/5 border border-white-color/20 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='text-lg font-inter-s text-white-color'>Order</div>
                <div className={`px-2 py-1 rounded-md text-[10px] font-inter-m w-fit ${order.status === 'Delivered' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>{order.status}</div>
              </div>
              <div><IoPencil className='cursor-pointer text-white-color opacity-70 hover:opacity-100 transition' /></div>
            </div>

            <div className='space-y-2 mt-1.5'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <div className='bg-white-color/5 border border-white-color/20 rounded-lg size-10 flex items-center justify-center text-white-color'><FaCalendarAlt /></div>
                  <div className='text-sm font-inter-m text-white-color'>Added</div>
                </div>
                <div className='text-sm text-white-color/60 font-inter-m'>{order.date}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <div className='bg-white-color/5 border border-white-color/20 rounded-lg size-10 flex items-center justify-center text-white-color'><BsFillCreditCardFill /></div>
                  <div className='text-sm font-inter-m text-white-color'>Payment Method</div>
                </div>
                <div className='text-sm text-white-color/60 font-inter-m'>{order.payMehod}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <div className='bg-white-color/5 border border-white-color/20 rounded-lg size-10 flex items-center justify-center text-white-color'><RiTruckFill /></div>
                  <div className='text-sm font-inter-m text-white-color'>Shipping Method</div>
                </div>
                <div className='text-sm text-white-color/60 font-inter-m'>{order.shippingMethod}</div>
              </div>
            </div>
          </div>

          <div className='bg-white-color/5 border border-white-color/20 rounded-lg p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='text-lg font-inter-s text-white-color'>Order</div>
                <div className={`px-2 py-1 rounded-md text-[10px] font-inter-m w-fit ${order.status === 'Delivered' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>{order.status}</div>
              </div>
              <div><IoPencil className='cursor-pointer text-white-color opacity-70 hover:opacity-100 transition' /></div>
            </div>

            <div className='space-y-2 mt-1.5'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <div className='bg-white-color/5 border border-white-color/20 rounded-lg size-10 flex items-center justify-center text-white-color'><FaCalendarAlt /></div>
                  <div className='text-sm font-inter-m text-white-color'>Added</div>
                </div>
                <div className='text-sm text-white-color/60 font-inter-m'>{order.added}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <div className='bg-white-color/5 border border-white-color/20 rounded-lg size-10 flex items-center justify-center text-white-color'><BsFillCreditCardFill /></div>
                  <div className='text-sm font-inter-m text-white-color'>Payment Method</div>
                </div>
                <div className='text-sm text-white-color/60 font-inter-m'>{order.payMehod}</div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <div className='bg-white-color/5 border border-white-color/20 rounded-lg size-10 flex items-center justify-center text-white-color'><RiTruckFill /></div>
                  <div className='text-sm font-inter-m text-white-color'>Shipping Method</div>
                </div>
                <div className='text-sm text-white-color/60 font-inter-m'>{order.shingMethod}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className='mt-4'>
          <div className='flex items-center justify-between bg-white-color/10 px-6 py-4 border-t border-white-color/10 rounded-tl-xl rounded-tr-xl'>
            <div className='flex items-center gap-2'>
              <span className='text-lg text-white-color font-inter-s'>Order List</span>
              <span className='text-sm font-inter-s text-[#1A9882] bg-[#E9FAF7] py-1 px-2.5 rounded-lg'>2+ Orders</span>
            </div>
            <div className='py-2.5 px-3.5 rounded-lg bg-yellow-color text-white-color w-fit'>Invoice</div>
          </div>

          <div>
            <table className='w-full'>
              <thead>
                <tr className=''>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block rounded-bl-lg border-b border-white-color/15 bg-white-color/[6%] w-full'>Product</span></th>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block border-b border-white-color/15 bg-white-color/[6%] w-full'>Size</span></th>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block border-b border-white-color/15 bg-white-color/[6%] w-full'>Qty.</span></th>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block border-b border-white-color/15 bg-white-color/[6%] w-full'>Unit Price</span></th>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block border-b border-white-color/15 bg-white-color/[6%] w-full'>Discount</span></th>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block border-b border-white-color/15 bg-white-color/[6%] w-full'>Amount</span></th>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block border-b border-white-color/15 bg-white-color/[6%] w-full'>Tax</span></th>
                  <th><span className='text-sm text-white-color font-inter-m py-4 px-5 inline-block rounded-br-lg border-b border-white-color/15 bg-white-color/[6%] w-full'>Total</span></th>
                </tr>
              </thead>

              <tbody>
                {order?.items?.length > 0 ? (
                  order.items.map((item, i) => (
                    <tr key={i} className='border-b border-white-color/15'>
                      <td><span className='font-inter-m text-white-color text-sm px-5 inline-block'>{item.product}</span></td>
                      <td className='text-center'><span className='text-yellow-color font-inter-s text-sm py-4 px-5 inline-block'>{item.size}</span></td>
                      <td className='text-center'><span className='text-white-color/60 font-inter-m text-sm py-4 px-5 inline-block'>{item.qty}</span></td>
                      <td className='text-center'><span className='text-white-color/60 font-inter-m text-sm py-4 px-5 inline-block'>
                        ₹{parseFloat(item.UnitPrice || "0").toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span></td>
                      <td className='text-center'>
                        <span className='text-white-color/60 font-inter-m text-sm py-4 px-5 inline-block'>
                          -₹{parseFloat(item.discount || "0").toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='text-white-color/60 font-inter-m text-sm py-4 px-5 inline-block'>
                          ₹{((parseFloat(item.UnitPrice || "0") - parseFloat(item.discount || "0")) * parseInt(item.qty || "1"))
                            .toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>

                      <td className='text-center'>
                        <span className='text-white-color/60 font-inter-m text-sm py-4 px-5 inline-block'>
                          ₹{parseFloat(item.tax || "0").toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                      </td>
                      <td className='text-center'>
                        <span className='text-white-color/60 font-inter-m text-sm py-4 px-5 inline-block'>
                          ₹{((parseFloat(item.UnitPrice || "0") - parseFloat(item.discount || "0")) * parseInt(item.qty || "1") + parseInt(item.tax || "0"))
                            .toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No items available</td>
                  </tr>
                )}

                <tr className='border-b border-white-color/15'>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='text-center'><span className='text-white-color font-inter-m text-sm py-4 px-5 inline-block'>Subtotal</span></td>
                  <td></td>
                  <td className='text-center'><span className='text-white-color font-inter-m text-sm py-4 px-5 inline-block'>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span></td>
                </tr>

                <tr className='border-b border-white-color/15'>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='text-center'><span className='text-white-color font-inter-m text-sm py-4 px-5 inline-block'>Shipping</span></td>
                  <td></td>
                  <td className='text-center'><span className='text-white-color font-inter-m text-sm py-4 px-5 inline-block'>₹{shipping.toFixed(2)}</span></td>
                </tr>

                <tr className='border-b border-white-color/15'>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='text-center'><span className='text-yellow-color font-inter-m text-sm py-4 px-5 inline-block'>Total</span></td>
                  <td></td>
                  <td className='text-center'><span className='text-yellow-color font-inter-m text-sm py-4 px-5 inline-block'>₹{grandTotal.toFixed(2)}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div >
    </div >
  );
};

export default OrderDetails;
