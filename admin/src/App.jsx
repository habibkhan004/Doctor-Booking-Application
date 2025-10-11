import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // <-- Add this line
import Login from "./pages/Login";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import SideBar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import Appointment from "./pages/admin/Appointment";
import DoctorList from "./pages/admin/DoctorList";
import AddDoctor from "./pages/admin/AddDoctor";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorProfile from "./pages/doctor/DoctorProfile";

function App() {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className="bg-rose-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar></Navbar>
      <div className="flex items-start">
        <SideBar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/all-appointments" element={<Appointment />} />
          <Route path="/doctor-list" element={<DoctorList />} />
          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>

    </div>
  ) : (
    <>
      <Login />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App;
