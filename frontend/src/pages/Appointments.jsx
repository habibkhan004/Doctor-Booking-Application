import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointments = () => {
    const navigate = useNavigate()
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const DaysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const getAvailableSlots = async () => {
        setDocSlots([])

        let today = new Date()
        for (let i = 0; i < 10; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 2 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                })
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }
    const bookAppointment = async () => {
        if (!token) {
            toast.warn("Login to book appointment")
            return navigate('/login')
        }
        try {
            const date = docSlots[slotIndex][0].datetime
            const day = date.getDate()
            const month = date.getMonth() + 1
            const year = date.getFullYear()

            const slotDate = day + "_" + month + "_" + year
            const { data } = await axios.post(backendUrl +
                '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
        console.log(docInfo)
    }
    useEffect(() => {
        if (doctors.length > 0 && docId) {
            const docInfo = doctors.find(doc => doc._id === docId)
            setDocInfo(docInfo)
            console.log("Found doctor:", docInfo)
        }
    }, [doctors, docId])

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])
    useEffect(() => {
        console.log(docSlots)
    }, [docSlots])

    return docInfo && (
        <div>
            {/* Doctor details */}
            {/* Doctor details */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto">
                {/* Doctor Image */}
                <div className="flex-shrink-0 w-full sm:w-48 md:w-56 lg:w-64">
                    <img
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg bg-blue-600"
                        src={docInfo.image}
                        alt={docInfo.name}
                    />
                </div>

                {/* Doctor Info */}
                <div className="flex-1 border border-gray-300 rounded-lg p-4 sm:p-6 bg-white flex flex-col gap-2">
                    {/* Name */}
                    <p className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl font-semibold text-gray-900 break-words">
                        {docInfo.name}
                        <img src={assets.verified_icon} alt="verified" className="w-5 h-5" />
                    </p>

                    {/* Degree + Speciality + Experience */}
                    <div className="flex flex-wrap gap-2 items-center text-gray-700">
                        <p className="break-words">{docInfo.degree} - {docInfo.speciality}</p>
                        <button className="px-2 py-1 text-xs rounded-full border">{docInfo.experience}</button>
                    </div>

                    {/* About Section */}
                    <div className="mt-2">
                        <p className="flex items-center gap-2 font-medium text-gray-800">
                            <img src={assets.info_icon} alt="info" className="w-4 h-4" /> About
                        </p>
                        <p className="mt-1 text-gray-700 break-words">{docInfo.about}</p>
                    </div>

                    {/* Fee */}
                    <p className="mt-4 font-bold text-gray-800">
                        Appointment fee: {docInfo.fees} {currencySymbol} /-
                    </p>
                </div>
            </div>


            {/* booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700'>
                <p>Booking Slots</p>
                <div className='flex -gap-3 items-center mt-4'>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-600 text-white' : 'border border-gray-200'}`} key={index}>
                                <p>{item[0] && DaysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 pb-3'>
                    {
                        docSlots.length && docSlots[slotIndex].map((item, index) => (
                            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-blue-600 text-white' : 'border border-gray-300'}`} key={index}>
                                {item.time.toLowerCase()}
                            </p>
                        ))
                    }
                </div>

                <button onClick={bookAppointment} className='bg-blue-600 text-white text-sm font-medium m-3 px-14 py-3 mt-5 cursor-pointer rounded-full'>Book Appointment</button>
            </div>
            {/* listing related Doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointments
