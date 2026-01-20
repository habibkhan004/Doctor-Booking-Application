import React from 'react'
import { createContext, useState } from 'react'
export const DoctorContext = createContext()
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])

    const getDoctorAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/doctor-appointments', { headers: { dToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
                console.log(data.appointments.reverse())
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const appointmentComplete = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                getDoctorAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentCancel = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } })
            if (data.success) {
                getDoctorAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const getDoctorProfile = async () => {
        try {
            const { data } = await axios.get(
                backendUrl + "/api/doctor/get-profile",
                { headers: { dToken } }
            );

            if (data.success) {
                return data.doctor;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch profile");
            return null;
        }
    };

    const updateDoctorProfile = async (updatedData) => {
        try {
            const formData = new FormData();
            formData.append("name", updatedData.name);
            formData.append("speciality", updatedData.speciality);
            formData.append("degree", updatedData.degree);
            formData.append("experience", updatedData.experience);
            formData.append("about", updatedData.about);
            formData.append("fees", updatedData.fees);
            formData.append(
                "address",
                JSON.stringify({
                    line1: updatedData.addressLine1,
                    line2: updatedData.addressLine2,
                })
            );

            if (updatedData.image) formData.append("image", updatedData.image);

            const { data } = await axios.patch(
                backendUrl + "/api/doctor/update-profile",
                formData,
                { headers: { dToken } }
            );

            if (data.success) {
                toast.success("Profile updated successfully");
                // refresh profile
                const updatedProfile = await getDoctorProfile();
                return updatedProfile;
            } else {
                toast.error(data.message);
                return null;
            }
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong while updating profile");
            return null;
        }
    };
    // context/DoctorContext.jsx
    const [reports, setReports] = useState([]);

    const getDoctorReports = async (filterType = "daily", fromDate = "", toDate = "") => {
        try {
            let url = `${backendUrl}/api/doctor/reports?type=${filterType}`;

            if (filterType === "custom") {
                if (!fromDate || !toDate) {
                    toast.error("Please select both from and to dates for custom reports");
                    return [];
                }
                url += `&startDate=${fromDate}&endDate=${toDate}`; // match backend query names
            }

            const { data } = await axios.get(url, { headers: { dToken } });

            if (data.success) {
                setReports(data.reports || []);
                return data.reports || [];
            } else {
                toast.error(data.message || "Failed to fetch reports");
                setReports([]);
                return [];
            }
        } catch (err) {
            console.error("getDoctorReports error:", err);
            toast.error(err.message || "Failed to fetch reports");
            setReports([]);
            return [];
        }
    };


    const value = {
        setDToken, dToken, appointments, getDoctorReports, setAppointments, updateDoctorProfile, getDoctorAppointments, appointmentCancel, appointmentComplete, getDoctorProfile
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;
