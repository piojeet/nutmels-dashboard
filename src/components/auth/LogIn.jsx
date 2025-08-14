import React, { useState } from 'react'
import logo from '../../assets/header-logo-nuts 1.png'
import { Link } from 'react-router-dom'
import facebook from '../../assets/Facebook_Logo.png'
import google from '../../assets/Google_Logo.png'
import { GiCheckMark } from 'react-icons/gi'

function LogIn() {

    const [checked, setChecked] = useState(false);


    return (
        <div className='h-screen content-center'>
            <div className='max-w-[540px] w-full m-auto border border-white-color/20 bg-white-color/5 rounded-xl p-8'>
                <div className='flex justify-center items-center mb-6'><img src={logo} alt="logo" className='block w-[145px]' /></div>
                <h2 className='font-inter-b text-white-color text-3xl text-center'>Sign In</h2>
                <div className='font-inter-r text-white-color/60 text-center mt-1'>New to Our Product? {" "} <Link to={'/signup'} className='text-yellow-color'>Create an Account</Link></div>

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

                        <span className="px-2 py-2 inline-block">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={checked}
                                    onChange={() => setChecked(!checked)}
                                />
                                <span
                                    className={`size-4 border flex items-center justify-center rounded-xs ${checked ? 'border-yellow-color' : 'border-white-color/30'
                                        }`}
                                >
                                    <GiCheckMark
                                        className={`text-yellow-color text-[10px] ${checked ? 'block' : 'hidden'
                                            }`}
                                    />
                                </span>
                                <span className='text-sm font-inter-r text-white-color/30 text-center'>Keep me signed in</span>
                            </label>
                        </span>

                        <button type='submit' className='h-[48px] bg-yellow-color rounded-[4px] flex items-center justify-center w-full cursor-pointer hover:bg-yellow-color/80 font-inter-b text-black-color'>Sign In</button>
                    </form>

                    <div className='text-center space-y-1'>
                        <Link to={'/forget-password'} className='text-sm font-inter-r font-normal text-yellow-color'>Forgot your password?</Link>
                    </div>
                    <hr className='border-white-color' />
                    <div className='text-sm font-inter-r text-white-color/30 text-center'>Or sign in using:</div>

                    <div className='space-y-3'>
                        <button className='h-[48px] flex items-center justify-center font-inter-r text-white-color/40 w-full bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl px-4 cursor-pointer gap-2'><img src={google} alt="google" className='size-7' /> Continue with Google</button>
                        <button className='h-[48px] flex items-center justify-center font-inter-r text-white-color/40 w-full bg-white-color/[3%] border-[0.5px] border-white-color/20 rounded-xl px-4 cursor-pointer gap-2'><img src={facebook} alt="facebook" className='size-7' /> Continue with Facebook</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn