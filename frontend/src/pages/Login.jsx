import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [state, setState] = useState('Sign Up')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const { backendUrl, token, setToken } = useContext(AppContext)
    const navigate = useNavigate()
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            } else {
                if (state === 'Login') {
                    const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                    if (data.success) {
                        localStorage.setItem('token', data.token)
                        setToken(data.token)
                    } else {
                        toast.error(data.message)
                    }
                }
            }
        } catch (error) {
            toast.error(data.message)
        }
    }
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])
    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex justify-center items-center p-4 bg-gray-50"
        >
            <div className="w-full max-w-md bg-white  shadow-lg rounded-xl p-8">
                {/* Title */}
                <p className="text-2xl font-bold text-gray-800 mb-2 text-center">
                    {state === "Sign Up" ? "Create Account" : "Login"}
                </p>
                <p className="text-gray-500 text-center mb-6">
                    Please {state === "Sign Up" ? "sign up to create an account" : "login to book appointment"}
                </p>

                {/* Name (only in Sign Up) */}
                {state === "Sign Up" && (
                    <div className="mb-4">
                        <p className="text-gray-700 mb-1">Name</p>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>
                )}

                {/* Email */}
                <div className="mb-4">
                    <p className="text-gray-700 mb-1">Email</p>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <p className="text-gray-700 mb-1">Password</p>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    {state === "Sign Up" ? "Create Account" : "Login"}
                </button>

                {/* Toggle between login/signup */}
                <p className="mt-4 text-center text-gray-600">
                    {state === "Sign Up" ? (
                        <>Already have an account?{" "}
                            <span
                                onClick={() => setState("Login")}
                                className="text-blue-600 cursor-pointer font-medium"
                            >
                                Login
                            </span></>
                    ) : (
                        <>Don’t have an account?{" "}
                            <span
                                onClick={() => setState("Sign Up")}
                                className="text-blue-600 cursor-pointer font-medium"
                            >
                                Sign Up
                            </span></>
                    )}
                </p>
            </div>
        </form>
    )

}

export default Login
