import React from 'react';
import { FiLink, FiPlus, FiTrash2 } from 'react-icons/fi';
import { fieldClass } from './footerData';

function SocialIconPreview({ social }) {
  const FallbackIcon = social.Icon || FiLink;
  return (
    <div className='group relative flex size-10 items-center justify-center overflow-hidden rounded-lg border border-white-color/25 text-lg text-white-color/75 transition hover:border-yellow-color'>
      {social.outlineSvg ? <img src={social.outlineSvg} alt='' className='size-5 object-contain transition group-hover:opacity-0' /> : <FallbackIcon className='transition group-hover:opacity-0' />}
      {social.fillSvg ? <img src={social.fillSvg} alt='' className='absolute size-5 object-contain opacity-0 transition group-hover:opacity-100' /> : <FallbackIcon className='absolute opacity-0 text-yellow-color transition group-hover:opacity-100' />}
    </div>
  );
}

function FooterSocialLinks({ socialLinks, onAdd, onUpdate, onRequestDelete, onUpload }) {
  return (
    <section className='mt-4 rounded-xl border border-white-color/12 bg-white-color/[3%] p-4'>
      <div className='flex items-center justify-between gap-3'>
        <div>
          <h2 className='font-inter-s text-base'>Social links</h2>
          <p className='mt-1 text-sm text-white-color/45'>Upload an outline and fill SVG. The fill icon displays on hover in the website footer.</p>
        </div>
        <button type='button' onClick={onAdd} className='inline-flex h-9 items-center gap-1.5 rounded-lg bg-yellow-color px-3 text-xs font-inter-s text-black-color transition hover:brightness-110'><FiPlus /> Add social link</button>
      </div>
      <div className='mt-4 space-y-3'>
        {socialLinks.map((social) => (
          <div key={social.id} className='grid gap-3 rounded-xl border border-white-color/12 bg-white-color/[2%] p-3 lg:grid-cols-[42px_minmax(130px,0.6fr)_minmax(190px,1fr)_auto_38px] lg:items-center'>
            <SocialIconPreview social={social} />
            <input aria-label='Social platform name' value={social.label} onChange={(event) => onUpdate(social.id, 'label', event.target.value)} placeholder='Platform name' className={fieldClass} />
            <input aria-label={`${social.label || 'Social'} URL`} value={social.url} onChange={(event) => onUpdate(social.id, 'url', event.target.value)} placeholder='https://...' className={fieldClass} />
            <div className='grid grid-cols-2 gap-2 sm:flex'>
              <label className='inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 text-xs font-inter-m text-white-color/65 transition hover:border-yellow-color/50 hover:text-yellow-color'>
                Outline SVG
                <input type='file' accept='.svg,image/svg+xml' className='sr-only' onChange={(event) => onUpload(social.id, 'outlineSvg', event.target.files?.[0])} />
              </label>
              <label className='inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-white-color/14 bg-white-color/[3%] px-3 text-xs font-inter-m text-white-color/65 transition hover:border-yellow-color/50 hover:text-yellow-color'>
                Fill SVG
                <input type='file' accept='.svg,image/svg+xml' className='sr-only' onChange={(event) => onUpload(social.id, 'fillSvg', event.target.files?.[0])} />
              </label>
            </div>
            <button type='button' onClick={() => onRequestDelete(social.id, social.label)} aria-label={`Remove ${social.label || 'social link'}`} className='flex h-10 w-[38px] items-center justify-center rounded-lg border border-white-color/10 text-white-color/45 transition hover:border-red-400/40 hover:bg-red-400/10 hover:text-red-300'><FiTrash2 /></button>
          </div>
        ))}
      </div>
      <button type='button' onClick={onAdd} className='mt-4 inline-flex items-center gap-1.5 text-sm font-inter-m text-yellow-color transition hover:brightness-110'><FiPlus /> Add social link</button>
    </section>
  );
}

export default FooterSocialLinks;
