import { Patient } from "../models/patients.model.js";

export const updatePatientInfo = async (req, res) => {
  const { userID } = req.body;
  const { patient } = req.body;

  try {
    const patientToUpdate = await Patient.findOne({ _id: userID });
    patientToUpdate.email = patient.email || patientToUpdate.email;
    patientToUpdate.password = patient.password || patientToUpdate.password;
    patientToUpdate.phoneNumber = patient.phoneNumber || patientToUpdate.phoneNumber;
    patientToUpdate.fullName = patient.fullName || patientToUpdate.fullName;
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