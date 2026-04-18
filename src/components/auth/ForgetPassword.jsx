import React from 'react'
import { Link } from 'react-router-dom'
import { showAppToast } from '../../utils/appToast'

function ForgetPassword() {
  const notify = (detail, severity = 'info') => {
    showAppToast({
      severity,
      summary: 'Password Reset',
      detail,
    });
  };

  return (
    <div className='h-screen content-center'>
            <div className='max-w-[540px] w-full m-auto border border-white-color/20 bg-white-color/5 rounded-xl p-8'>
                <h2 className='font-inter-b text-white-color text-3xl text-center'>Password Reset</h2>
                <div className='font-inter-r text-white-color/60 text-center mt-1'>We Will Help You Reset your Password</div>

                <div className='space-y-4 mt-6'>
                    <form
                      action=""
                      className='space-y-4 mb-8'
                      onSubmit={(e) => {
                        e.preventDefault();
                        notify('Password reset link sent to the entered email.', 'success');
                      }}
                    >
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='font-inter-r text-white-color'>Email</label>
                            <input type="email" id='email' className='bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl h-[48px] px-4 placeholder:text-white-color/30 text-sm text-white-color font-inter-r outline-none' placeholder='Enter Email Address' />
                        </div>
                        <button type='submit' className='h-[48px] bg-yellow-color rounded-[4px] flex items-center justify-center w-full cursor-pointer hover:bg-yellow-color/80 font-inter-b text-black-color'>Reset Password</button>
                    </form>

                    <hr className='border-white-color' />
                    <div className='text-sm font-inter-r text-white-color/30 text-center'>Remembered your Password?</div>

                    <div className='space-y-3'>
                        <Link to={'/login'} className='h-[48px] font-inter-r text-white-color/40 w-full bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl px-4 cursor-pointer flex items-center justify-center'>Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ForgetPassword
