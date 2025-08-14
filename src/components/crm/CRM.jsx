import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import RevenueLineChart from './RevenueLineChart';
import RetentionGrid from './RetentionGrid';

const rawData = [
    {
        name: 'Visitors',
        value: 256200,
        dropLabel: 'No Shopping Activity',
        dropValue: 57600,
        dropPercent: '19.23%',
    },
    {
        name: 'Product Views',
        value: 198400,
        dropLabel: 'No Cart Addition',
        dropValue: 52400,
        dropPercent: '17.23%',
    },
    {
        name: 'Add to Cart',
        value: 139200,
        dropLabel: 'Cart Abandonment',
        dropValue: 129200,
        dropPercent: '86.57%',
    },
    {
        name: 'Check-Out',
        value: 9400,
        dropLabel: 'Check-Out Abandonment',
        dropValue: 3900,
        dropPercent: '32.54%',
    },
    {
        name: 'Complete Order',
        value: 5900,
        dropLabel: '',
        dropValue: null,
        dropPercent: '',
    },
];

// Add a dummy point for spacing after last point
const data = [...rawData, { name: '', value: 0 }];

const formatNumber = (num) => {
    if (!num) return '';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
};

function CRM() {
    return (
        <div className='space-y-4'>
            <div className='border border-white-color/20 bg-white-color/5 rounded-xl p-4'>
                <div className="w-full bg-[#f3f0ee] p-4 rounded-xl shadow-sm relative">
                    {/* Top Summary Boxes */}
                    <div className="flex justify-between text-sm font-medium text-[#6e6e6e]">
                        {rawData.map((step, i) => (
                            <div key={i} className="w-full px-2">
                                <div className="text-xs text-black font-inter-s">{step.name}</div>
                                <div className="text-black text-lg font-inter-b">{formatNumber(step.value)}</div>
                                {step.dropLabel && (
                                    <>
                                        <div className="text-[11px] text-[#6e6e6e] mt-2">{step.dropLabel}</div>
                                        <div className="text-[11px] text-black font-semibold flex justify-between">
                                            <span>{formatNumber(step.dropValue)}{' '}</span>
                                            <span className="text-[#999] font-medium">{step.dropPercent}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Area Chart */}
                    <div className="h-[150px] w-full mt-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="funnelGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#d7f2a4" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#6b9184" stopOpacity={1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
                                <YAxis hide />
                                <Tooltip
                                    formatter={(value) => formatNumber(value)}
                                    contentStyle={{ fontSize: '12px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#6b9184"
                                    fill="url(#funnelGradient)"
                                    dot={{ r: 4, fill: '#fff', stroke: '#6b9184', strokeWidth: 2 }}
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
                <RevenueLineChart />
                <RetentionGrid />
            </div>
        </div>
    );
}

export default CRM;
