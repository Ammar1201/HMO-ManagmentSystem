import { Doctor } from "../../models/doctors.model.js";
import { generateRandomPassword } from "../../utils.js";

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const addDoctor = async (req, res) => {
  const doctor = req.body;
  console.log(doctor);
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

export const removeDoctor = async (req, res) => {
  const { doctorID } = req.body;
  try {
    const doctor = await Doctor.findOne({ _id: doctorID });
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found!' });
    }
    const deletedDoctor = await Doctor.deleteOne({ _id: doctorID });
    res.status(201).json({ doctor, deletedDoctor });
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