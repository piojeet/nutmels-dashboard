import React, { useState } from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5'

function ProductBrief() {
  const [activeSection, setActiveSection] = useState("brief")

  const sections = [
    { key: "brief", label: "Brief description" },
    { key: "ingredients", label: "Ingredients" },
    { key: "benefits", label: "Benefits" },
    { key: "rdi", label: "Recommended daily intake (RDI)" },
  ]

  return (
    <div className="h-full">
      <form action="" className="h-full flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-[.4fr_1fr] gap-4">
            {/* Left side buttons */}
            <div className="flex flex-col items-start space-y-4">
              {sections.map((sec) => (
                <button
                  type="button"
                  key={sec.key}
                  // onClick={() => setActiveSection(sec.key)}
                  className={`font-inter-m tracking-wider text-start ${
                    activeSection === sec.key
                      ? "text-white-color"
                      : "text-white-color/60"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Right side textarea */}
            <div>
              {activeSection === "brief" && (
                <textarea
                  placeholder="Enter brief description..."
                  className="w-full bg-white-color/5 border border-white-color/20 px-3 py-2.5 outline-none text-white-color text-sm max-h-[400px] min-h-[250px] rounded-md"
                />
              )}
              {activeSection === "ingredients" && (
                <textarea
                  placeholder="Enter ingredients..."
                  className="w-full bg-white-color/5 border border-white-color/20 px-3 py-2.5 outline-none text-white-color text-sm max-h-[400px] min-h-[250px] rounded-md"
                />
              )}
              {activeSection === "benefits" && (
                <textarea
                  placeholder="Enter benefits..."
                  className="w-full bg-white-color/5 border border-white-color/20 px-3 py-2.5 outline-none text-white-color text-sm max-h-[400px] min-h-[250px] rounded-md"
                />
              )}
              {activeSection === "rdi" && (
                <textarea
                  placeholder="Enter recommended daily intake..."
                  className="w-full bg-white-color/5 border border-white-color/20 px-3 py-2.5 outline-none text-white-color text-sm max-h-[400px] min-h-[250px] rounded-md"
                />
              )}
            </div>
          </div>

          {/* Top navigation buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => {
                const idx = sections.findIndex((s) => s.key === activeSection)
                if (idx > 0) setActiveSection(sections[idx - 1].key)
              }}
              className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[120px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center"
            >
              <IoArrowBack /> Previous
            </button>
            <button
              type="button"
              onClick={() => {
                const idx = sections.findIndex((s) => s.key === activeSection)
                if (idx < sections.length - 1)
                  setActiveSection(sections[idx + 1].key)
              }}
              className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center"
            >
              Next <IoArrowForward />
            </button>
          </div>
        </div>

        {/* BOTTOM navigation untouched */}
        <div className="flex justify-end gap-4">
          <button className="py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[120px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center">
            <IoArrowBack /> Previous
          </button>
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

export default ProductBrief
