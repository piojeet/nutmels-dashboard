import React, { useState, useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import excel from '../../assets/excel.png'

function AddBulk({ onClose }) {
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const inputRef = useRef();

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.size <= 10 * 1024 * 1024) {
      setFile(selected);
      setFileURL(URL.createObjectURL(selected)); // preview + download ke liye
    } else {
      alert("File must be less than 10MB");
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
      alert("File must be less than 10MB");
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleSave = () => {
    if (!file) return alert("Please select a file first");
    // Yaha API upload logic add karna hoga
    alert(`File saved: ${file.name}`);
    onClose();
  };

  const handleDownload = () => {
    if (!file || !fileURL) return;
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = file.name;
    link.click();
  };

  const getFileIcon = (file) => {
    if (!file) return "/default-file.png";
  
    // Excel old (.xls) and new (.xlsx)
    if (
      file.type === "application/vnd.ms-excel" || 
      file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return excel;
    }
  
    // PDF
    if (file.type === "application/pdf") return "/pdf-icon.png";
  
    // Images preview
    if (file.type.startsWith("image/")) return URL.createObjectURL(file);
  
    return "/default-file.png";
  };
  
  

  return (
    <div className="fixed top-0 left-0 h-full w-full bg-black-color/50 backdrop-blur-xs z-50 flex justify-center items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="h-fit flex flex-col justify-between gap-8 max-w-[600px] w-full m-auto bg-white-color/30 py-7 px-6 rounded-xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="font-inter-m text-white-color text-xl">Bulk Upload</div>
          <button
            type="button"
            onClick={onClose}
            className="size-8 shrink-0 bg-white-color outline-none border-none rounded-lg flex items-center justify-center text-3xl font-bold cursor-pointer"
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* Upload box */}
        <div
          className="border border-dashed border-white-color/25 h-[300px] rounded-xl flex flex-col justify-center items-center gap-3"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="text-white-color text-6xl">
            <FiUploadCloud />
          </div>
          <div className="space-y-2 text-center">
            <div className="font-inter-r text-white-color">
              Select a file or drag and drop here
            </div>
            <div className="font-inter-r text-white-color/60">
              .XLS file size no more than 10MB
            </div>
          </div>
          <button
            type="button"
            onClick={openFileDialog}
            className="py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[110px] text-center font-inter-m text-sm bg-yellow-color cursor-pointer text-white-color/70"
          >
            Select file
          </button>
          <input
            type="file"
            accept=".xls,.xlsx"
            ref={inputRef}
            hidden
            onChange={handleFileSelect}
          />
        </div>

        {/* Agar file upload hui hai to ye dikhega */}
        {file && (
          <div className="border border-dashed border-white-color/25 rounded-lg flex justify-between gap-2 p-3 items-center">
            <div className="flex items-center gap-2">
              {/* Preview icon ya image */}
              <span className="w-6 h-6 rounded-sm flex items-center justify-center overflow-hidden">
                <img
                  src={getFileIcon(file)} // aap apna icon de sakte ho
                  alt="file"
                  className="w-full h-full object-contain"
                />
              </span>
              {/* File name */}
              <span className="text-xs text-white-color">{file.name}</span>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm bg-white-color cursor-pointer"
            >
              Download
            </button>
          </div>
        )}

        {/* Footer buttons */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={handleSave}
            className="py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm bg-[#2DCA95] cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBulk;
