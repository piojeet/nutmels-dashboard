import React from 'react';

const retentionData = [
    ['100%', '64.7%', '56.8%', '48.7%', '35.6%', '28.5%', '28.5%', '19.25%'],
    ['100%', '56.8%', '48.7%', '35.6%', '28.5%', '19.25%', '19.25%'],
    ['100%', '35.6%', '28.5%', '19.25%', '19.25%', '19.25%'],
    ['100%', '19.25%', '19.25%', '19.25%', '19.25%'],
    ['100%', '19.25%', '19.25%', '19.25%'],
    ['100%', '19.25%', '19.25%'],
    ['100%', '19.25%'],
    ['100%'],
];

const months = ['Jan 22', 'Mar 22', 'May 22', 'Jul 22'];

// Function to generate background color based on % value
const getColor = (value) => {
    const num = parseFloat(value);
    if (num === 100) return '#7B61FF'; // dark purple
    if (num >= 60) return '#a162f7';
    if (num >= 40) return '#c774da';
    if (num >= 20) return '#e890c2';
    return '#f5b2cc'; // light pink
};

const RetentionGrid = () => {
    return (
        <div className='border border-white-color/20 bg-white-color/5 rounded-xl p-4'>
            <div className="p-4 bg-white/5 rounded-lg shadow overflow-auto h-full">
                <div className='flex'>
                    <div className='flex flex-col justify-around'>
                        {months.map(month => {
                            const [label1, label2] = month.split(' '); // e.g., "Jan 22" => ["Jan", "22"]
                            return (
                                <div key={month} className="w-10 text-sm leading-tight">
                                    <div className="text-white font-inter-s">{label1}</div>
                                    <div className="text-white/60 font-inter-r">{label2}</div>
                                </div>
                            );
                        })}

                    </div>
                    <div className="inline-block">
                        {retentionData.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex mb-1">

                                {row.map((value, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="w-14 h-6 rounded flex items-center justify-center text-white text-xs font-medium mr-1"
                                        style={{ backgroundColor: getColor(value) }}
                                    >
                                        {value}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RetentionGrid;
