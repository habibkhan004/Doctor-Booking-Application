import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext)

    const linkClass =
        "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200";
    const activeClass = "bg-blue-600 text-white";
    const inactiveClass =
        "text-gray-700 hover:bg-gray-100 hover:text-blue-600";

    return (
        <div className="h-screen w-64 bg-white shadow-lg p-4">
            {aToken && (
                <ul className="space-y-2">
                    <NavLink
                        to="/admin-dashboard"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.home_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Dashboard</p>
                    </NavLink>

                    <NavLink
                        to="/all-appointments"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.appointment_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Appointments</p>
                    </NavLink>
                    <NavLink
                        to="/add-doctor"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.add_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Add Doctor</p>
                    </NavLink>



                    <NavLink
                        to="/doctor-list"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.people_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Doctor List</p>
                    </NavLink>
                    <NavLink
                        to="/admin-report"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.people_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Reports</p>
                    </NavLink>
                </ul>
            )}

            {dToken && (
                <ul className="space-y-2">
                    <NavLink
                        to="/doctor-dashboard"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.home_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Dashboard</p>
                    </NavLink>

                    <NavLink
                        to="/doctor-appointments"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.appointment_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Appointments</p>
                    </NavLink>



                    <NavLink
                        to="/doctor-profile"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.people_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Doctor Profile</p>
                    </NavLink>
                    <NavLink
                        to="/doctor-reports"
                        className={({ isActive }) =>
                            `${linkClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        <img src={assets.earning_icon} alt="" className="h-5 w-5" />
                        <p className="font-medium">Reports</p>
                    </NavLink>

                </ul>
            )}
        </div>
    );
};

export default SideBar;
