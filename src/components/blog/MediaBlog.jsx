import React from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'
import { RiUploadCloudLine } from 'react-icons/ri'

function MediaBlog() {
  return (
    <div className='h-full'>
      <form action="" className='h-full flex flex-col justify-between gap-4'>
        <div className=''>
          <div className='border-2 border-dashed border-white-color/30 h-[300px] rounded-xl flex flex-col justify-center items-center gap-3 bg-white-color/10'>
          <div className='text-white-color text-6xl'><RiUploadCloudLine /></div>
            <div className='space-y-2 text-center'>
              <div className='font-inter-r text-white-color'>Upload product Images <span className='font-semibold text-yellow-color'>browse</span></div>
              <div className='font-inter-r text-white-color/60'>Max 10 MB files are allowed</div>
            </div>
            <input type="file" name="" id="" hidden />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
        <button className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[120px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center">
            <IoArrowBack /> Previous
          </button>
          <button className='py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm bg-[#2DCA95] cursor-pointer'>Save</button>
          <button className='py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center'>Next <IoArrowForward /></button>
        </div>
      </form>
    </div>
  )
}

export default MediaBlog