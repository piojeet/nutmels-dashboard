import React from 'react';
import { createPortal } from 'react-dom';
import { FiTrash2 } from 'react-icons/fi';

function DeleteConfirmationModal({ item, onCancel, onConfirm }) {
  if (!item) return null;

  return createPortal(
    <div className='fixed inset-0 z-[80] flex items-center justify-center bg-black-color/70 p-4 backdrop-blur-sm' role='presentation' onMouseDown={onCancel}>
      <div role='dialog' aria-modal='true' aria-labelledby='delete-dialog-title' className='w-full max-w-md rounded-xl border border-white-color/15 bg-[#132133] p-4 shadow-2xl' onMouseDown={(event) => event.stopPropagation()}>
        <div className='flex size-11 items-center justify-center rounded-xl bg-red-400/15 text-xl text-red-300'><FiTrash2 /></div>
        <h2 id='delete-dialog-title' className='mt-4 text-lg font-inter-b text-white-color'>Delete {item.label || 'this item'}?</h2>
        <p className='mt-2 text-sm leading-6 text-white-color/55'>Are you sure you want to remove this item? The change will be included when you save the footer.</p>
        <div className='mt-5 flex flex-wrap justify-end gap-3'>
          <button type='button' onClick={onCancel} className='h-10 rounded-lg border border-white-color/14 bg-white-color/[4%] px-4 text-sm font-inter-m text-white-color/75 transition hover:bg-white-color/[8%]'>Cancel</button>
          <button type='button' onClick={onConfirm} className='inline-flex h-10 items-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-inter-s text-white transition hover:bg-red-400'><FiTrash2 /> Yes, delete</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default DeleteConfirmationModal;
