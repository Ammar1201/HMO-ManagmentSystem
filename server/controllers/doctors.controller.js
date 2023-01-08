import { Doctor } from "../models/doctors.model.js";

export const updateDoctorInfo = async (req, res) => {
  const { userID } = req.body;
  const { doctor } = req.body;

  try {
    const doctorToUpdate = await Doctor.findOne({ _id: userID });
    doctorToUpdate.email = doctor.email || doctorToUpdate.email;
    doctorToUpdate.password = doctor.password || doctorToUpdate.password;
    doctorToUpdate.phoneNumber = doctor.phoneNumber || doctorToUpdate.phoneNumber;
    doctorToUpdate.fullName = doctor.fullName || doctorToUpdate.fullName;
    doctorToUpdate.specialization = doctor.specialization || doctorToUpdate.specialization;
    doctorToUpdate.branch = doctor.branch || doctorToUpdate.branch;
    await doctorToUpdate.save();
    res.status(200).json(doctorToUpdate.getPublicProfile());
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};

export const getDoctorInfo = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.userID })
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ doctor: doctor.getPublicProfile() });
  }
  catch (err) {
    res.status(500).json(err.message);
  }
};