import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-large px-6 md:px-10 lg:px-20  pt-20'>
            {/* Left side*/}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto'>
                <p className='text-3xl lg:text-5xl text-white font-semibold leading-tight '>Book appointment <br /> with Trusted Doctors</p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-semibold'>
                    <img className='w-28' src={assets.group_profiles} alt="" />
                    <p>Simply browse through our extensive list of trusted doctors, schedule</p>
                </div>
                <a className='flex items-center gap-2 bg-white px-8 py-3 font-semibold rounded-full text-black' href="#speciality">Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" /></a>
            </div>

            {/* right side*/}
            <div className='md:w-1/2 relative '>
                <img className='w-full md:absolute bottom-0 m-auto rounded-lg ' src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header
