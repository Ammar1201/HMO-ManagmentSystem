import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import {
  getDoctorAvailability,
  newPatientAppointment,
  addDoctorAvailability,
  removeDoctorAvailability,
  getDoctorAppointments,
  getPatientAppointments,
  cancelAppointment,
  bookNewAppointment
}
  from "../controllers/appointments.controller.js";

export const appointmentsRouter = Router();

appointmentsRouter.post('/doctorAvailability', authUser, getDoctorAvailability);
appointmentsRouter.post('/addNewAvailableDate', authUser, addDoctorAvailability);
appointmentsRouter.post('/doctorAppointments', authUser, getDoctorAppointments);
appointmentsRouter.post('/patientAppointments', authUser, getPatientAppointments);

appointmentsRouter.post('/bookNewAppointment', authUser, bookNewAppointment);

appointmentsRouter.patch('/', newPatientAppointment);
appointmentsRouter.patch('/cancelAppointment', authUser, cancelAppointment);

appointmentsRouter.post('/removeDoctorAvailability', authUser, removeDoctorAvailability);