import { Doctor } from "../models/doctors.model.js";
import { generateRandomPassword } from "../utils.js";

export const addDoctor = async (req, res) => {
  const doctor = req.body;
  try {
    const doctorPassword = generateRandomPassword();
    doctor.password = doctorPassword;
    const addedDoctor = await Doctor.create(doctor);
    addedDoctor.password = doctorPassword;
    res.status(201).json(addedDoctor);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateDoctorInfo = (req, res) => {
  const info = req.body;

  try {
    const updatedDoctor = Doctor.findByIdAndUpdate(info._id, info);
    res.status(200).json(updatedDoctor);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const getDoctorInfo = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.userID })
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ doctor: doctor.getPublicProfile() });
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};