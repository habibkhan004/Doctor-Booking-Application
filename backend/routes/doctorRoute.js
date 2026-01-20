import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentsDoctor,
  doctorList,
  getDoctorProfile,
  getDoctorReports,
  loginDoctor,
  updateDoctorProfile,
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";
import upload from "../middlewares/multer.js";
const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/doctor-appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.get("/get-profile", authDoctor, getDoctorProfile);
doctorRouter.patch(
  "/update-profile",
  authDoctor,
  upload.single("image"),
  updateDoctorProfile
);
doctorRouter.get("/reports", authDoctor, getDoctorReports);

export default doctorRouter;
