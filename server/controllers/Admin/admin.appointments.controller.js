import { Appointment } from "../../models/appointments.model.js";

export const getAllAvailableAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientID: null }).populate({ path: 'doctorID', select: ['fullName', 'specialization', 'branch'] });
    res.status(200).json(appointments);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
};