import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);

    // Fetch appointments
    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Cancel appointment
    const handleCancelAppointment = async (appointmentId, docId, slotDate, slotTime) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId, docId, slotDate, slotTime },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                // Update appointment state to mark as cancelled
                setAppointments(prev =>
                    prev.map(app => (app._id === appointmentId ? { ...app, cancelled: true } : app))
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    // Reschedule appointment
    const handleReschedule = async (appointment) => {
        try {
            const newSlotDate = prompt("Enter new date (DD_MM_YYYY):", appointment.slotDate);
            const newSlotTime = prompt("Enter new time (HH:MM AM/PM):", appointment.slotTime);

            if (!newSlotDate || !newSlotTime) return;

            const { data } = await axios.post(
                `${backendUrl}/api/user/reschedule-appointment`,
                {
                    appointmentId: appointment._id,
                    docId: appointment.docData._id,
                    oldSlotDate: appointment.slotDate,
                    oldSlotTime: appointment.slotTime,
                    newSlotDate,
                    newSlotTime
                },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                setAppointments(prev =>
                    prev.map(app =>
                        app._id === appointment._id
                            ? { ...app, slotDate: newSlotDate, slotTime: newSlotTime }
                            : app
                    )
                );
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        if (token) getAppointments();
    }, [token]);

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            {appointments.length === 0 && <p className="text-center text-gray-500">No appointments found.</p>}
            {appointments.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-4 border-b"
                >
                    {/* Doctor Image */}
                    <div className="flex-shrink-0 w-full sm:w-32">
                        <img
                            className="w-full h-32 object-cover rounded bg-indigo-50"
                            src={item.docData.image}
                            alt={item.docData.name}
                        />
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 text-sm text-black mt-2 sm:mt-0">
                        <p className="text-neutral-800 font-semibold text-lg sm:text-xl">{item.docData.name}</p>
                        <p className="text-gray-600">{item.docData.speciality}</p>
                        <p className="text-sm font-medium mt-2 text-gray-700">
                            Address: {item.docData.address.line1} {item.docData.address.line2}
                        </p>
                        <p className="text-sm mt-2 font-medium text-gray-700">
                            Date: {item.slotDate} | Time: {item.slotTime}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    {!item.cancelled && (
                        <div className="flex flex-col gap-2 justify-end mt-3 sm:mt-0 sm:flex-shrink-0">
                            <button className="text-sm bg-blue-500 cursor-pointer font-medium text-white px-4 py-2 rounded hover:bg-blue-600">
                                Pay Online
                            </button>

                            <button
                                onClick={() => handleCancelAppointment(item._id, item.docData._id, item.slotDate, item.slotTime)}
                                className="text-sm bg-red-400 cursor-pointer font-medium text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Cancel Appointment
                            </button>

                            <button
                                onClick={() => handleReschedule(item)}
                                className="text-sm bg-yellow-500 cursor-pointer font-medium text-white px-4 py-2 rounded hover:bg-yellow-600"
                            >
                                Reschedule
                            </button>
                        </div>
                    )}

                    {item.cancelled && (
                        <div className="flex items-center mt-3 sm:mt-0">
                            <span className="text-sm font-medium text-gray-500 px-4 py-2 rounded bg-gray-200">
                                Cancelled
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MyAppointments;
