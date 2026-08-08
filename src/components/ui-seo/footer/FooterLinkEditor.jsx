import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { fieldClass } from './footerData';

function FooterLinkEditor({ title, links, onChange, onAdd, onRequestDelete }) {
  const updateLink = (id, field, value) => onChange(links.map((link) => (link.id === id ? { ...link, [field]: value } : link)));

  return (
    <section className='h-full rounded-xl border border-white-color/12 bg-white-color/[3%] p-4'>
      <h2 className='font-inter-s text-base text-white-color'>{title}</h2>
      <div className='mt-4 space-y-2.5'>
        {links.map((link) => (
          <div key={link.id} className='grid grid-cols-[minmax(0,1fr)_38px] gap-2 sm:grid-cols-[minmax(130px,0.55fr)_minmax(0,1.45fr)_38px]'>
            <input aria-label={`${title} label`} value={link.label} onChange={(event) => updateLink(link.id, 'label', event.target.value)} placeholder='Link label' className={fieldClass} />
            <input aria-label={`${link.label || 'New'} URL`} value={link.url} onChange={(event) => updateLink(link.id, 'url', event.target.value)} placeholder='/page-url' className={`${fieldClass} col-span-2 sm:col-span-1`} />
            <button type='button' onClick={() => onRequestDelete(link.id, link.label)} aria-label={`Remove ${link.label || 'link'}`} className='row-span-2 flex h-10 w-[38px] items-center justify-center self-center rounded-lg border border-white-color/10 text-white-color/45 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300 sm:row-span-1'><FiTrash2 /></button>
          </div>
        ))}
      </div>
      <button type='button' onClick={onAdd} className='mt-4 inline-flex items-center gap-1.5 text-sm font-inter-m text-yellow-color transition hover:brightness-110'><FiPlus /> Add link</button>
    </section>
  );
}

export default FooterLinkEditor;
