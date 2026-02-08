import React from 'react'
import { IoArrowForward } from 'react-icons/io5'

// Reusable row component
const InputRow = ({ label, placeholder1 = "", placeholder2 = "" }) => (
  <div className="grid grid-cols-[.6fr_1fr]">
    <div className="text-sm text-white-color/60 font-inter-m font-medium">
      {label}
    </div>
    <div className="grid grid-cols-2 gap-2">
      <input
        type="text"
        className="bg-white-color/5 border border-white-color/20 px-3 h-[30px] outline-none text-white-color rounded-sm pb-1 text-end"
        placeholder={placeholder1}
      />
      <input
        type="text"
        className="bg-white-color/5 border border-white-color/20 px-3 h-[30px] outline-none text-white-color rounded-sm pb-1"
        placeholder={placeholder2}
      />
    </div>
  </div>
)

function ProductNutritional() {
  // Labels ke saath placeholder define kar do
  const leftInputs = [
    { label: "Serving Size", ph1: "100g", ph2: "" },
    { label: "Calories", ph1: "kcal", ph2: "" },
    { label: "Total Fat", ph1: "g", ph2: "" },
    { label: "Saturated Fat", ph1: "g", ph2: "" },
    { label: "Trans Fat", ph1: "g", ph2: "" },
    { label: "Cholesterol", ph1: "mg", ph2: "" },
    { label: "Sodium", ph1: "mg", ph2: "" },
    { label: "Total Carbohydrates", ph1: "g", ph2: "" },
  ]

  const rightInputs = [
    { label: "Dietary Fiber", ph1: "g", ph2: "" },
    { label: "Total Sugars", ph1: "g", ph2: "" },
    { label: "Added Sugars", ph1: "g", ph2: "" },
    { label: "Protein", ph1: "g", ph2: "" },
    { label: "Vitamin D", ph1: "mcg", ph2: "" },
    { label: "Calcium", ph1: "mg", ph2: "" },
    { label: "Iron", ph1: "mg", ph2: "" },
    { label: "Potassium", ph1: "mg", ph2: "" },
  ]

  return (
    <div className="h-full">
      <form action="" className="h-full flex flex-col justify-between gap-4">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {leftInputs.map((item, i) => (
              <InputRow
                key={i}
                label={item.label}
                placeholder1={item.ph1}
                placeholder2={item.ph2}
              />
            ))}
          </div>
          <div className="space-y-4">
            {rightInputs.map((item, i) => (
              <InputRow
                key={i}
                label={item.label}
                placeholder1={item.ph1}
                placeholder2={item.ph2}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button className="py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm bg-[#2DCA95] cursor-pointer">
            Save
          </button>
          <button className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center">
            Next <IoArrowForward />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductNutritional
