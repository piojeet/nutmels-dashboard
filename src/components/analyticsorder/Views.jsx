import React from 'react';
import Product1 from '../../assets/product1.png';
import { IoEyeOutline } from 'react-icons/io5';
import { IoIosTrendingUp } from 'react-icons/io';

const productData = Array.from({ length: 9 }).map((_, index) => ({
  id: index + 1,
  img: Product1,
  name: 'Almond',
  views: 10000,
  increase: 580,
  type: 'Nuts',
}));

function Views() {
  return (
    <div className='grid max-h-[200px] grid-cols-1 gap-4 overflow-y-auto pb-4 sm:grid-cols-2 xl:grid-cols-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar]:w-1'>
      {productData.map((item, index) => (
        <div key={item.id} className='flex gap-2.5 w-full'>
          <div className='shrink-0'><img src={item.img} alt='' className='size-[60px]' /></div>
          <div className='space-y-0.5 w-full'>
            <div className='text-lg leading-[.9] font-inter-m text-white-color/25'>{String(index + 1).padStart(2, '0')}</div>
            <div>
              <div className='text-sm font-inter-m text-white-color'>{item.name}</div>
              <div className='text-[10px] leading-[1] font-inter-r text-white-color/30'>#{item.type}</div>
            </div>
            <div className='flex items-center gap-1 text-xs font-inter-b text-yellow-color'><IoEyeOutline />{item.views}</div>
            <div className='flex items-center gap-1 text-xs font-inter-b text-green-color'><IoIosTrendingUp />{item.increase}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Views;

