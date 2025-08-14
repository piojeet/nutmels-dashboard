import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Sample Data (you can replace with your real numbers)
const data = [
    {
        month: "1th",
        Jan: 100000,
        Feb: 95000,
        Mar: 80000,
        Apr: 60000,
        May: 45000,
        Jun: 30000,
    },
    {
        month: "2nd",
        Jan: 200000,
        Feb: 180000,
        Mar: 150000,
        Apr: 120000,
        May: 90000,
        Jun: 60000,
    },
    {
        month: "3rd",
        Jan: 300000,
        Feb: 260000,
        Mar: 220000,
        Apr: 170000,
        May: 135000,
        Jun: 95000,
    },
    {
        month: "4th",
        Jan: 400000,
        Feb: 340000,
        Mar: 280000,
        Apr: 220000,
        May: 180000,
        Jun: 125000,
    },
    {
        month: "5th",
        Jan: 475000,
        Feb: 420000,
        Mar: 330000,
        Apr: 250000,
        May: 200000,
        Jun: 150000,
    },
    {
        month: "6th",
        Jan: 525000,
        Feb: 470000,
        Mar: 380000,
        Apr: 290000,
        May: 230000,
        Jun: 175000,
    },
];

function RevenueLineChart() {
    return (
        <div className='border border-white-color/20 bg-white-color/5 rounded-xl p-4'>
            <div className="w-full h-full bg-white p-4 pl-0 rounded shadow">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
                        <Tooltip formatter={(value) => `$${(value / 1000).toFixed(1)}K`} />
                        <Legend />
                        <Line type="monotone" dataKey="Jan" stroke="#7b61ff" strokeWidth={2} />
                        <Line type="monotone" dataKey="Feb" stroke="#a151e1" strokeWidth={2} />
                        <Line type="monotone" dataKey="Mar" stroke="#d142c4" strokeWidth={2} />
                        <Line type="monotone" dataKey="Apr" stroke="#f35292" strokeWidth={2} />
                        <Line type="monotone" dataKey="May" stroke="#f39252" strokeWidth={2} />
                        <Line type="monotone" dataKey="Jun" stroke="#f3c352" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RevenueLineChart;
