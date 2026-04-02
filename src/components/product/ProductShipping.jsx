import React from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

const inputClass = 'h-[30px] w-full rounded-sm border border-white-color/20 bg-white-color/5 px-3 pb-1 text-white-color outline-none';

const ColumnGroup = ({ title, count = 5 }) => (
  <div className='space-y-4'>
    <div className='text-center text-sm font-inter-m font-medium text-white-color/60'>{title}</div>
    <div className='space-y-3'>
      {Array.from({ length: count }).map((_, index) => (
        <input key={index} type='text' className={inputClass} />
      ))}
    </div>
  </div>
);

function ProductShipping() {
  const columns = ['Length (cm)', 'Breadth (cm)', 'Height (cm)', 'Weight (gm)', 'Add. info'];

  return (
    <div className='h-full'>
      <form className='flex h-full flex-col justify-between gap-6'>
        <div className='grid gap-6 xl:grid-cols-[.4fr_1fr]'>
          <div className='space-y-4'>
            <div className='text-sm font-inter-m font-medium text-white-color/60'>Package Type</div>
            <div className='space-y-3'>
              {Array.from({ length: 5 }).map((_, index) => (
                <input key={index} type='text' className={inputClass} />
              ))}
            </div>
          </div>

          <div className='overflow-x-auto'>
            <div className='grid min-w-[780px] grid-cols-5 gap-3'>
              {columns.map((column, index) => (
                <ColumnGroup key={index} title={column} />
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-wrap justify-end gap-3 sm:gap-4'>
          <button className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2.5 text-sm text-white-color sm:w-[120px]'>
            <IoArrowBack /> Previous
          </button>
          <button className='w-full rounded-sm border border-white-color/20 bg-[#2DCA95] px-4 py-2.5 text-sm sm:w-[100px]'>Save</button>
          <button className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2.5 text-sm text-white-color sm:w-[100px]'>
            Next <IoArrowForward />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductShipping;
