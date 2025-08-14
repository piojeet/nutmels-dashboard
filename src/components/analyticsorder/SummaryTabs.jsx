import React, { useEffect, useRef, useState } from 'react'
import OrderChart from './OrderChart';
import { BiChevronDown } from 'react-icons/bi';
import OrderList from './OrderList';
import ProductPerformance from './ProductPerformance';
import Transactions from './Transactions';

const tabs = ['Analytics', 'CRM', 'SEO', 'Website'];

const componentMap = {
    Analytics: <OrderChart />,
    CRM: "This is CRM content.",
    SEO: "This is SEO content.",
    Website: "This is Website content.",
};

const options = [
    'Last 7 days',
    'Last 30 days',
    'Last 60 days',
    'Last 90 days',
    'Last 1 year',
];


function SummaryTabs() {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
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


    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className='lg:grid flex flex-col lg:grid-cols-2 gap-6'>
            <div className='border border-white-color/20 bg-white-color/5 p-4 rounded-xl'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='font-inter-b text-white-color'>Summary</div>
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

                    <div className="relative w-fit text-white-color font-inter-m z-20 select-none">
                        <div
                            className="bg-transparent border border-white-color/20 px-3 py-1.5 rounded-lg cursor-pointer flex items-center justify-between gap-2 min-w-[150px]"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span>{selected}</span>
                            <BiChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </div>

                        {isOpen && (
                            <div className="absolute top-full mt-2 left-0 w-full bg-black-color border border-white-color/10 rounded-lg shadow-lg overflow-hidden">
                                {options.map((option, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(option)}
                                        className={`px-4 py-2 cursor-pointer text-sm hover:bg-yellow-color/20 hover:text-yellow-color transition-all ${selected === option ? 'bg-white/10 text-yellow-color' : 'text-white-color/80'
                                            }`}
                                    >
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="mt-6 text-white text-sm transition-opacity duration-300 ease-in-out opacity-100">
                    {componentMap?.[activeTab] || 'No content available'}
                </div>
            </div>

            <OrderList />
            <ProductPerformance />
            <Transactions />
        </div>
    )
}

export default SummaryTabs