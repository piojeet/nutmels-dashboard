import React from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { GiCheckMark } from 'react-icons/gi';

function Payments({ filteredOrders, checkedItems, allCheckList, setAllCheckList, handleCheckboxChange, handleView, handleDelete }) {
  return (
    <div className='h-[200px] overflow-auto [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar]:w-1'>
      <table className='min-w-[760px] w-full'>
        <thead className='rounded-t-md bg-white-color/10 text-sm font-proxima-r text-white-color'>
          <tr>
            <th>
              <span className='inline-block px-2 py-2'>
                <label className='flex items-center gap-2 cursor-pointer select-none'>
                  <input type='checkbox' checked={allCheckList} onChange={() => setAllCheckList(!allCheckList)} className='hidden' />
                  <span className={`flex size-4 items-center justify-center rounded-xs border border-white-color/30 ${allCheckList ? 'border-yellow-color' : ''}`}>
                    <GiCheckMark className={`${allCheckList ? 'block' : 'hidden'} text-[10px] text-yellow-color`} />
                  </span>
                </label>
              </span>
            </th>
            <th><span className='inline-block px-2 py-2'>Order ID</span></th>
            <th><span className='inline-block px-2 py-2'>Date</span></th>
            <th><span className='inline-block px-2 py-2'>Product</span></th>
            <th><span className='inline-block px-2 py-2'>Amount</span></th>
            <th><span className='inline-block px-2 py-2'>Status</span></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length === 0 && (
            <tr><td colSpan={7} className='py-4 text-center font-proxima-r text-white-color/50'>No matching orders</td></tr>
          )}

          {filteredOrders.map((order) => (
            <tr key={order.id} className='border-b border-white/10 px-4 py-3 text-sm text-white-color'>
              <td className='text-center'>
                <span className='inline-block px-2 py-2'>
                  <label className='flex items-center gap-2 cursor-pointer select-none'>
                    <input type='checkbox' checked={!!checkedItems[order.id]} onChange={() => handleCheckboxChange(order.id)} className='hidden' />
                    <span className={`flex size-4 items-center justify-center rounded-xs border border-white-color/30 ${checkedItems[order.id] ? 'border-yellow-color' : ''}`}>
                      <GiCheckMark className={`${checkedItems[order.id] ? 'block' : 'hidden'} text-[10px] text-yellow-color`} />
                    </span>
                  </label>
                </span>
              </td>
              <td className='text-center'><span className='inline-block px-2 py-2 font-proxima-r'>{order.orderId}</span></td>
              <td className='text-center'><span className='inline-block px-2 py-2 font-proxima-r'>{order.date}</span></td>
              <td className='text-center'><span className='inline-block px-2 py-2 font-proxima-r'>{order.product}</span></td>
              <td className='text-center'><span className='inline-block px-2 py-2 font-proxima-r'>{order.amount}</span></td>
              <td className='text-center'>
                <span className='inline-block px-2 py-3 font-proxima-r'>
                  <span className={`rounded-md px-2 py-1 text-[10px] font-medium ${order.status === 'CONFIRMED' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                    {order.status}
                  </span>
                </span>
              </td>
              <td>
                <span className='flex items-center gap-4 px-2 py-2 justify-center'>
                  <button onClick={() => handleView(order)}><FaEye className='cursor-pointer opacity-70 transition hover:opacity-100' /></button>
                  <button onClick={() => handleDelete(order.id)}><FaTrash className='cursor-pointer opacity-70 transition hover:opacity-100' /></button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Payments;
