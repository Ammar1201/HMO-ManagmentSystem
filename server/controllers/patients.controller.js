import { Patient } from "../models/patients.model.js";
import { Appointment } from "../models/appointments.model.js";
import { hashRandomPassword, generateRandomPassword } from "../utils.js";

export const getPatientAppointments = async (req, res) => {
  const { patientID } = req.body;

  try {
    const patientAppointments = await Appointment.find({ patientID });
    res.status(200).json(patientAppointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addPatient = async (req, res) => {
  const patient = req.body;
  try {
    const patientPassword = generateRandomPassword();
    patient.password = patientPassword.passwordHash;
    const addedPatient = await Patient.create(patient);
    addedPatient.password = patientPassword.password;
    res.status(201).json(addedPatient);
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

export const updatePatientInfo = async (req, res) => {
  const { userID } = req.body;
  const { patient } = req.body;

  if (patient.password.trim().length === 0 || patient.password === null) {
    delete patient.password;
  }

  try {
    // const updatedPatient = await Patient.findByIdAndUpdate(userID, patient);
    const patientToUpdate = await Patient.findOne({ _id: userID });
    patientToUpdate.updateOne(patient);
    await patientToUpdate.save();
    res.status(200).json(patientToUpdate.getPublicProfile());
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const getPatientInfo = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.body.userID })
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ patient: patient.getPublicProfile() });
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};