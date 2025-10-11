import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem("aToken");

    };

    return (
        <nav className="bg-white shadow-md">
            <div className="flex justify-between items-center px-6 py-3">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <img
                        src={assets.admin_logo}
                        alt="logo"
                        className="w-30 "
                    />
                    <p className="text-gray-700 text-xl ml-5 font-medium">
                        {aToken ? "Admin" : "Doctor"}
                    </p>
                </div>

                {/* User info */}
                <div className="flex items-center gap-4">

                    {aToken || dToken && (
                        <button
                            onClick={handleLogout}
                            className="rounded-lg bg-red-500 cursor-pointer px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
