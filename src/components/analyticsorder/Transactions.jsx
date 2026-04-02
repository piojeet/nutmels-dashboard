import React, { useEffect, useRef, useState } from 'react';
import { MdFullscreen, MdFullscreenExit } from 'react-icons/md';
import Payments from './Payments';
import useTabIndicator from '../../hooks/useTabIndicator';

const tabs = ['Payments', 'Sales', 'Inventory'];

function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([
    { id: 1, orderId: '#707263', date: 'Mar 25, 2025', product: 'Almond +3', amount: 'â‚¹1,680.00', status: 'CONFIRMED' },
    { id: 2, orderId: '#707264', date: 'Mar 28, 2025', product: 'Flax +1', amount: 'â‚¹580.00', status: 'CONFIRMED' },
    { id: 3, orderId: '#707265', date: 'Mar 29, 2025', product: 'Cashews +1', amount: 'â‚¹1,001.00', status: 'CONFIRMED' },
    { id: 4, orderId: '#707266', date: 'Mar 30, 2025', product: 'Almond +8', amount: 'â‚¹1,780.00', status: 'CANCELLED' },
    { id: 5, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: 'â‚¹1,789.00', status: 'CONFIRMED' },
    { id: 6, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: 'â‚¹1,789.00', status: 'CONFIRMED' },
    { id: 7, orderId: '#707267', date: 'Mar 31, 2025', product: 'Flax +10', amount: 'â‚¹1,789.00', status: 'CONFIRMED' },
  ]);

  const [filteredOrders, setFilteredOrders] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [allCheckList, setAllCheckList] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let filtered = [...orders];

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(
        (order) =>
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
      filteredOrders.forEach((order) => {
        updated[order.id] = true;
      });
      setCheckedItems(updated);
    } else {
      setCheckedItems({});
    }
  }, [allCheckList, filteredOrders]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order?');
    if (confirmDelete) {
      setOrders((prev) => prev.filter((order) => order.id !== id));
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
    Sales: 'Sales',
    Inventory: 'This is SEO content.',
  };

  const [activeTab, setActiveTab] = useState(tabs[0] || '');
  const { getTabRef, tabListRef, underlineStyle } = useTabIndicator(activeTab);

  if (!tabs.length) return null;

  return (
    <div ref={containerRef} className='rounded-xl border border-white-color/20 bg-white-color/5'>
      <div className='flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex flex-col gap-4 xl:flex-row xl:items-center'>
          <div className='font-inter-b text-white-color'>Transactions</div>
          <div ref={tabListRef} className='relative flex gap-2 overflow-x-auto pb-2 pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4'>
            {tabs.map((tab) => (
              <button
                key={tab}
                ref={getTabRef(tab)}
                data-tab-key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 px-3 text-sm font-inter-r transition-all duration-300 ease-in-out sm:px-4 ${
                  activeTab === tab ? 'text-yellow-color font-inter-b' : 'text-white-color/50 hover:text-yellow-color'
                }`}
              >
                {tab}
              </button>
            ))}

            <div
              className='absolute bottom-0 h-0.5 bg-yellow-color transition-all duration-300 ease-in-out'
              style={{ left: underlineStyle.left, width: underlineStyle.width, opacity: underlineStyle.opacity }}
            />
          </div>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-lg border border-white-color/20 bg-transparent px-3 py-1.5 text-sm text-white-color outline-none sm:max-w-[400px]'
          />

          <button onClick={handleFullscreen} className='self-end text-2xl text-white-color sm:self-auto'>
            {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
          </button>
        </div>
      </div>

      <div className='text-sm text-white transition-opacity duration-300 ease-in-out opacity-100'>
        {componentMap?.[activeTab] || 'No content available'}
      </div>
    </div>
  );
}

export default Transactions;
