import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import RevenueLineChart from './RevenueLineChart';
import RetentionGrid from './RetentionGrid';

const rawData = [
  { name: 'Visitors', value: 256200, dropLabel: 'No Shopping Activity', dropValue: 57600, dropPercent: '19.23%' },
  { name: 'Product Views', value: 198400, dropLabel: 'No Cart Addition', dropValue: 52400, dropPercent: '17.23%' },
  { name: 'Add to Cart', value: 139200, dropLabel: 'Cart Abandonment', dropValue: 129200, dropPercent: '86.57%' },
  { name: 'Check-Out', value: 9400, dropLabel: 'Check-Out Abandonment', dropValue: 3900, dropPercent: '32.54%' },
  { name: 'Complete Order', value: 5900, dropLabel: '', dropValue: null, dropPercent: '' },
];

const data = [...rawData, { name: '', value: 0 }];

const formatNumber = (num) => {
  if (!num) return '';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num;
};

function CRM() {
  return (
    <div className='space-y-4'>
      <div className='rounded-xl border border-white-color/20 bg-white-color/5 p-4'>
        <div className='relative w-full rounded-xl bg-white/5 p-3 shadow-sm'>
          <div className='grid gap-4 text-sm font-medium text-[#6e6e6e] sm:grid-cols-2 xl:grid-cols-5'>
            {rawData.map((step, i) => (
              <div key={i} className='w-full rounded-xl px-2'>
                <div className='text-xs font-inter-s text-white'>{step.name}</div>
                <div className='text-sm font-inter-b text-white'>{formatNumber(step.value)}</div>
                {step.dropLabel && (
                  <>
                    <div className='mt-1 text-[11px] text-[#b9b9b9]'>{step.dropLabel}</div>
                    <div className='flex justify-between gap-3 text-[11px] font-semibold text-white'>
                      <span>{formatNumber(step.dropValue)}</span>
                      <span className='font-medium text-[#c5c4c4]'>{step.dropPercent}</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className='h-[110px] w-full'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={data} margin={{ top: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id='funnelGradient' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='0%' stopColor='#bd821e' stopOpacity={1} />
                    <stop offset='100%' stopColor='#FAAA21' stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' vertical={false} stroke='#ddd' />
                <YAxis hide />
                <Tooltip formatter={(value) => formatNumber(value)} contentStyle={{ fontSize: '12px' }} />
                <Area type='monotone' dataKey='value' stroke='#FAAA21' fill='url(#funnelGradient)' dot={{ r: 4, fill: '#fff', stroke: '#6b9184', strokeWidth: 2 }} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='grid gap-4 xl:grid-cols-2'>
        <RevenueLineChart />
        <RetentionGrid />
      </div>
    </div>
  );
}

export default CRM;
