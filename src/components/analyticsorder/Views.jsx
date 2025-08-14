import React from 'react'
import Product1 from '../../assets/product1.png'
import { IoEyeOutline } from 'react-icons/io5'
import { IoIosTrendingUp } from 'react-icons/io'

const productData = [
    {
        id: 1,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 2,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 3,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 4,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 5,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 6,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 7,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 8,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    },
    {
        id: 9,
        img: Product1,
        name: 'Almond',
        views: 10000,
        increase: 580,
        type: 'Nuts'
    }
]

function Views() {
  return (
    <div className='grid grid-cols-3 gap-4 pb-4 max-h-[261px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white-color/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-yellow-color'>
        {productData.map((idx, i) => (
            <div key={i.id} className='flex gap-2.5'>
                <div><img src={idx.img} alt="" className='size-[84px]' /></div>
                <div className='space-y-0.5'>
                    <div className='text-lg leading-[.9] text-white-color/25 font-inter-m'>{String(i + 1).padStart(2, '0')}</div>
                    <div>
                        <div className='text-sm font-inter-m text-white-color'>{idx.name}</div>
                        <div className='text-[10px] leading-[1] font-inter-r text-white-color/30'>#{idx.type}</div>
                    </div>
                    <div className='text-xs font-inter-b text-yellow-color flex items-center gap-1'><IoEyeOutline />{idx.views}</div>
                    <div className='text-xs font-inter-b text-green-color flex items-center gap-1'><IoIosTrendingUp />{idx.increase}</div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Views