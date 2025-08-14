import React, { useEffect, useRef, useState } from 'react'
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import Payments from './Payments';

const tabs = ['Payments', 'Sales', 'Inventory'];
function Transactions() {

    const [searchQuery, setSearchQuery] = useState('');
    const [orders, setOrders] = useState([
        { id: 1, orderId: '#707263', date: 'Mar 25, 2025', product: 'Almond +3', amount: '₹1,680.00', status: 'CONFIRMED' },
        { id: 2, orderId: '#707264', date: 'Mar 28, 2025', product: 'Flax +1', amount: '₹580.00', status: 'CONFIRMED' },
        { id: 3, orderId: '#707265', date: 'Mar 29, 2025', product: 'Cashews +1', amount: '₹1,001.00', status: 'CONFIRMED' },
        { id: 4, orderId: '#707266', date: 'Mar 30, 2025', product: 'Almond +8', amount: '₹1,780.00', status: 'CANCELLED' },
        { id: 5, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: '₹1,789.00', status: 'CONFIRMED' },
        { id: 6, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: '₹1,789.00', status: 'CONFIRMED' },
        { id: 7, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: '₹1,789.00', status: 'CONFIRMED' },
    ]);

    const [filteredOrders, setFilteredOrders] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});
    const [allCheckList, setAllCheckList] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        let filtered = [...orders];

        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(order =>
                order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.product.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredOrders(filtered);
    }, [orders, searchQuery]);

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



    const componentMap = {
        Payments: (
            <Payments
                handleView={handleView}
                handleDelete={handleDelete}
                handleCheckboxChange={handleCheckboxChange}
                checkedItems={checkedItems}
                setAllCheckList={setAllCheckList}
                allCheckList={allCheckList}
                filteredOrders={filteredOrders}
            />
        ),
        Sales: "Sales",
        Inventory: "This is SEO content.",
    };



    const [activeTab, setActiveTab] = useState(tabs[0] || '');
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef([]);

    useEffect(() => {
        const currentTab = tabRefs.current[tabs.indexOf(activeTab)];
        if (currentTab) {
            const { offsetLeft, offsetWidth } = currentTab;
            setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
        }
    }, [activeTab, tabs]);

    if (!tabs.length) return null; // No tabs passed



    return (
        <div ref={containerRef} className='border border-white-color/20 bg-white-color/5 rounded-xl'>
            <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-4'>
                    <div className='font-inter-b text-white-color'>Transactions</div>
                    {/* Tabs */}
                    <div className="flex space-x-4 pb-2 relative">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab}
                                ref={(el) => (tabRefs.current[index] = el)}
                                onClick={() => setActiveTab(tab)}
                                className={`relative px-4 font-inter-r text-sm transition-all duration-300 ease-in-out
                          ${activeTab === tab
                                        ? 'text-yellow-color font-inter-b'
                                        : 'text-white-color/50 hover:text-yellow-color'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}

                        {/* Moving Underline */}
                        <div
                            className="absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out"
                            style={{
                                left: underlineStyle.left,
                                width: underlineStyle.width,
                            }}
                        />
                    </div>
                </div>
                <div className='flex gap-3'>
                    <input
                        type="text"
                        placeholder='Search...'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className='bg-transparent border border-white-color/20 px-3 py-1.5 rounded-lg text-white-color text-sm outline-none max-w-[400px] w-full'
                    />

                    <button onClick={handleFullscreen} className='text-2xl text-white-color cursor-pointer'>
                        {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
                    </button>
                </div>

            </div>

            {/* Content */}
            <div className=" text-white text-sm transition-opacity duration-300 ease-in-out opacity-100">
                {componentMap?.[activeTab] || 'No content available'}
            </div>
        </div>
    )
}

export default Transactions