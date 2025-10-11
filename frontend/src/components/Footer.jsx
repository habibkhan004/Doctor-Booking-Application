import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm '>
                {/* ----------- left setion --------- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="" />
                    <p className='w-2/3 text-justify text-gray-900 leading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, natus ducimus? Quia voluptas repellendus expedita voluptates fugit deleniti beatae nam,Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, soluta.</p>
                </div>
                {/* ----------- center setion --------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>Company</p>
                    <ul className='flex flex-col gap-2'>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/* ----------- right setion --------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2'>
                        <li>+92 311 9966378</li>
                        <li>hkhabib105@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright &copy; 2025 - Perscripto - All right Reserved</p>
            </div>
        </div>
    )
}

export default Footer
