import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import e from "express";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availablity Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);

    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentsDoctor = async (req, res) => {
  try {
    const docId = req.doctor.id;

    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId == docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const appointmentCancel = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancel failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctor.id;

    const doctor = await doctorModel.findById(docId).select("-password -email");

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    res.json({ success: true, doctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const docId = req.doctor.id;
    const { name, speciality, degree, experience, about, fees, address } =
      req.body;

    let updates = {
      ...(name && { name }),
      ...(speciality && { speciality }),
      ...(degree && { degree }),
      ...(experience && { experience }),
      ...(about && { about }),
      ...(fees && { fees }),
      ...(address && { address: JSON.parse(address) }),
    };

    // If doctor uploaded an image
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updates.image = uploaded.secure_url;
    }

    await doctorModel.findByIdAndUpdate(docId, updates, { new: true });

    res.json({ success: true, message: "Profile updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const getDoctorReports = async (req, res) => {
  try {
    const doctorId = req.doctor.id;
    const { type, startDate, endDate } = req.query; // type: daily, monthly, custom
    let filter = { docId: doctorId };

    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of day

    if (type === "daily") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      filter.date = { $gte: today, $lt: tomorrow };
    } else if (type === "monthly") {
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      filter.date = { $gte: firstDay, $lt: lastDay };
    } else if (type === "custom") {
      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ success: false, message: "Start and end dates required" });
      }
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const reports = await appointmentModel
      .find(filter)
      .populate("userId", "name email") // optional: include patient info
      .sort({ date: -1 });

    // Optional: calculate total earnings
    const totalEarnings = reports.reduce(
      (sum, item) => sum + (item.fees || 0),
      0
    );

    res.json({
      success: true,
      reports,
      totalEarnings,
      count: reports.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  changeAvailablity,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  getDoctorProfile,
  updateDoctorProfile,
  getDoctorReports,
};
