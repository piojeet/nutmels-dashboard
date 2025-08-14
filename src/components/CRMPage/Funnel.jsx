import React from 'react'
import { GoChevronDown } from 'react-icons/go'

function Funnel() {
  return (
    <div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='w-full col-span-2'>
          <div className='backdrop-blur-md bg-white-color/20 py-1 px-4 text-white-color rounded-sm shadow-side-bar'>Open(5) </div>

          <div>
            <div>
              <div>Identify (2)</div>
              <div>
                <div>
                  <div>
                    <div>10/03/2005</div>
                    <div>
                      <div>Uday Kumar</div>
                      <div><GoChevronDown /></div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <div><img src="" alt="" /></div>
                      <div>Aman Priyadarshi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className='col-span-1'>
          <div className='backdrop-blur-md bg-white-color/20 py-1 px-4 text-white-color rounded-sm shadow-side-bar'>Close (1)</div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Funnel