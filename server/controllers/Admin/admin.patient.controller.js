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

export const updatePatientInfo = async (req, res) => {
  const { userID } = req.body;
  const { patient } = req.body;

  if (patient.password.trim().length === 0 || patient.password === null) {
    delete patient.password;
  }

  try {
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