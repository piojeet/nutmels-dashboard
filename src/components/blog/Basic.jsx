import React from 'react'
import { IoArrowForward } from 'react-icons/io5'

function Basic() {
    return (
        <div className='h-full'>
            <form action="" className='h-full flex flex-col justify-between gap-4'>
                <div className='space-y-6'>
                    <div className='grid grid-cols-[.4fr_1fr] content-center'>
                        <div className='font-inter-m text-white-color/60'>Category</div>
                        <div>
                            <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full px-4 text-white-color' />
                        </div>
                    </div>
                    <div className='grid grid-cols-[.4fr_1fr] content-center'>
                        <div className='font-inter-m text-white-color/60'>Title</div>
                        <div>
                            <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full px-4 text-white-color' />
                        </div>
                    </div>
                    <div className='grid grid-cols-[.4fr_1fr] content-center'>
                        <div className='font-inter-m text-white-color/60'>Slug</div>
                        <div>
                            <input type="text" className='bg-white-color/5 border border-white-color/20 outline-none rounded-sm h-10 w-full px-4 text-white-color' />
                        </div>
                    </div>
                    <div className='grid grid-cols-[.4fr_1fr] content-center'>
                        <div className='font-inter-m text-white-color/60'>Brief description</div>
                        <div>
                            <textarea
                                className="w-full bg-white-color/5 border border-white-color/20 px-3 py-2.5 outline-none text-white-color text-sm max-h-[400px] min-h-[250px] rounded-md"
                            />
                        </div>
                    </div>
                </div>

                <div className='flex justify-end gap-4'>
                    <button className='py-2.5 px-4 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm bg-[#2DCA95] cursor-pointer'>Save</button>
                    <button className='py-2.5 px-4 bg-white-color/5 border border-white-color/20 outline-none rounded-sm w-[100px] text-center font-inter-m text-sm text-white-color cursor-pointer flex justify-center gap-1 items-center'>Next <IoArrowForward /></button>
                </div>
            </form>
        </div>
    )
}

export default Basic