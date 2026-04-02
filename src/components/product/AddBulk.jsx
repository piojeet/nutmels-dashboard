import React, { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import excel from '../../assets/excel.png';

function AddBulk({ onClose }) {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const inputRef = useRef();

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= 10 * 1024 * 1024) {
      setFile(selected);
      setFileURL(URL.createObjectURL(selected));
    } else {
      alert('File must be less than 10MB');
    }
  };

  const openFileDialog = () => {
    inputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.size <= 10 * 1024 * 1024) {
      setFile(dropped);
      setFileURL(URL.createObjectURL(dropped));
    } else {
      alert('File must be less than 10MB');
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSave = () => {
    if (!file) return alert('Please select a file first');
    alert(`File saved: ${file.name}`);
    onClose();
  };

  const handleDownload = () => {
    if (!file || !fileURL) return;
    const link = document.createElement('a');
    link.href = fileURL;
    link.download = file.name;
    link.click();
  };

  const getFileIcon = (currentFile) => {
    if (!currentFile) return '/default-file.png';
    if (currentFile.type === 'application/vnd.ms-excel' || currentFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return excel;
    }
    if (currentFile.type === 'application/pdf') return '/pdf-icon.png';
    if (currentFile.type.startsWith('image/')) return URL.createObjectURL(currentFile);
    return '/default-file.png';
  };

  return (
    <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black-color/50 p-3 backdrop-blur-xs sm:p-4'>
      <form onSubmit={(e) => e.preventDefault()} className='m-auto flex h-fit w-full max-w-[600px] flex-col justify-between gap-6 rounded-xl bg-white-color/30 px-4 py-5 sm:gap-8 sm:px-6 sm:py-7'>
        <div className='flex items-center justify-between gap-4'>
          <div className='text-xl font-inter-m text-white-color'>Bulk Upload</div>
          <button type='button' onClick={onClose} className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-white-color text-3xl font-bold'>
            <IoCloseOutline />
          </button>
        </div>

        <div className='flex h-[260px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white-color/25 px-4 text-center sm:h-[300px]' onDrop={handleDrop} onDragOver={handleDragOver}>
          <div className='text-5xl text-white-color sm:text-6xl'>
            <FiUploadCloud />
          </div>
          <div className='space-y-2 text-center'>
            <div className='font-inter-r text-white-color'>Select a file or drag and drop here</div>
            <div className='font-inter-r text-white-color/60'>.XLS file size no more than 10MB</div>
          </div>
          <button type='button' onClick={openFileDialog} className='w-full rounded-sm border border-white-color/20 bg-yellow-color px-4 py-2.5 text-center text-sm font-inter-m text-white-color/70 sm:w-[110px]'>
            Select file
          </button>
          <input type='file' accept='.xls,.xlsx' ref={inputRef} hidden onChange={handleFileSelect} />
        </div>

        {file && (
          <div className='flex flex-col gap-3 rounded-lg border border-dashed border-white-color/25 p-3 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex min-w-0 items-center gap-2'>
              <span className='flex h-6 w-6 items-center justify-center overflow-hidden rounded-sm'>
                <img src={getFileIcon(file)} alt='file' className='h-full w-full object-contain' />
              </span>
              <span className='truncate text-xs text-white-color'>{file.name}</span>
            </div>
            <button type='button' onClick={handleDownload} className='w-full rounded-sm border border-white-color/20 bg-white-color px-4 py-2.5 text-center text-sm font-inter-m sm:w-[100px]'>
              Download
            </button>
          </div>
        )}

        <div className='flex justify-center'>
          <button type='button' onClick={handleSave} className='w-full rounded-sm border border-white-color/20 bg-[#2DCA95] px-4 py-2.5 text-center text-sm font-inter-m sm:w-[100px]'>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBulk;
