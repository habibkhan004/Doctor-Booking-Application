import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
    return (
        <div className='bg-blue-500  rounded-lg px-6 my-20 flex'>
            <div className='flex-1 py-8 lg:py-12'>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl p-2 font-semibold text-white '>
                    <p>Book Appointment</p>
                    <p className='mt-5'>With 100+ Trusted Doctors</p>
                </div>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='bg-white text-sm px-8 py-3 text-black mt-5 rounded-full cursor-pointer'>Create account</button>
            </div>

            <div className='relative lg:w-[270px] md:block hidden'>
                <img className='w-full absolute bottom-0 right-10 max-w-md' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner
