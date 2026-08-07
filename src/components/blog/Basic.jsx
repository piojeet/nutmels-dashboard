import React from 'react';
import { IoArrowForward } from 'react-icons/io5';

function Basic() {
  return (
    <div className='h-full'>
      <form action='' className='flex h-full flex-col justify-between gap-4'>
        <div className='space-y-4'>
          <div className='grid gap-2 md:grid-cols-[.4fr_1fr] md:items-center'>
            <div className='font-inter-m text-white-color/60 text-sm'>Category</div>
            <input type='text' className='h-8 w-full rounded-sm border border-white-color/20 bg-white-color/5 px-4 text-white-color outline-none' />
          </div>
          <div className='grid gap-2 md:grid-cols-[.4fr_1fr] md:items-center'>
            <div className='font-inter-m text-white-color/60 text-sm'>Title</div>
            <input type='text' className='h-8 w-full rounded-sm border border-white-color/20 bg-white-color/5 px-4 text-white-color outline-none' />
          </div>
          <div className='grid gap-2 md:grid-cols-[.4fr_1fr] md:items-center'>
            <div className='font-inter-m text-white-color/60 text-sm'>Slug</div>
            <input type='text' className='h-8 w-full rounded-sm border border-white-color/20 bg-white-color/5 px-4 text-white-color outline-none' />
          </div>
          <div className='grid gap-2 md:grid-cols-[.4fr_1fr] md:items-start'>
            <div className='font-inter-m text-white-color/60 text-sm'>Brief description</div>
            <textarea className='min-h-[120px] max-h-[200px] w-full rounded-md border border-white-color/20 bg-white-color/5 px-3 py-2.5 text-sm text-white-color outline-none' />
          </div>
        </div>

        <div className='flex flex-wrap justify-end gap-3 sm:gap-4'>
          <button className='w-full rounded-sm border border-white-color/20 bg-[#2DCA95] px-4 py-2 text-center text-sm font-inter-m sm:w-[100px]'>Save</button>
          <button className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2 text-center text-sm font-inter-m text-white-color sm:w-[100px]'>
            Next <IoArrowForward />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Basic;
