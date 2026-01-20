import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DoctorReports = () => {
    const { reports, getDoctorReports } = useContext(DoctorContext);

    const [filterType, setFilterType] = useState("daily");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    useEffect(() => {
        getDoctorReports(filterType, fromDate, toDate);
    }, [filterType]);

    const handleApply = async (e) => {
        e.preventDefault();
        if (!fromDate || !toDate) {
            toast.error("Please select both from and to dates");
            return;
        }
        await getDoctorReports("custom", fromDate, toDate);
    };

    const generatePDF = () => {
        if (!reports || reports.length === 0) {
            toast.error("No reports to export");
            return;
        }

        const doc = new jsPDF();
        const columns = ["Patient Name", "Patient Email", "Date", "Fees"];
        const rows = reports.map((item) => [
            item.userId?.name || "N/A",
            item.userId?.email || "N/A",
            new Date(item.date).toLocaleString(),
            item.fees || 0,
        ]);

        doc.text("Doctor Reports", 14, 15);
        doc.autoTable({ head: [columns], body: rows, startY: 20 });
        doc.save("doctor-reports.pdf");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Doctor Reports</h2>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border px-2 py-1 rounded-md"
                    >
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                        <option value="custom">Custom</option>
                    </select>

                    {filterType === "custom" && (
                        <>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="border px-2 py-1 rounded-md"
                            />
                            <input
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="border px-2 py-1 rounded-md"
                            />
                            <button
                                onClick={handleApply}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
                            >
                                Apply
                            </button>
                        </>
                    )}

                    <button
                        onClick={generatePDF}
                        className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md"
                    >
                        Export as PDF
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b">Patient Name</th>
                                <th className="py-2 px-4 border-b">Patient Email</th>
                                <th className="py-2 px-4 border-b">Date</th>
                                <th className="py-2 px-4 border-b">Fees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!reports || reports.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">
                                        No reports found
                                    </td>
                                </tr>
                            ) : (
                                reports.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{item.userId?.name || "N/A"}</td>
                                        <td className="py-2 px-4 border-b">{item.userId?.email || "N/A"}</td>
                                        <td className="py-2 px-4 border-b">{new Date(item.date).toLocaleString()}</td>
                                        <td className="py-2 px-4 border-b">{item.fees || 0}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DoctorReports;
