import React from 'react'
import User from '../../assets/Rectangle 1393.png'
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdAttachFile } from "react-icons/md";
import { LuLink } from "react-icons/lu";
import { IoIosAt } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineFaceSmile } from "react-icons/hi2";


function SupportsCampaign() {
  return (
    <div className='flex gap-2'>
      <div className='w-[450px] shrink-0 bg-white-color/10 border border-white-color/20'>
        <div>
          <div className='px-3 py-2 flex items-center gap-8 text-sm font-inter-m text-white-color/30'>
            <button>Email</button>
            <button className='text-white-color'>Message</button>
            <button>Social Media</button>
          </div>

          <div className='pr-8'>
            <div className='flex border-b border-white-color/15 gap-4 px-4 py-3'>
              <div className='relative'>
                <div className='size-10 rounded-xl border border-white-color overflow-hidden'>
                  <img src={User} alt="user" className='size-full object-cover' />
                </div>
                <div className='size-3 border-2 border-white-color rounded-full bg-green-color absolute top-0.5 -right-1'></div>
              </div>
              <div>
                <div className='font-manrope-m text-white-color truncate text-nowrap w-[220px]'>Janet Adebayo</div>
                <div className='text-sm font-manrope-r text-white-color truncate text-nowrap w-[220px]'>Hi, i want make enquiries about yo</div>
              </div>
              <div className='flex flex-col justify-between'>
                <div className='bg-yellow-color w-fit leading-none py-0.5 text-xs px-2 font-inter-r text-white-color rounded-lg'>New</div>
                <div className='font-manrope-r text-xs text-white-color/30'>12:55 am</div>
              </div>
            </div>
            <div className='flex border-b border-white-color/15 gap-4 px-4 py-3'>
              <div className='relative'>
                <div className='size-10 rounded-xl border border-white-color overflow-hidden'>
                  <img src={User} alt="user" className='size-full object-cover' />
                </div>
                <div className='size-3 border-2 border-white-color rounded-full bg-green-color absolute top-0.5 -right-1'></div>
              </div>
              <div>
                <div className='font-manrope-m text-white-color truncate text-nowrap w-[220px]'>Janet Adebayo</div>
                <div className='text-sm font-manrope-r text-white-color truncate text-nowrap w-[220px]'>Hi, i want make enquiries about yo</div>
              </div>
              <div className='flex flex-col justify-between'>
                <div className='bg-yellow-color w-fit leading-none py-0.5 text-xs px-2 font-inter-r text-white-color rounded-lg'>New</div>
                <div className='font-manrope-r text-xs text-white-color/30'>12:55 am</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full bg-white-color/10 border border-white-color/20'>
        <div className='px-4'>
          <div className='block'>
            <div className='flex justify-between pt-6 pb-4 border-b border-white-color/30'>
              <div className='flex items-center gap-4'>
                <div className='size-10 rounded-xl border border-white-color overflow-hidden'>
                  <img src={User} alt="user" className='size-full object-cover' />
                </div>
                <div>
                  <div>Janet Adebayo</div>
                  <div className='flex items-center gap-1'>
                    <div className='size-3 border-2 border-white-color rounded-full bg-green-color'></div>
                    <div>Online</div>
                    <div className='ml-1'>12:55 am</div>
                  </div>
                </div>
              </div>
              <div>
                <button>Add Notes</button>
              </div>
            </div>

            <div className='pt-6 h-[400px] overflow-y-auto'>
              <div className=''>
                <div className='bg-white-color/10 max-w-[350px] w-full rounded-2xl p-4'>
                  <p>Hello, I want to make enquiries about your
                    product</p>
                </div>
                <div className='font-inter-r text-white-color/30 font-medium mt-1'>12:55 am</div>
              </div>
              <div className='flex flex-col justify-end items-end'>
                <div className='bg-white-color max-w-[350px] w-full rounded-2xl p-4 text-black-color'>
                  <p>Hello, I want to make enquiries about your
                    product</p>
                </div>
                <div className='font-inter-r text-white-color/30 font-medium mt-1 flex items-center gap-2 float-right clear-both'>12:55 am <span><IoCheckmarkCircle /></span></div>
              </div>
            </div>
          </div>

          <div className='bg-white-color/10 border border-white-color/20 mb-4 p-2 flex justify-between gap-4 rounded-xl mt-4'>
            <div className='flex items-center gap-3 w-full'>
              <button><MdAttachFile size={22} className='rotate-45' /></button>
              <button><LuLink size={22} /></button>
              <button><IoIosAt size={22} /></button>
              <button><HiOutlinePencilAlt size={22} /></button>
              <div className='w-full'><input type="text" placeholder='Type your message here...' className='w-full py-2 outline-none' /></div>
            </div>
            <div className='flex items-center gap-2'>
              <button><HiOutlineFaceSmile size={22} /></button>
              <button className='w-[52px] h-[44px] bg-yellow-color flex items-center justify-center rounded-xl'><svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.70505 0.132722C3.42702 -0.105071 4.20888 -0.0209886 4.87205 0.366121L14.8681 6.20206C16.227 6.99544 16.7274 8.81787 15.9863 10.2724C15.7286 10.7779 15.3404 11.1938 14.8681 11.4696L4.87205 17.3056C3.51317 18.0988 1.81049 17.5628 1.06931 16.1083C0.707759 15.3986 0.628555 14.5626 0.850562 13.7899L2.27537 8.83585L0.850562 3.88175C0.395753 2.29859 1.22621 0.620246 2.70505 0.132722ZM3.97751 2.12198C3.75649 1.99301 3.49547 1.96461 3.25486 2.04386C2.79715 2.1948 2.52532 2.68839 2.61033 3.18057L2.63669 3.29386L3.99119 8.00284H8.90134C9.41721 8.0029 9.83581 8.45068 9.83591 9.00284C9.83591 9.51568 9.47438 9.93824 9.00974 9.996L8.90134 10.0028H3.89451L2.63669 14.3778C2.56269 14.6354 2.58941 14.9147 2.70994 15.1513C2.93941 15.6011 3.44533 15.7867 3.87888 15.5995L3.97751 15.5497L13.9736 9.71378C14.1309 9.62186 14.2598 9.48272 14.3457 9.31436C14.5749 8.86419 14.4474 8.30825 14.0654 8.01944L13.9736 7.95792L3.97751 2.12198Z" fill="white" />
              </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SupportsCampaign