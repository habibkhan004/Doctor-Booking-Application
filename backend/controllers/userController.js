import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
const regiterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
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
    const userData = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    res.json({
      success: true,
      message: "Accounted Created Successfully",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exit" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ from middleware

    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ instead of req.body.userId

    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Details missing" });
    }

    // update basic info
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      address: address ? JSON.parse(address) : undefined,
      gender,
    });

    // update image if provided
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    let slots_booked = docData.slots_booked;
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };
    const newAppointment = await new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const listAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID is required" });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.cancelled) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment is already cancelled" });
    }

    // Convert slotDate and slotTime into a Date object
    const [day, month, year] = appointment.slotDate.split("_").map(Number);
    const slotTimeParts = appointment.slotTime.split(/[: ]/);
    let hours = parseInt(slotTimeParts[0]);
    const minutes = parseInt(slotTimeParts[1]);
    const ampm = slotTimeParts[2];

    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const slotDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    // Check if appointment is less than 2 hours away
    const diffInHours = (slotDateTime - now) / (1000 * 60 * 60);
    if (diffInHours < 2) {
      return res.status(400).json({
        success: false,
        message: "Cannot cancel appointment less than 2 hours before the slot",
      });
    }

    // Mark appointment as cancelled
    appointment.cancelled = true;
    await appointment.save();

    // Remove slot from doctor's booked slots
    const doctor = await doctorModel.findById(appointment.docId);

    if (doctor && doctor.slots_booked?.[appointment.slotDate]) {
      // Remove the cancelled slot
      doctor.slots_booked[appointment.slotDate] = doctor.slots_booked[
        appointment.slotDate
      ].filter((slot) => slot !== appointment.slotTime);

      // If no slots left for that date, delete the date
      if (doctor.slots_booked[appointment.slotDate].length === 0) {
        delete doctor.slots_booked[appointment.slotDate];
      }

      // Important: mark slots_booked as modified so Mongoose knows it changed
      doctor.markModified("slots_booked");

      await doctor.save();
    }

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const rescheduleAppointment = async (req, res) => {
  try {
    const {
      appointmentId,
      docId,
      oldSlotDate,
      oldSlotTime,
      newSlotDate,
      newSlotTime,
    } = req.body;
    const userId = req.user.id;

    if (!appointmentId || !newSlotDate || !newSlotTime) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    if (appointment.cancelled) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot reschedule a cancelled appointment",
        });
    }
    if (appointment.isCompleted) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Cannot reschedule a completed appointment",
        });
    }

    // Parse old slot to Date object
    const [day, month, year] = oldSlotDate.split("_").map(Number);
    const slotTimeParts = oldSlotTime.split(/[: ]/);
    let hours = parseInt(slotTimeParts[0]);
    const minutes = parseInt(slotTimeParts[1]);
    const ampm = slotTimeParts[2];

    if (ampm === "PM" && hours !== 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    const oldSlotDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();

    if ((oldSlotDateTime - now) / (1000 * 60 * 60) < 2) {
      return res.status(400).json({
        success: false,
        message:
          "You can only reschedule at least 2 hours before the appointment",
      });
    }

    // Remove old slot from doctor's booked slots
    const doctor = await doctorModel.findById(docId);
    if (doctor && doctor.slots_booked?.[oldSlotDate]) {
      doctor.slots_booked[oldSlotDate] = doctor.slots_booked[
        oldSlotDate
      ].filter((slot) => slot !== oldSlotTime);
      if (doctor.slots_booked[oldSlotDate].length === 0) {
        delete doctor.slots_booked[oldSlotDate];
      }
      doctor.markModified("slots_booked");
    }

    // Add new slot
    doctor.slots_booked[newSlotDate] = doctor.slots_booked[newSlotDate] || [];
    if (doctor.slots_booked[newSlotDate].includes(newSlotTime)) {
      return res
        .status(400)
        .json({ success: false, message: "This slot is already booked" });
    }
    doctor.slots_booked[newSlotDate].push(newSlotTime);
    doctor.markModified("slots_booked");
    await doctor.save();

    // Update appointment
    appointment.slotDate = newSlotDate;
    appointment.slotTime = newSlotTime;
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment rescheduled successfully",
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  regiterUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  rescheduleAppointment,
};
