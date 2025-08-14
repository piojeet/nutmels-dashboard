import React, { useEffect, useRef, useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import { FaEye, FaTrash } from 'react-icons/fa';

function OrderList() {
    const [confirmed, setConfirmed] = useState(false);
    const [cancelled, setCancelled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([
        { id: 1, orderId: '#707263', date: 'Mar 25, 2025', product: 'Almond +3', amount: '₹1,680.00', status: 'CONFIRMED' },
        { id: 2, orderId: '#707264', date: 'Mar 28, 2025', product: 'Flax +1', amount: '₹580.00', status: 'CONFIRMED' },
        { id: 3, orderId: '#707265', date: 'Mar 29, 2025', product: 'Cashews +1', amount: '₹1,001.00', status: 'CONFIRMED' },
        { id: 4, orderId: '#707266', date: 'Mar 30, 2025', product: 'Almond +8', amount: '₹1,780.00', status: 'CANCELLED' },
        { id: 5, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: '₹1,789.00', status: 'CONFIRMED' },
        { id: 6, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: '₹1,789.00', status: 'CONFIRMED' },
    ]);

    const [filteredOrders, setFilteredOrders] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [allCheckList, setAllCheckList] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        let filtered = [...orders];

        if (confirmed && !cancelled) {
            filtered = filtered.filter(order => order.status === 'CONFIRMED');
        } else if (!confirmed && cancelled) {
            filtered = filtered.filter(order => order.status === 'CANCELLED');
        } // if both unchecked => show all

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(order =>
                order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.product.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredOrders(filtered);
    }, [orders, confirmed, cancelled, searchQuery]);

    const handleFullscreen = () => {
        if (!document.fullscreenElement && containerRef.current) {
            containerRef.current.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    useEffect(() => {
        const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleChange);
        return () => document.removeEventListener('fullscreenchange', handleChange);
    }, []);

    useEffect(() => {
        if (allCheckList) {
            const updated = {};
            filteredOrders.forEach(order => updated[order.id] = true);
            setCheckedItems(updated);
        } else {
            setCheckedItems({});
        }
    }, [allCheckList, filteredOrders]);

    const handleCheckboxChange = (id) => {
        setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this order?');
        if (confirmDelete) {
            setOrders(prev => prev.filter(order => order.id !== id));
        }
    };

    const handleView = (order) => {
        alert(`Viewing order:\nOrder ID: ${order.orderId}\nProduct: ${order.product}`);
    };

    return (
        <div ref={containerRef} className="border border-white-color/20 bg-white-color/5 rounded-xl">
            <div className='flex items-center justify-between p-4'>
                <div className='font-inter-b text-white-color'>Order List</div>
                <div className='flex items-center gap-6'>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={confirmed} onChange={() => setConfirmed(!confirmed)} className="hidden" />
                        <span className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${confirmed ? 'border-yellow-color' : ''}`}>
                            <GiCheckMark className={`${confirmed ? 'block' : 'hidden'} text-yellow-color text-[10px]`} />
                        </span>
                        <span className={`text-sm ${confirmed ? 'text-yellow-color' : 'text-white-color/50'}`}>Confirmed</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" checked={cancelled} onChange={() => setCancelled(!cancelled)} className="hidden" />
                        <span className={`size-4 border border-white-color/30 flex items-center justify-center rounded-xs ${cancelled ? 'border-yellow-color' : ''}`}>
                            <GiCheckMark className={`${cancelled ? 'block' : 'hidden'} text-yellow-color text-[10px]`} />
                        </span>
                        <span className={`text-sm ${cancelled ? 'text-yellow-color' : 'text-white-color/50'}`}>Cancelled</span>
                    </label>

                    <input
                        type="text"
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className='bg-transparent border border-white-color/20 px-3 py-1.5 rounded-lg text-white-color text-sm outline-none max-w-[200px]'
                    />

                    <button onClick={handleFullscreen} className='text-2xl text-white-color cursor-pointer'>
                        {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                    </button>
                </div>
            </div>
            <div className='max-h-[261px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color'>
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
        </div>
    );
}

export default OrderList;
