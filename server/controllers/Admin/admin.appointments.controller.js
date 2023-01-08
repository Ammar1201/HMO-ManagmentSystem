import { Appointment } from "../../models/appointments.model.js";

export const getAllAvailableAppointments = async (req, res) => {
  try {
    const allAppointments = await Appointment.find({ patientID: { $ne: null } }).populate('patientID', 'fullName');
    res.status(200).json(allAppointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllAvailableDates = async (req, res) => {
  try {
    const availableDates = await Appointment.find({ patientID: null }).populate({ path: 'doctorID', select: ['fullName', 'specialization', 'branch'] });
    res.status(200).json(availableDates);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};