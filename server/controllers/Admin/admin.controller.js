import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Admin } from "../../models/admin.model.js";

dotenv.config();

export const adminLogin = async (req, res) => {
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
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      res.status(404).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: admin._id }, process.env.RANDOM, { expiresIn: '2h' });

    res.status(200).json({ token });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.RANDOM, async (err, decode) => {
      if (err) {
        return res.status(401).json(err);
      }

      const admin = await Admin.findOne({ _id: decode.id });
      if (admin._id) {
        next();
        return;
      }

      res.status(401).json({ message: 'Not Authorized!' });
    });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};