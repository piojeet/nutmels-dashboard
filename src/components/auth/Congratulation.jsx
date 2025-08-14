import React from 'react'
import illustration from "../../assets/illustration.png"

function Congratulation() {
  return (
    <div className='h-screen content-center'>
            <div className='max-w-[540px] w-full m-auto border border-white-color/20 bg-white-color/5 rounded-xl p-8'>
            <div className='flex justify-center items-center mb-12'><img src={illustration} alt="logo" className='block w-[130px]' /></div>
                <h2 className='font-inter-b text-white-color text-3xl text-center'>Almost There!</h2>
                <div className='font-inter-r text-white-color/60 text-center mt-1'>Check your email inbox and confirm your account</div>

                <div className='space-y-4 mt-6'>

                    <hr className='border-white-color' />
                    <div className='text-sm font-inter-r text-white-color/30 text-center'>Didn’t receive any mail?</div>

                    <div className='space-y-3'>
                        <button className='h-[48px] font-inter-r text-white-color/40 w-full bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl px-4 cursor-pointer flex items-center justify-center'>Resend Confirmation</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Congratulation