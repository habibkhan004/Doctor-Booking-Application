import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";
import jwt from "jsonwebtoken";
// api doctor adding

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "Some detail missing" });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageURL,
      password: hashPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    return res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credential" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await doctorModel.countDocuments();
    const totalPatients = await userModel.countDocuments();
    const totalAppointments = await appointmentModel.countDocuments();

    const latestAppointments = await appointmentModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name image dob")
      .populate("docId", "name image fees");

    res.json({
      success: true,
      stats: {
        totalDoctors,
        totalPatients,
        totalAppointments,
      },
      latestAppointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  getAllAppointments,
  getDashboardStats,
};
