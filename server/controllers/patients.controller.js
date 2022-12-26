import { Patient } from "../models/patients.model.js";

export const getAllPatients = (req, res) => {
  const allPatients = Patient.find({});
  res.send(allPatients);
};

export const getPatient = (req, res) => {
  res.send(req.patient);
};

export const addPatient = async (req, res) => {
  try {
    const patient = req.body;
    const addedPatient = await Patient.create(patient);
    res.status(201).send(addedPatient);
  }
  catch (err) {
    res.status(500).send(err.message);
  }
};

export const removePatient = async (req, res) => {
  const patient = req.body;
};

export const updatePatient = async (req, res) => { };