import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === "Admin") {
                const { data } = await axios.post(backendUrl + "/api/admin/login", {
                    email,
                    password,
                });

                if (data.success) {
                    localStorage.setItem("aToken", data.token);
                    setAToken(data.token);
                    toast.success("Admin login successful");

                } else {
                    toast.error(data.message || "Invalid credentials");
                }
            } else {
                const { data } = await axios.post(backendUrl + "/api/doctor/login", {
                    email,
                    password,
                });

                if (data.success) {
                    localStorage.setItem("dToken", data.token);
                    setDToken(data.token);
                    console.log(data.token)
                    toast.success("Doctor login successful");
                } else {
                    toast.error(data.message || "Invalid credentials");
                }
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong ❌");
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex min-h-screen items-center justify-center bg-gray-100"
        >
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                {/* Heading */}
                <p className="mb-6 text-center text-2xl font-bold text-gray-800">
                    <span className="text-blue-600">{state}</span> Login
                </p>

                {/* Email */}
                <div className="mb-4">
                    <p className="mb-1 text-sm font-medium text-gray-700">Email</p>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <p className="mb-1 text-sm font-medium text-gray-700">Password</p>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="cursor-pointer w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
                >
                    Login
                </button>

                {/* Toggle between Admin/Doctor */}
                <div className="mt-4 text-center text-sm text-gray-600">
                    {state === "Admin" ? (
                        <p>
                            Doctor Login?{" "}
                            <span
                                onClick={() => setState("Doctor")}
                                className="cursor-pointer font-medium text-blue-600 hover:underline"
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p>
                            Admin Login?{" "}
                            <span
                                onClick={() => setState("Admin")}
                                className="cursor-pointer font-medium text-blue-600 hover:underline"
                            >
                                Click here
                            </span>
                        </p>
                    )}
                </div>
            </div>
        </form>
    );
};

export default Login;
