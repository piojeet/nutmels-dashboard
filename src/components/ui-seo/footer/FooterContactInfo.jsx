import React from 'react';
import { fieldClass } from './footerData';

const contactFields = [
  ['workingHours', 'Working hours', 'Mon - Sat : 10:00 - 19:30'],
  ['email', 'Email', 'hello@company.com'],
  ['phone', 'Phone', '+91 000 000 0000'],
  ['address', 'Address', 'Your business address'],
];

function FooterContactInfo({ contact, onChange }) {
  return (
    <section className='mt-4 rounded-xl border border-white-color/12 bg-white-color/[3%] p-4'>
      <h2 className='font-inter-s text-base'>Contact info</h2>
      <div className='mt-4 grid gap-4 md:grid-cols-2'>
        {contactFields.map(([key, label, placeholder]) => (
          <label key={key} className='block text-sm text-white-color/65'>
            {label}
            <input value={contact[key]} onChange={(event) => onChange(key, event.target.value)} placeholder={placeholder} className={`${fieldClass} mt-2`} />
          </label>
        ))}
      </div>
    </section>
  );
}

export default FooterContactInfo;
