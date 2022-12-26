import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Patient } from "../models/patients.model.js";
import { Doctor } from '../models/doctors.model.js';

export const patientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === undefined || password === undefined) {
      res.send(400).json({ message: 'Please provide an email and password' });
      return;
    }

    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.send(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      res.status(404).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: patient._id }, process.env.RANDOM);

    res.status(200).json({ token, patient: patient.getPublicProfile() });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === undefined || password === undefined) {
      res.send(400).json({ message: 'Please provide an email and password' });
      return;
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.send(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      res.status(404).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: doctor._id }, process.env.RANDOM);

    res.status(200).json({ token, doctor: doctor.getPublicProfile() });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};