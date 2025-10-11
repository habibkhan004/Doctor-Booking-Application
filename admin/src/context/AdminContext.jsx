import axios from 'axios'
import React, { useState } from 'react'
import { createContext } from 'react'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])  // ✅ new state
    const [latestAppointments, setLatestAppointments] = useState([]);

    // Get all doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Get all appointments
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/all-appointments', {}, { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments)   // ✅ fixed
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Change availability of doctor
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const [dashboardStats, setDashboardStats] = useState({
        totalDoctors: 0,
        totalPatients: 0,
        totalAppointments: 0,
    });


    const getDashboardStats = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/admin/dashboard-stats",
                { headers: { aToken } }
            );
            if (data.success) {
                setDashboardStats(data.stats);
                setLatestAppointments(data.latestAppointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };


    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        appointments,
        dashboardStats,
        latestAppointments,
        getAllDoctors,
        changeAvailability,
        getAllAppointments,
        getDashboardStats,
    };


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
