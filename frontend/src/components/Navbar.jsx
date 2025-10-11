import React, { useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken } = useContext(AppContext);

    const logOut = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className="flex items-center justify-between py-4 mb-5 border-b border-b-gray-200">
            <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />
            <ul className="hidden md:flex items-start gap-6 font-medium  ">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `py-1 hover:text-blue-800 ${isActive ? 'text-blue-800' : 'text-black'}`
                    }
                >
                    <li>Home</li>
                </NavLink>

                <NavLink
                    to="/doctors"
                    className={({ isActive }) =>
                        `py-1 hover:text-blue-800 ${isActive ? 'text-blue-800' : 'text-black'}`
                    }
                >
                    <li>All Doctors</li>
                </NavLink>

                <NavLink
                    to="/about"
                    className={({ isActive }) =>
                        `py-1 hover:text-blue-800 ${isActive ? 'text-blue-800' : 'text-black'}`
                    }
                >
                    <li>About</li>
                </NavLink>

                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `py-1 hover:text-blue-800 ${isActive ? 'text-blue-800' : 'text-black'}`
                    }
                >
                    <li>Contact</li>
                </NavLink>

            </ul>
            <div className='flex items-center gap-4'>
                {
                    token
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-10 rounded-full' src={assets.profile_pic} alt="" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logOut} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('login')} className='bg-blue-700 text-white cursor-pointer p-2 px-4 rounded-full font-medium '>Create Account</button>
                }
            </div>
        </div>
    );
};

export default Navbar;
