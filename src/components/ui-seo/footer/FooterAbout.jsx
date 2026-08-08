import React from 'react';

function FooterAbout({ value, onChange }) {
  return (
    <section className='rounded-xl border border-white-color/12 bg-white-color/[3%] p-4'>
      <label htmlFor='footer-about' className='font-inter-s text-base'>About text</label>
      <textarea id='footer-about' value={value} onChange={(event) => onChange(event.target.value)} rows={1} className='mt-3 min-h-16 w-full resize-y rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 py-3 text-sm leading-6 text-white-color outline-none transition placeholder:text-white-color/25 focus:border-yellow-color/50 focus:bg-white-color/[6%]' />
    </section>
  );
}

export default FooterAbout;
