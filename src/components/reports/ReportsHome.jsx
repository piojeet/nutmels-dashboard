import React from 'react';
import { CgSearch } from 'react-icons/cg';
import { FiDownload } from 'react-icons/fi';
import { showAppToast } from '../../utils/appToast';

function ReportsHome() {
  const notify = (detail, severity = 'info') => {
    showAppToast({
      severity,
      summary: 'Reports',
      detail,
    });
  };

  const reports = [
    'customer-feedback-data.json',
    'sales-analytics-report.json',
    'website-traffic-report.json',
    'user-engagement-data.json',
    'monthly-revenue-report.json',
    'product-performance-data.json',
  ];

  return (
    <section>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='text-2xl font-bold text-white-color'>Reports</div>

        <div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
          <div className='relative w-full sm:w-auto'>
            <CgSearch className='absolute left-3 top-1/2 size-6 -translate-y-1/2 text-white-color' />
            <input type='text' className='w-full rounded-lg border border-white-color/20 bg-white-color/5 px-3 py-2.5 pl-10 text-sm text-white-color outline-none sm:w-[260px]' />
          </div>

          <button onClick={() => notify('Reports bundle download started.', 'success')} className='rounded-md bg-yellow-color px-4 py-2 text-sm font-medium text-black-color'>
            Download
          </button>
        </div>
      </div>

      <div className='mt-8 grid gap-4 md:grid-cols-2 md:gap-6'>
        {reports.map((name, i) => (
          <div
            key={i}
            className={`grid items-center gap-4 rounded-xl px-4 py-3 sm:grid-cols-[1fr_auto] ${
              i < 2 || i > 3 ? 'border border-white-color/20 bg-white-color/10' : 'border border-transparent bg-white-color/5'
            }`}
          >
            <div className='break-all font-medium text-white-color/60'>{name}</div>
            <div className='flex items-center justify-start sm:justify-center'>
              <button onClick={() => notify(`${name} download started.`)} className='flex items-center justify-center text-white-color/60'>
                <FiDownload />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ReportsHome;
