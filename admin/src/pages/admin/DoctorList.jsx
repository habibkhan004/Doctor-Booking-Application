import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorList = () => {
    const { aToken, getAllDoctors, doctors, changeAvailability } = useContext(AdminContext);

    useEffect(() => {
        if (aToken) {
            getAllDoctors();
        }
    }, [aToken]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-full">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">All Doctors</h1>

            {/* Grid layout for doctors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                {doctors.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
                    >
                        {/* Doctor Image (rectangle) */}
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full p-3 h-50 object-center border-b"
                        />

                        {/* Doctor Info */}
                        <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                            <p className="text-sm text-blue-600 font-medium mb-2">
                                {item.speciality}
                            </p>

                            {/* Availability */}
                            <div className="flex items-center mt-auto">
                                <input onChange={() => changeAvailability(item._id)}
                                    type="checkbox"
                                    checked={item.available}
                                    readOnly
                                    className="w-4 h-4 text-blue-600 cursor-pointer focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    {item.available ? "Available" : "Not Available"}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
