import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserMd, FaUsers, FaCalendarCheck } from "react-icons/fa";

const Dashboard = () => {
    const {
        dashboardStats,
        latestAppointments,
        getDashboardStats,
    } = useContext(AdminContext);

    useEffect(() => {
        getDashboardStats();
    }, []);

    return (
        <div className="px-4 w-full">
            {/* Stats Cards */}
            <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-blue-100 p-6 rounded-xl shadow text-center flex flex-col items-center">
                    <FaUserMd className="text-blue-600 text-3xl mb-2" />
                    <h3 className="text-lg font-semibold">Total Doctors</h3>
                    <p className="text-3xl font-bold">{dashboardStats.totalDoctors}</p>
                </div>
                <div className="bg-green-100 p-6 rounded-xl shadow text-center flex flex-col items-center">
                    <FaUsers className="text-green-600 text-3xl mb-2" />
                    <h3 className="text-lg font-semibold">Total Patients</h3>
                    <p className="text-3xl font-bold">{dashboardStats.totalPatients}</p>
                </div>
                <div className="bg-yellow-100 p-6 rounded-xl shadow text-center flex flex-col items-center">
                    <FaCalendarCheck className="text-yellow-600 text-3xl mb-2" />
                    <h3 className="text-lg font-semibold">Total Appointments</h3>
                    <p className="text-3xl font-bold">{dashboardStats.totalAppointments}</p>
                </div>
            </div>

            {/* Latest Appointments */}
            <h3 className="text-xl font-semibold mb-4">Latest Appointments</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow rounded-lg">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="py-3 px-6 text-left">Patient</th>
                            <th className="py-3 px-6 text-left">Doctor</th>
                            <th className="py-3 px-6 text-left">Date & Time</th>
                            <th className="py-3 px-6 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {latestAppointments?.length > 0 ? (
                            latestAppointments.map((appt) => (
                                <tr key={appt._id} className="border-b hover:bg-gray-50">
                                    {/* Patient & Doctor in one column */}
                                    <td className="py-3 px-6">

                                        {/* Patient */}
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={appt.userData?.image || "/default-avatar.png"}
                                                className="w-8 h-8 rounded-full"
                                                alt={appt.userData?.name}
                                            />
                                            <span>{appt.userData?.name}</span>
                                        </div>




                                    </td>
                                    <td>
                                        {/* Doctor */}
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={appt.docData?.image || "/default-doctor.png"}
                                                className="w-8 h-8 rounded-full"
                                                alt={appt.docData?.name}
                                            />
                                            <span>{appt.docData?.name}</span>
                                        </div>

                                    </td>
                                    {/* Date & Time */}
                                    <td className="py-3 px-6">
                                        <div>{appt.slotDate}</div>
                                        <div className="text-gray-500 text-sm">{appt.slotTime}</div>
                                    </td>

                                    {/* Status */}
                                    <td className="py-3 px-6 text-center">
                                        {appt.cancelled ? (
                                            <span className="text-red-500 font-semibold">Cancelled</span>
                                        ) : appt.isCompleted ? (
                                            <span className="text-green-500 font-semibold">Completed</span>
                                        ) : (
                                            <span className="text-yellow-500 font-semibold">Pending</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-6">
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

export default Dashboard;
