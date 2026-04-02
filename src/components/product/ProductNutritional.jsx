import React from 'react';
import { IoArrowForward } from 'react-icons/io5';

const InputRow = ({ label, placeholder1 = '', placeholder2 = '' }) => (
  <div className='grid gap-2 md:grid-cols-[.6fr_1fr] md:items-center'>
    <div className='text-sm font-inter-m font-medium text-white-color/60'>{label}</div>
    <div className='grid gap-2 sm:grid-cols-2'>
      <input type='text' className='h-[30px] w-full rounded-sm border border-white-color/20 bg-white-color/5 px-3 pb-1 text-end text-white-color outline-none' placeholder={placeholder1} />
      <input type='text' className='h-[30px] w-full rounded-sm border border-white-color/20 bg-white-color/5 px-3 pb-1 text-white-color outline-none' placeholder={placeholder2} />
    </div>
  </div>
);

function ProductNutritional() {
  const leftInputs = [
    { label: 'Serving Size', ph1: '100g', ph2: '' },
    { label: 'Calories', ph1: 'kcal', ph2: '' },
    { label: 'Total Fat', ph1: 'g', ph2: '' },
    { label: 'Saturated Fat', ph1: 'g', ph2: '' },
    { label: 'Trans Fat', ph1: 'g', ph2: '' },
    { label: 'Cholesterol', ph1: 'mg', ph2: '' },
    { label: 'Sodium', ph1: 'mg', ph2: '' },
    { label: 'Total Carbohydrates', ph1: 'g', ph2: '' },
  ];

  const rightInputs = [
    { label: 'Dietary Fiber', ph1: 'g', ph2: '' },
    { label: 'Total Sugars', ph1: 'g', ph2: '' },
    { label: 'Added Sugars', ph1: 'g', ph2: '' },
    { label: 'Protein', ph1: 'g', ph2: '' },
    { label: 'Vitamin D', ph1: 'mcg', ph2: '' },
    { label: 'Calcium', ph1: 'mg', ph2: '' },
    { label: 'Iron', ph1: 'mg', ph2: '' },
    { label: 'Potassium', ph1: 'mg', ph2: '' },
  ];

  return (
    <div className='h-full'>
      <form action='' className='flex h-full flex-col justify-between gap-6'>
        <div className='grid gap-6 xl:grid-cols-2'>
          <div className='space-y-4'>
            {leftInputs.map((item, index) => (
              <InputRow key={index} label={item.label} placeholder1={item.ph1} placeholder2={item.ph2} />
            ))}
          </div>
          <div className='space-y-4'>
            {rightInputs.map((item, index) => (
              <InputRow key={index} label={item.label} placeholder1={item.ph1} placeholder2={item.ph2} />
            ))}
          </div>
        </div>

        <div className='flex flex-wrap justify-end gap-3 sm:gap-4'>
          <button className='w-full rounded-sm border border-white-color/20 bg-[#2DCA95] px-4 py-2.5 text-center text-sm font-inter-m sm:w-[100px]'>Save</button>
          <button className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2.5 text-center text-sm font-inter-m text-white-color sm:w-[100px]'>
            Next <IoArrowForward />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductNutritional;
