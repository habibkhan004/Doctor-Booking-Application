import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)
    return (
        <div className='flex flex-col items-center gap-4 my-8 text-black'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center'>Simply browse through the extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-5 gap-4 pt-5 px-3'>
                {
                    doctors.slice(0, 10).map((item, index) => (
                        <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl hover:translate-y-[-10px] cursor-pointer ' key={index}>
                            <img className='bg-blue-50' src={item.image} alt="" />
                            <div className='p-4'>
                                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                                </div>
                                <p className='text-black font-medium text-sm'>{item.name}</p>
                                <p className='font-light text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-blue-100 text-gray-900 px-12 py-3 rounded-full mt-6 cursor-pointer'>more</button>
        </div>
    )
}

export default TopDoctors
