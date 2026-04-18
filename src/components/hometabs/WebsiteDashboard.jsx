import React, { useRef, useState } from 'react';
import { FiCode, FiDatabase, FiHardDrive, FiMoreHorizontal, FiSave, FiUploadCloud, FiZap } from 'react-icons/fi';
import { TbBraces, TbWorldCode } from 'react-icons/tb';
import { showAppToast } from '../../utils/appToast';

const defaultScript = `<!-- Google Tag Manager -->
<script>
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
<!-- End Google Tag Manager -->`;

function WebsiteDashboard() {
  const faviconInputRef = useRef(null);
  const [siteTitle, setSiteTitle] = useState('Acme Corp | Next-Gen Cloud Solutions');
  const [metaDescription, setMetaDescription] = useState(
    'Empowering enterprises with scalable, secure, and lightning-fast cloud infrastructure. Built for the modern web.'
  );
  const [faviconName, setFaviconName] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [scriptScope, setScriptScope] = useState('HEAD / BODY');
  const [scriptValue, setScriptValue] = useState(defaultScript);

  const showToast = (message) => {
    showAppToast({
      severity: 'info',
      summary: 'Website',
      detail: message,
    });
  };

  const handleFaviconUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFaviconName(file.name);
  };

  const handleFormatCode = () => {
    const formatted = scriptValue
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');
    setScriptValue(formatted);
  };

  const handleSaveScripts = () => {
    showToast('Scripts saved');
  };

  const handleClearCache = () => {
    showToast('Global cache cleared');
  };

  return (
    <section className='relative overflow-hidden rounded-[30px] border border-white/6 bg-[#0d0d0f] p-4 text-white shadow-[0_30px_90px_rgba(0,0,0,0.5)] sm:p-5 xl:p-6'>
      <div
        className='absolute inset-0 opacity-[0.08]'
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      <div className='relative z-10 space-y-4'>
        <div className='grid gap-4 xl:grid-cols-[1.05fr_0.95fr]'>
          <div className='rounded-[22px] border border-white/6 bg-[#131314] p-5'>
            <div className='flex items-center justify-between gap-3'>
              <div className='flex items-center gap-2 text-[22px] font-inter-b text-white'>
                <TbWorldCode className='text-white/70' />
                Brand & Metadata
              </div>
              <button type='button' className='text-white/40 transition hover:text-white'>
                <FiMoreHorizontal size={18} />
              </button>
            </div>

            <div className='mt-5 space-y-5'>
              <label className='block'>
                <div className='mb-2 text-[11px] font-inter-m uppercase tracking-[0.2em] text-white/38'>Meta Title</div>
                <input
                  value={siteTitle}
                  onChange={(event) => setSiteTitle(event.target.value)}
                  className='h-11 w-full rounded-xl border border-white/7 bg-[#0f0f10] px-4 text-sm text-white outline-none placeholder:text-white/25'
                />
              </label>

              <label className='block'>
                <div className='mb-2 text-[11px] font-inter-m uppercase tracking-[0.2em] text-white/38'>Meta Description</div>
                <textarea
                  value={metaDescription}
                  onChange={(event) => setMetaDescription(event.target.value)}
                  className='min-h-[92px] w-full rounded-xl border border-white/7 bg-[#0f0f10] px-4 py-3 text-sm text-white outline-none placeholder:text-white/25'
                />
              </label>

              <div>
                <div className='mb-2 text-[11px] font-inter-m uppercase tracking-[0.2em] text-white/38'>Favicon</div>
                <input ref={faviconInputRef} type='file' accept='.svg,.png,.ico' onChange={handleFaviconUpload} className='hidden' />
                <button
                  type='button'
                  onClick={() => faviconInputRef.current?.click()}
                  className='flex min-h-[98px] w-full flex-col items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-[#101011] px-4 py-5 text-center transition hover:border-[#ff7a00]/35 hover:bg-[#141416]'
                >
                  <span className='flex h-10 w-10 items-center justify-center rounded-full bg-white/6 text-white/70'>
                    <FiUploadCloud size={18} />
                  </span>
                  <span className='mt-3 text-sm font-inter-s text-white'>{faviconName || 'Drag & drop your favicon'}</span>
                  <span className='mt-1 text-xs text-white/35'>SVG, PNG, ICO (Max 2MB)</span>
                </button>
              </div>
            </div>
          </div>

          <div className='rounded-[22px] border border-white/6 bg-[#131314] p-5'>
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <div className='flex items-center gap-2 text-[22px] font-inter-b text-white'>
                <FiHardDrive className='text-white/70' />
                Infrastructure Controls
              </div>
              <span className='rounded-lg border border-white/8 bg-white/4 px-3 py-1 text-[10px] font-inter-s uppercase tracking-[0.16em] text-white/45'>
                Region: US-EAST-1
              </span>
            </div>

            <div className='mt-5 grid gap-4 md:grid-cols-2'>
              <div className='rounded-[18px] border border-white/6 bg-[#0f0f10] p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/70'>
                    <FiDatabase size={16} />
                  </span>
                  <span className='text-[11px] font-inter-m text-white/35'>1.2GB Used</span>
                </div>
                <div className='mt-5 text-base font-inter-s text-white'>Global Edge Cache</div>
                <div className='mt-1 text-xs leading-5 text-white/38'>Purge CDN and application cache globally.</div>
                <button
                  type='button'
                  onClick={handleClearCache}
                  className='mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#ff7a00,#ff9e2c)] px-4 text-sm font-inter-b text-black transition hover:brightness-110'
                >
                  <FiZap className='mr-2' />
                  Clear Global Cache
                </button>
              </div>

              <div className='rounded-[18px] border border-white/6 bg-[#0f0f10] p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-white/70'>
                    <TbBraces size={16} />
                  </span>
                  <span className='h-2 w-2 rounded-full bg-white/35' />
                </div>
                <div className='mt-5 text-base font-inter-s text-white'>Maintenance Mode</div>
                <div className='mt-1 text-xs leading-5 text-white/38'>Route all traffic to maintenance page.</div>

                <div className='mt-8 flex items-center justify-between gap-4'>
                  <span className='text-[11px] font-inter-m uppercase tracking-[0.18em] text-white/38'>Status: {maintenanceMode ? 'ON' : 'OFF'}</span>
                  <button
                    type='button'
                    onClick={() => {
                      setMaintenanceMode((current) => !current);
                    }}
                    className={`relative h-7 w-12 rounded-full transition ${maintenanceMode ? 'bg-[#ff7a00]' : 'bg-white/16'}`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${maintenanceMode ? 'left-6' : 'left-1'}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <div className='text-[11px] font-inter-m uppercase tracking-[0.2em] text-white/35'>System Health</div>
              <div className='mt-3 grid gap-4 md:grid-cols-2'>
                <div className='rounded-[16px] border border-white/6 bg-[#0f0f10] p-4'>
                  <div className='text-[11px] uppercase tracking-[0.16em] text-white/35'>CPU Load</div>
                  <div className='mt-2 text-2xl font-inter-b text-white'>24%</div>
                  <div className='mt-1 text-xs text-[#65d68e]'>+ 2%</div>
                </div>
                <div className='rounded-[16px] border border-white/6 bg-[#0f0f10] p-4'>
                  <div className='text-[11px] uppercase tracking-[0.16em] text-white/35'>Memory</div>
                  <div className='mt-2 text-2xl font-inter-b text-white'>4.2GB <span className='text-sm text-white/35'>/ 16GB</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='rounded-[22px] border border-white/6 bg-[#131314] p-5'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-2 text-[22px] font-inter-b text-white'>
              <FiCode className='text-white/70' />
              Script & Analytics Injection
              <span className='rounded-lg border border-white/8 bg-white/4 px-2 py-1 text-[10px] font-inter-s uppercase tracking-[0.16em] text-white/45'>
                {scriptScope}
              </span>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
              <button
                type='button'
                onClick={() => {
                  setScriptScope((current) => (current === 'HEAD / BODY' ? 'BODY ONLY' : 'HEAD / BODY'));
                }}
                className='rounded-lg border border-white/8 bg-white/4 px-3 py-2 text-xs font-inter-s text-white/65 transition hover:bg-white/8'
              >
                {scriptScope}
              </button>
              <button
                type='button'
                onClick={handleFormatCode}
                className='rounded-lg border border-white/8 bg-white/4 px-3 py-2 text-xs font-inter-s text-white/65 transition hover:bg-white/8'
              >
                Format Code
              </button>
              <button
                type='button'
                onClick={handleSaveScripts}
                className='inline-flex items-center rounded-lg bg-[linear-gradient(135deg,#ff7a00,#ff9e2c)] px-3 py-2 text-xs font-inter-b text-black transition hover:brightness-110'
              >
                <FiSave className='mr-2' />
                Save Scripts
              </button>
            </div>
          </div>

          <div className='mt-5 overflow-hidden rounded-[18px] border border-white/6 bg-[#09090a]'>
            <div className='flex items-center gap-2 border-b border-white/6 px-4 py-3 text-xs text-white/35'>
              <span className='h-2.5 w-2.5 rounded-full bg-[#ff5f57]' />
              <span className='h-2.5 w-2.5 rounded-full bg-[#febc2e]' />
              <span className='h-2.5 w-2.5 rounded-full bg-[#28c840]' />
              <span className='ml-3 font-inter-m'>index.html (injected)</span>
            </div>

            <textarea
              value={scriptValue}
              onChange={(event) => setScriptValue(event.target.value)}
              spellCheck={false}
              className='min-h-[250px] w-full resize-none bg-[#09090a] px-4 py-4 font-mono text-[13px] leading-6 text-white/82 outline-none'
            />
          </div>

          <div className='mt-3 text-xs text-white/30'>Scripts added here will be injected globally across all pages before the closing `&lt;/head&gt;` tag.</div>
        </div>
      </div>
    </section>
  );
}

export default WebsiteDashboard;
