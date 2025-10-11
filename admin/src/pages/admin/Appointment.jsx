import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const Appointment = () => {
    const { appointments, getAllAppointments } = useContext(AdminContext);

    useEffect(() => {
        getAllAppointments(); // fetch appointments on load
    }, []);

    return (
        <div className="p-2 w-full">
            <h2 className="text-2xl font-bold mb-3">All Appointments</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">S.No</th>
                            <th className="py-3 px-6 text-left">Patient</th>
                            <th className="py-3 px-6 text-left">Age (years)</th>
                            <th className="py-3 px-6 text-left">Doctor</th>
                            <th className="py-3 px-6 text-left">Fees</th>
                            <th className="py-3 px-6 text-left">Appointment</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {appointments.length > 0 ? (
                            appointments.reverse().map((appt, index) => (
                                <tr
                                    key={appt._id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    {/* S.No */}
                                    <td className="py-3 px-6">{index + 1}</td>

                                    {/* Patient with image */}
                                    <td className="py-3 px-6 flex items-center gap-3">
                                        <img
                                            src={appt.userData?.image || "/default-avatar.png"}
                                            alt={appt.userData?.name}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                        <span>{appt.userData?.name}</span>
                                    </td>

                                    {/* Age */}
                                    <td className="py-3 px-6">
                                        {appt.userData?.dob
                                            ? new Date().getFullYear() -
                                            new Date(appt.userData.dob).getFullYear()
                                            : "-"}
                                    </td>

                                    {/* Doctor with image */}
                                    <td className="py-3 px-6 flex items-center gap-3">
                                        <img
                                            src={appt.docData?.image || "/default-doctor.png"}
                                            alt={appt.docData?.name}
                                            className="w-10 h-10 rounded-full object-cover border"
                                        />
                                        <span>{appt.docData?.name}</span>
                                    </td>

                                    {/* Fees */}
                                    <td className="py-3 px-6">Rs {appt.amount}</td>

                                    {/* Appointment Date + Time */}
                                    <td className="py-3 px-6">
                                        {appt.slotDate ? (
                                            <div>
                                                <div className="font-medium">
                                                    {appt.slotDate}
                                                </div>
                                                <div className="text-gray-500 mt-2 text-sm">
                                                    {appt.slotTime}
                                                </div>
                                            </div>
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                    {/* Status */}
                                    <td className="py-3 px-6 text-center">
                                        {appt.cancelled ? (
                                            <span className="text-red-500 font-semibold">
                                                Cancelled
                                            </span>
                                        ) : appt.isCompleted ? (
                                            <span className="text-green-500 font-semibold">
                                                Completed
                                            </span>
                                        ) : (
                                            <span className="text-yellow-500 font-semibold">
                                                Pending
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-6">
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

export default Appointment;
