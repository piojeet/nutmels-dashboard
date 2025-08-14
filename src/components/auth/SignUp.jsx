import React from 'react'
import logo from '../../assets/header-logo-nuts 1.png'
import { Link } from 'react-router-dom'
import facebook from '../../assets/Facebook_Logo.png'
import google from '../../assets/Google_Logo.png'

function SignUp() {
    return (
        <div className='h-screen content-center'>
            <div className='max-w-[540px] w-full m-auto border border-white-color/20 bg-white-color/5 rounded-xl p-8'>
                <div className='flex justify-center items-center mb-6'><img src={logo} alt="logo" className='block w-[145px]' /></div>
                <h2 className='font-inter-b text-white-color text-3xl text-center'>Create an Account</h2>
                <div className='font-inter-r text-white-color/60 text-center mt-1'>Have an Account? {" "} <Link to={'/login'} className='text-yellow-color'>Sign In</Link></div>

                <div className='space-y-4 mt-6'>
                    <form action="" className='space-y-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="email" className='font-inter-r text-white-color'>Email</label>
                            <input type="email" id='email' className='bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl h-[48px] px-4 placeholder:text-white-color/30 text-sm text-white-color font-inter-r outline-none' placeholder='Enter Email Address' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor="password" className='font-inter-r text-white-color'>Password</label>
                            <input type="email" id='password' className='bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl h-[48px] px-4 placeholder:text-white-color/30 text-sm text-white-color font-inter-r outline-none' placeholder='Enter Email Address' />
                        </div>
                        <button type='submit' className='h-[48px] bg-yellow-color rounded-[4px] flex items-center justify-center w-full cursor-pointer hover:bg-yellow-color/80 font-inter-b text-black-color'>Create Account</button>
                    </form>

                    <div className='text-center space-y-1'>
                        <div className='text-sm font-inter-r text-white-color/30'>By creating account, you agree to our</div>
                        <div className='text-sm font-inter-r font-normal text-yellow-color'>Terms of Service</div>
                    </div>
                    <hr className='border-white-color' />
                    <div className='text-sm font-inter-r text-white-color/30 text-center'>Or create an account using:</div>

                    <div className='space-y-3'>
                        <button className='h-[48px] flex items-center justify-center font-inter-r text-white-color/40 w-full bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl px-4 cursor-pointer gap-2'><img src={google} alt="google" className='size-7' /> Continue with Google</button>
                        <button className='h-[48px] flex items-center justify-center font-inter-r text-white-color/40 w-full bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl px-4 cursor-pointer gap-2'><img src={facebook} alt="facebook" className='size-7' /> Continue with Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp