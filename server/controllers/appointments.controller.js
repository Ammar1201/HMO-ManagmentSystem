import mongoose from "mongoose";
import { Appointment } from "../models/appointments.model.js";

export const getAllAvailableAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientID: null }).populate({ path: 'doctorID', select: ['fullName', 'specialization', 'branch'] });
    res.status(200).json(appointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDoctorAppointments = async (req, res) => {
  const { userID } = req.body;

  try {
    const doctorAppointments = await Appointment.find({ doctorID: userID }).populate('patientID', 'fullName');
    const filteredAppointments = doctorAppointments.filter(appointment => appointment.patientID !== null);
    res.status(200).json(filteredAppointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPatientAppointments = async (req, res) => {
  const { userID } = req.body;

  try {
    const patientAppointments = await Appointment.find({ patientID: userID }).populate({ path: 'doctorID', select: ['fullName', 'specialization', 'branch'] });
    res.status(200).json(patientAppointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const newPatientAppointment = async (req, res) => {
  const appointment = req.body;

  try {
    const addedAppointment = await Appointment.create(appointment);
    res.status(201).json(addedAppointment);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const getDoctorAvailability = async (req, res) => {
  const { userID } = req.body;

  try {
    const availability = await Appointment.find({ doctorID: userID });
    res.status(200).json(availability);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const addDoctorAvailability = async (req, res) => {
  const { userID, date, time } = req.body;

  try {
    const availability = await Appointment.create({ doctorID: userID, date, time });
    res.status(201).json(availability);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const removeDoctorAvailability = async (req, res) => {
  const { userID, appointmentID } = req.body;

  try {
    const removedDate = await Appointment.deleteOne({ doctorID: userID, _id: appointmentID });
    res.status(201).json(removedDate);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const cancelAppointment = async (req, res) => {
  const { appointmentID } = req.body;

  try {
    const appointment = await Appointment.findOne({ _id: appointmentID });
    appointment.patientID = null;
    await appointment.save();
    res.status(200).json(appointment);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const bookNewAppointment = async (req, res) => {
  const { userID, appointmentID } = req.body;

  try {
    const appointment = await Appointment.findOne({ _id: appointmentID });
    appointment.patientID = userID;
    await appointment.save();
    res.status(201).json(appointment);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};