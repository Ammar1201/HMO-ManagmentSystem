import { Patient } from "../../models/patients.model.js";
import { generateRandomPassword } from "../../utils.js";

export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const getSpecificPatient = async (req, res) => {
  const { patientID } = req.body;

  try {
    const patient = await Patient.findOne({ _id: patientID });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found!' });
    }
    res.status(200).json(patient);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const addPatient = async (req, res) => {
  const patient = req.body;
  try {
    const patientPassword = generateRandomPassword();
    patient.password = patientPassword;
    const addedPatient = await Patient.create(patient);
    addedPatient.password = patientPassword;
    res.status(201).json(addedPatient);
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const removePatient = async (req, res) => {
  const { patientID } = req.body;
  try {
    const patient = await Patient.findOne({ _id: patientID });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found!' });
    }
    const deletedPatient = await Patient.deleteOne({ _id: patientID });
    res.status(201).json({ patient, deletedPatient });
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const updateSpecificPatient = async (req, res) => {
  const { patientID, newPatientInfo } = req.body;

  try {
    const patientToUpdate = await Patient.findOne({ _id: patientID });
    const info = {
      email: newPatientInfo.email || patientToUpdate.email,
      fullName: newPatientInfo.fullName || patientToUpdate.fullName,
      phoneNumber: newPatientInfo.phoneNumber || patientToUpdate.phoneNumber
    }
    const updatedPatient = await Patient.findByIdAndUpdate(patientID, info);
    res.status(200).json(updatedPatient.getPublicProfile());
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};