import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorAppointments = () => {
    const { dToken, appointments, getDoctorAppointments, appointmentComplete, appointmentCancel } =
        useContext(DoctorContext);

    useEffect(() => {
        if (dToken) getDoctorAppointments();
    }, [dToken]);

    return (
        <div className="p-5 w-full">
            <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left">S.No</th>
                            <th className="py-3 px-6 text-left">Patient</th>
                            <th className="py-3 px-6 text-left">Age</th>
                            <th className="py-3 px-6 text-left">Date & Time</th>
                            <th className="py-3 px-6 text-left">Fees</th>
                            <th className="py-3 px-6 text-left">Payment</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {appointments.length > 0 ? (
                            appointments.map((appt, index) => (
                                <tr key={appt._id} className="border-b hover:bg-gray-50">
                                    {/* Serial Number */}
                                    <td className="py-3 px-6">{index + 1}</td>

                                    {/* Patient Image + Name */}
                                    <td className="py-3 px-6 flex items-center gap-2">
                                        <img
                                            src={appt.userData?.image || "/default-avatar.png"}
                                            className="w-8 h-8 rounded-full"
                                            alt={appt.userData?.name}
                                        />
                                        <span>{appt.userData?.name || "Unknown"}</span>
                                    </td>

                                    {/* Age */}

                                    <td className="py-3 px-6">
                                        {appt.userData?.dob
                                            ? new Date().getFullYear() -
                                            new Date(appt.userData.dob).getFullYear()
                                            : "-"}
                                    </td>

                                    {/* Date & Time */}
                                    <td className="py-3 px-6">
                                        <div>{appt.slotDate}</div>
                                        <div className="text-gray-500 text-xs">{appt.slotTime}</div>
                                    </td>

                                    {/* Fees */}
                                    <td className="py-3 px-6">Rs {appt.amount || "0"}</td>
                                    <td className="py-3 px-6">
                                        {appt.payment ? 'Online' : 'Cash'}
                                    </td>
                                    {/* Action */}
                                    {/* Action */}
                                    <td className="py-3 px-6 text-center flex gap-2 justify-center">
                                        {(!appt.isCompleted && !appt.cancelled) ? (
                                            <>
                                                <button
                                                    onClick={() => appointmentComplete(appt._id)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                                                >
                                                    Complete
                                                </button>
                                                <button
                                                    onClick={() => appointmentCancel(appt._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : appt.isCompleted ? (
                                            <span className="text-green-600 font-semibold">Completed</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">Cancelled</span>
                                        )}
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-6 text-gray-500 font-medium"
                                >
                                    No appointments found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DoctorAppointments;
