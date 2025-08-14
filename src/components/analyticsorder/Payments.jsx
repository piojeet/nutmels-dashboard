import React from 'react'
import { FaEye, FaTrash } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'

function Payments({ filteredOrders, checkedItems, allCheckList, setAllCheckList, handleCheckboxChange, handleView, handleDelete }) {


    return (
        <div className='h-[261px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color'>
            <table className='w-full'>
                <thead className='text-white-color bg-white-color/10 rounded-t-md text-sm font-proxima-r'>
                    <tr>
                        <th>
                            <span className='px-2 py-2 inline-block'>
                                <label className="flex items-center gap-2 cursor-pointer select-none">
                                    <input type="checkbox" checked={allCheckList} onChange={() => setAllCheckList(!allCheckList)} className="hidden" />
                                    <span className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${allCheckList ? 'border-yellow-color' : ''}`}>
                                        <GiCheckMark className={`${allCheckList ? 'block' : 'hidden'} text-yellow-color text-[10px]`} />
                                    </span>
                                </label>
                            </span>
                        </th>
                        <th><span className='px-2 py-2 inline-block'>Order ID</span></th>
                        <th><span className='px-2 py-2 inline-block'>Date</span></th>
                        <th><span className='px-2 py-2 inline-block'>Product</span></th>
                        <th><span className='px-2 py-2 inline-block'>Amount</span></th>
                        <th><span className='px-2 py-2 inline-block'>Status</span></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.length === 0 && (
                        <tr><td colSpan={7} className='text-center text-white-color/50 py-4 font-proxima-r'>No matching orders</td></tr>
                    )}

                    {filteredOrders.map(order => (
                        <tr key={order.id} className='px-4 py-3 text-white-color border-b border-white/10 text-sm'>
                            <td className='text-center'>
                                <span className='px-2 py-2 inline-block'>
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" checked={!!checkedItems[order.id]} onChange={() => handleCheckboxChange(order.id)} className="hidden" />
                                        <span className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${checkedItems[order.id] ? 'border-yellow-color' : ''}`}>
                                            <GiCheckMark className={`${checkedItems[order.id] ? 'block' : 'hidden'} text-yellow-color text-[10px]`} />
                                        </span>
                                    </label>
                                </span>
                            </td>
                            <td className='text-center'><span className='px-2 py-2 inline-block font-proxima-r'>{order.orderId}</span></td>
                            <td className='text-center'><span className='px-2 py-2 inline-block font-proxima-r'>{order.date}</span></td>
                            <td className='text-center'><span className='px-2 py-2 inline-block font-proxima-r'>{order.product}</span></td>
                            <td className='text-center'><span className='px-2 py-2 inline-block font-proxima-r'>{order.amount}</span></td>
                            <td className='text-center'>
                                <span className='px-2 py-3 inline-block font-proxima-r'>
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-medium ${order.status === 'CONFIRMED' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                                        {order.status}
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span className='flex items-center gap-4 px-2 py-2'>
                                    <button onClick={() => handleView(order)}><FaEye className='cursor-pointer opacity-70 hover:opacity-100 transition' /></button>
                                    <button onClick={() => handleDelete(order.id)}><FaTrash className='cursor-pointer opacity-70 hover:opacity-100 transition' /></button>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Payments