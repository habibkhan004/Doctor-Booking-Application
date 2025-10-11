import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [doctorName, setDoctorName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [degree, setDegree] = useState("")
    const [experience, setExperience] = useState("")
    const [fees, setFees] = useState("")
    const [about, setAbout] = useState("")
    const [addressLine1, setAddressLine1] = useState("")
    const [addressLine2, setAddressLine2] = useState("")
    const [image, setImage] = useState(null)
    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            if (!image) {
                return toast.error("Image not selected")
            }


            const formData = new FormData()
            formData.append("name", doctorName)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("speciality", speciality)
            formData.append("degree", degree)
            formData.append("experience", experience)
            formData.append("fees", fees)
            formData.append("about", about)

            // Send address as JSON string so backend can parse it as object
            const addressObj = {
                line1: addressLine1,
                line2: addressLine2
            }
            formData.append("address", JSON.stringify(addressObj))

            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`)

            });
            if (image) {
                formData.append("image", image)
            }
            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 w-full">
            <form
                onSubmit={onSubmitHandler}
                className="w-full bg-white shadow-md rounded-lg p-5 space-y-4"
            >
                <p className="text-xl font-semibold text-gray-700">Add Doctor</p>

                {/* Upload Section */}
                <div className="flex items-center space-x-4">
                    <label htmlFor="doc-img" className="cursor-pointer">
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_area}
                            alt="Upload"
                            className="w-24 h-24 object-cover rounded-full border"
                        />
                    </label>
                    <input
                        type="file"
                        id="doc-img"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <p className="text-gray-500 text-sm">Upload doctor image</p>
                </div>

                {/* Doctor Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Doctor Name</p>
                        <input
                            type="text"
                            value={doctorName}
                            onChange={(e) => setDoctorName(e.target.value)}
                            placeholder="Name"
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="text-gray-600 text-sm mb-1">Doctor Email</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="text-gray-600 text-sm mb-1">Password</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="text-gray-600 text-sm mb-1">Speciality</p>
                        <select
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        >
                            <option value="">Select Speciality</option>
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-gray-600 text-sm mb-1">Degree</p>
                        <input
                            type="text"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}
                            placeholder="Degree"
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div>
                        <p className="text-gray-600 text-sm mb-1">Experience</p>
                        <select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        >
                            <option value="">Select Years</option>
                            {Array.from({ length: 10 }, (_, i) => (
                                <option key={i + 1} value={`${i + 1} years`}>
                                    {i + 1} years
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <p className="text-gray-600 text-sm mb-1">Consultation Fees</p>
                        <input
                            type="number"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                            placeholder="Fees"
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>

                {/* About */}
                <div>
                    <p className="text-gray-600 text-sm mb-1">About</p>
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Write about doctor"
                        required
                        className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        rows="3"
                    ></textarea>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Address Line 1</p>
                        <input
                            type="text"
                            value={addressLine1}
                            onChange={(e) => setAddressLine1(e.target.value)}
                            placeholder="Street / House No."
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div>
                        <p className="text-gray-600 text-sm mb-1">Address Line 2</p>
                        <input
                            type="text"
                            value={addressLine2}
                            onChange={(e) => setAddressLine2(e.target.value)}
                            placeholder="Area / City"
                            required
                            className="w-full px-2 py-1 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="px-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                >
                    Add Doctor
                </button>
            </form>
        </div>
    )
}

export default AddDoctor
