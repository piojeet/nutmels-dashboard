import React from 'react'
import { IoArrowForward } from "react-icons/io5";

function ProductBasic() {
  return (
    <div className='h-full'>
      <form action="" className='h-full flex flex-col justify-between gap-4'>
        <div className='space-y-6'>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Category</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Consumption Preference</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Variants</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Package Size</div>
            <div className='flex gap-4 items-center'>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            <div className='font-inter-m text-white-color/60'>Unit</div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Title</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Slug</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <button className='py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm bg-[#2DCA95] cursor-pointer'>Save</button>
          <button className='py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center'>Next <IoArrowForward /></button>
        </div>
      </form>
    </div>
  )
}

export default ProductBasic