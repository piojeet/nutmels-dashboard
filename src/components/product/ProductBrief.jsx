import React, { useState } from 'react';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { showAppToast } from '../../utils/appToast';

function ProductBrief() {
  const [activeSection, setActiveSection] = useState('brief');
  const notify = (detail, severity = 'info') => {
    showAppToast({
      severity,
      summary: 'Products',
      detail,
    });
  };
  const sections = [
    { key: 'brief', label: 'Brief description' },
    { key: 'ingredients', label: 'Ingredients' },
    { key: 'benefits', label: 'Benefits' },
    { key: 'rdi', label: 'Recommended daily intake (RDI)' },
  ];

  const activePlaceholder = {
    brief: 'Enter brief description...',
    ingredients: 'Enter ingredients...',
    benefits: 'Enter benefits...',
    rdi: 'Enter recommended daily intake...',
  };

  return (
    <div className='h-full'>
      <form action='' className='flex h-full flex-col justify-between gap-6'>
        <div className='space-y-4'>
          <div className='grid gap-4 xl:grid-cols-[.4fr_1fr]'>
            <div className='flex flex-row gap-4 overflow-x-auto xl:flex-col xl:items-start xl:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
              {sections.map((section) => (
                <button
                  type='button'
                  key={section.key}
                  onClick={() => {
                    setActiveSection(section.key);
                  }}
                  className={`shrink-0 text-start font-inter-m tracking-wider text-sm ${activeSection === section.key ? 'text-white-color' : 'text-white-color/60'}`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            <textarea
              placeholder={activePlaceholder[activeSection]}
              className='min-h-[200px] max-h-[400px] w-full rounded-md border border-white-color/20 bg-white-color/5 px-3 py-2.5 text-sm text-white-color outline-none'
            />
          </div>

          <div className='flex flex-wrap justify-end gap-3 sm:gap-4'>
            <button
              type='button'
              onClick={() => {
                const index = sections.findIndex((section) => section.key === activeSection);
                if (index > 0) {
                  setActiveSection(sections[index - 1].key);
                }
              }}
              className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2 text-center text-sm font-inter-m text-white-color sm:w-[120px]'
            >
              <IoArrowBack /> Previous
            </button>
            <button
              type='button'
              onClick={() => {
                const index = sections.findIndex((section) => section.key === activeSection);
                if (index < sections.length - 1) {
                  setActiveSection(sections[index + 1].key);
                }
              }}
              className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2 text-center text-sm font-inter-m text-white-color sm:w-[100px]'
            >
              Next <IoArrowForward />
            </button>
          </div>
        </div>

        <div className='flex flex-wrap justify-end gap-3 sm:gap-4'>
          <button type='button' className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2 text-center text-sm font-inter-m text-white-color sm:w-[120px]'>
            <IoArrowBack /> Previous
          </button>
          <button type='button' onClick={() => notify('Product brief saved.', 'success')} className='w-full rounded-sm border border-white-color/20 bg-[#2DCA95] px-4 py-2.5 text-center text-sm font-inter-m sm:w-[100px]'>Save</button>
          <button type='button' className='flex w-full items-center justify-center gap-1 rounded-sm border border-white-color/20 bg-white-color/5 px-4 py-2 text-center text-sm font-inter-m text-white-color sm:w-[100px]'>
            Next <IoArrowForward />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductBrief;
