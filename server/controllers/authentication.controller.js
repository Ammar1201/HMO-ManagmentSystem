import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Patient } from "../models/patients.model.js";
import { Doctor } from '../models/doctors.model.js';
import dotenv from 'dotenv';
dotenv.config();

//* Patients
export const patientLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: 'Please provide an email and password' });
    return;
  }

  if (email === '' || password === '') {
    res.status(400).json({ message: 'Please provide an email and password' });
    return;
  }

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      res.status(404).json({ message: 'Invalid credentials' });
      return;
    }

    const random = `${process.env.RANDOM}`;

    const token = jwt.sign({ id: patient._id }, random, { expiresIn: '6h' });

    res.status(200).json({ token, patient: patient.getPublicProfile() });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//* Doctors
export const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === undefined || password === undefined) {
    res.status(400).json({ message: 'Please provide an email and password' });
    return;
  }

  if (email === '' || password === '') {
    res.status(400).json({ message: 'Please provide an email and password' });
    return;
  }

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      res.status(404).json({ message: 'Invalid credentials' });
      return;
    }

    const random = `${process.env.RANDOM}`;

    const token = jwt.sign({ id: doctor._id }, random, { expiresIn: '6h' });

    res.status(200).json({ token, doctor: doctor.getPublicProfile() });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};