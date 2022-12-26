import { Doctor } from "../models/doctors.model.js";
import { Appointment } from "../models/appointments.model.js";
import { hashRandomPassword } from "../utils.js";

export const getDoctorAppointments = async (req, res) => {
  const { doctorID } = req.body;

  try {
    const doctorAppointments = await Appointment.find({ doctorID });
    res.status(200).json(doctorAppointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addDoctor = async (req, res) => {
  const doctor = req.body;
  try {
    const doctorPassword = await hashRandomPassword();
    doctor.password = doctorPassword.passwordHash;
    const addedDoctor = await Doctor.create(doctor);
    addedDoctor.password = doctorPassword.password;
    res.status(201).json(addedDoctor);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const newAppointment = async (req, res) => {
  const appointment = req.body;

  try {
    const addedAppointment = await Appointment.create(appointment);
    res.status(201).json(addedAppointment);
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