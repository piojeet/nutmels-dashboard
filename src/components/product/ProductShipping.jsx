import React from 'react'
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

// Common input style
const inputClass =
  "bg-white-color/5 border border-white-color/20 px-3 h-[30px] outline-none text-white-color rounded-sm pb-1 w-full";

// Column with multiple inputs
const ColumnGroup = ({ title, count = 5 }) => (
  <div className="space-y-4">
    <div className="font-inter-m font-medium text-white-color/60 text-sm text-center">
      {title}
    </div>
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <input key={i} type="text" className={inputClass} />
      ))}
    </div>
  </div>
);
function ProductShipping() {
  const columns = ["Length (cm)", "Breadth (cm)", "Height (cm)", "Weight (gm)", "Add. info"];
  return (
    <div className="h-full">
      <form className="h-full flex flex-col justify-between gap-4">
        <div>

        {/* Variants + Table */}
        <div className="grid grid-cols-[.4fr_1fr] gap-3">
          {/* Variants */}
          <div className="space-y-4">
            <div className="font-inter-m font-medium text-white-color/60 text-sm">
            Package Type
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <input key={i} type="text" className={inputClass} />
              ))}
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-5 gap-3">
            {columns.map((col, i) => (
              <ColumnGroup key={i} title={col} />
            ))}
          </div>
        </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 rounded-sm w-[120px] text-sm text-white-color flex justify-center items-center gap-1">
            <IoArrowBack /> Previous
          </button>
          <button className="py-2.5 px-4 border border-white-color/20 rounded-sm w-[100px] text-sm bg-[#2DCA95]">
            Save
          </button>
          <button className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 rounded-sm w-[100px] text-sm text-white-color flex justify-center items-center gap-1">
            Next <IoArrowForward />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductShipping