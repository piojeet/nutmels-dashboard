import React from 'react';
import { IoArrowForward } from 'react-icons/io5';

function SeoPolicy() {
  return (
    <div className='h-full'>
      <form action='' className='flex h-full flex-col gap-4 xl:flex-row xl:items-start'>
        <div className='shrink-0 space-y-6 xl:min-w-[180px]'>
          <div className='whitespace-nowrap font-inter-m text-white-color'>terms of service</div>
        </div>

        <div className='w-full space-y-6 sm:space-y-10'>
          <textarea className='min-h-[250px] max-h-[400px] w-full rounded-md border border-white-color/20 bg-white-color/5 px-3 py-2.5 text-sm text-white-color outline-none' />
          <div className='flex flex-wrap justify-end gap-3 sm:gap-4'>
            <button className='w-full rounded-sm border border-white-color/20 bg-[#2DCA95] px-4 py-2.5 text-center text-sm font-inter-m sm:w-[100px]'>
              Save
            </button>
            <button className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2.5 text-center text-sm font-inter-m text-white-color sm:w-[100px]'>
              Next <IoArrowForward />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SeoPolicy;
