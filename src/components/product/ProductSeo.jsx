import React from 'react';
import { IoArrowBack } from 'react-icons/io5';

function ProductSeo() {
  return (
    <div className='h-full'>
      <form action='' className='flex h-full flex-col justify-between gap-4'>
        <div className='space-y-4'>
          {['Meta Title', 'Meta Description', 'Meta Keywords', 'Keywords #01', 'Keywords #02', 'Keywords #03'].map((label) => (
            <div key={label} className='grid gap-2 md:grid-cols-[.4fr_1fr] md:items-center'>
              <div className='font-inter-m text-white-color/60 text-sm'>{label}</div>
              <input type='text' className='h-8 w-full rounded-sm border border-white-color/20 bg-white-color/5 px-4 outline-none text-white-color text-sm' />
            </div>
          ))}
        </div>

        <div className='flex flex-wrap justify-end gap-3 sm:gap-4'>
          <button className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2 text-center text-sm font-inter-m text-white-color sm:w-[120px]'>
            <IoArrowBack /> Previous
          </button>
          <button className='w-full rounded-sm border border-white-color/20 bg-[#2DCA95] px-4 py-2 text-center text-sm font-inter-m sm:w-[100px]'>Save</button>
        </div>
      </form>
    </div>
  );
}

export default ProductSeo;
