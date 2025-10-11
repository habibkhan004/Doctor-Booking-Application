import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
    const { userData, setUserData, backendUrl, token, loadUserProfilesData } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [tempData, setTempData] = useState(userData)
    const [loading, setLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null)

    useEffect(() => {
        setTempData(userData)
    }, [userData])

    // Handle file selection
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0])
    }

    // Save profile using FormData
    const handleSave = async () => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append('name', tempData.name || '')
            formData.append('phone', tempData.phone || '')
            formData.append('dob', tempData.dob || '')
            formData.append('gender', tempData.gender || '')
            formData.append('address', JSON.stringify(tempData.address || {}))
            if (imageFile) formData.append('image', imageFile)

            const res = await axios.post(
                `${backendUrl}/api/user/update-profile`,
                formData,
                {
                    headers: {
                        token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )

            if (res.data.success) {
                toast.success('Profile updated ✅')
                setUserData(res.data.userData)
                setIsEdit(false)
                setImageFile(null)
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setTempData(userData)
        setImageFile(null)
        setIsEdit(false)
    }

    if (!userData) return <p>Loading profile...</p>

    return (
        <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
            {/* Profile picture */}
            <div className="text-center mb-6">
                <img
                    src={imageFile ? URL.createObjectURL(imageFile) : userData.image}
                    alt="Profile"
                    className="w-28 h-28 mx-auto rounded-full border-2 border-blue-500 mb-3"
                />
                {isEdit && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-2"
                    />
                )}
            </div>

            {/* Profile details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                    <p className="text-gray-700 font-medium">Name</p>
                    {isEdit ? (
                        <input
                            type="text"
                            value={tempData.name || ""}
                            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                            className="border p-2 rounded w-full"
                        />
                    ) : (
                        <p>{userData.name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <p className="text-gray-700 font-medium">Email</p>
                    <p>{userData.email}</p>
                </div>

                {/* Phone */}
                <div>
                    <p className="text-gray-700 font-medium">Phone</p>
                    {isEdit ? (
                        <input
                            type="text"
                            value={tempData.phone || ""}
                            onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                            className="border p-2 rounded w-full"
                        />
                    ) : (
                        <p>{userData.phone}</p>
                    )}
                </div>

                {/* Gender */}
                <div>
                    <p className="text-gray-700 font-medium">Gender</p>
                    {isEdit ? (
                        <select
                            value={tempData.gender || ""}
                            onChange={(e) => setTempData({ ...tempData, gender: e.target.value })}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    ) : (
                        <p>{userData.gender}</p>
                    )}
                </div>

                {/* DOB */}
                <div>
                    <p className="text-gray-700 font-medium">Date of Birth</p>
                    {isEdit ? (
                        <input
                            type="date"
                            value={tempData.dob || ""}
                            onChange={(e) => setTempData({ ...tempData, dob: e.target.value })}
                            className="border p-2 rounded w-full"
                        />
                    ) : (
                        <p>{userData.dob}</p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <p className="text-gray-700 font-medium">Address</p>
                    {isEdit ? (
                        <>
                            <input
                                type="text"
                                value={tempData.address?.line1 || ""}
                                onChange={(e) =>
                                    setTempData({
                                        ...tempData,
                                        address: { ...tempData.address, line1: e.target.value },
                                    })
                                }
                                className="border p-2 rounded w-full mb-2"
                            />
                            <input
                                type="text"
                                value={tempData.address?.line2 || ""}
                                onChange={(e) =>
                                    setTempData({
                                        ...tempData,
                                        address: { ...tempData.address, line2: e.target.value },
                                    })
                                }
                                className="border p-2 rounded w-full"
                            />
                        </>
                    ) : (
                        <p>
                            {userData.address?.line1}, {userData.address?.line2}
                        </p>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 justify-center">
                {isEdit ? (
                    <>
                        <button
                            onClick={handleSave}
                            disabled={loading}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button
                            onClick={handleCancel}
                            disabled={loading}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setIsEdit(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                    >
                        Edit
                    </button>
                )}
            </div>
        </div>
    )
}

export default MyProfile
