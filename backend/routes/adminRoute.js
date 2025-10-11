import express from "express";
import {
  addDoctor,
  allDoctors,
  getAllAppointments,
  getDashboardStats,
  loginAdmin,
} from "../controllers/adminContoller.js";

import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/all-appointments", getAllAppointments);
adminRouter.get("/dashboard-stats", getDashboardStats);

export default adminRouter;
