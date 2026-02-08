import React from 'react'
import { IoArrowBack } from 'react-icons/io5'

function ProductSeo() {
  return (
    <div className='h-full'>
      <form action="" className='h-full flex flex-col justify-between gap-4'>
        <div className='space-y-6'>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Meta Title</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Meta Description</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Meta Keywords</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Keywords #01</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Keywords #02</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
          <div className='grid grid-cols-[.4fr_1fr] content-center'>
            <div className='font-inter-m text-white-color/60'>Keywords #03</div>
            <div>
              <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full' />
            </div>
          </div>
        </div>

        <div className='flex justify-end gap-4'>
        <button className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[120px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center">
            <IoArrowBack /> Previous
          </button>
          <button className='py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm bg-[#2DCA95] cursor-pointer'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default ProductSeo