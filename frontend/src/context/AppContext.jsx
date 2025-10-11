import { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([])
    const currencySymbol = 'Rs'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                const availableDoctors = data.doctors.filter(doctor => doctor.available === true)
                setDoctors(availableDoctors)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfilesData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value = {
        doctors,
        currencySymbol,
        token,
        setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfilesData,
        getDoctorsData,
    }
    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfilesData()
        } else {
            setUserData(false)
        }
    }, [token])
    return (
        <AppContext.Provider value={value}>
            {
                props.children
            }
        </AppContext.Provider>
    )
}

export default AppContextProvider