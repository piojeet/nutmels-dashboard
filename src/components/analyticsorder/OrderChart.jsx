import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoIosTrendingDown, IoIosTrendingUp } from 'react-icons/io';

const data = [
    { date: '16 Mar', orders: 400, change: 2.5 },
    { date: '17 Mar', orders: 600, change: 3.5 },
    { date: '18 Mar', orders: 200, change: -3.5 },
    { date: '19 Mar', orders: 500, change: 1.5 },
    { date: '20 Mar', orders: 450, change: -5.5 },
    { date: '21 Mar', orders: 700, change: 4.5 },
    { date: '22 Mar', orders: 500, change: 6.5 },
];

function CustomLabel({ x, y, value, width }) {
    const isPositive = value >= 0;
    return (
        <text
            x={x + width / 2}  // 👈 Center align
            y={y - 10}
            fill={isPositive ? '#2DCA95' : '#FF5050'}
            fontSize={12}
            fontWeight="bold"
            textAnchor="middle"
        >
            {isPositive ? <IoIosTrendingUp size={14} /> : <IoIosTrendingDown size={14} />} {Math.abs(value)}%
        </text>
    );
}


function OrderChart() {

    
    return (
        <div>
            
            <div tabIndex={0} className="w-full h-[250px] focus:outline-none focus-visible:outline-none">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 0, bottom: 0, left: -30 }}
                        barSize={20}
                    >
                        <CartesianGrid strokeDasharray="5 5" className='stroke-white-color/30' vertical={false} />
                        <XAxis
                            dataKey="date"
                            className='stroke-white-color/30'
                            // padding={{ left: 0, right: 0 }}
                            interval={0}
                        />
                        <YAxis className='stroke-white-color/30' />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#fff', border: 'none' }}
                            labelStyle={{ color: '#1a1a1a' }}
                            formatter={(value) => [value, 'Orders']}
                        />
                        <Bar
                            dataKey="orders"
                            className='fill-yellow-color'
                            radius={[4, 4, 0, 0]}
                            barCategoryGap="0%"
                            barGap={0}
                        >
                            <LabelList dataKey="change" content={<CustomLabel />} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>

    )
}

export default OrderChart