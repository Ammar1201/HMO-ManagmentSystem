import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { getDoctorAvailability, newPatientAppointment, addDoctorAvailability, removeDoctorAvailability, getDoctorAppointments } from "../controllers/appointments.controller.js";

export const appointmentsRouter = Router();

appointmentsRouter.post('/doctorAvailability', authUser, getDoctorAvailability);
appointmentsRouter.post('/addNewAvailableDate', authUser, addDoctorAvailability);
appointmentsRouter.post('/getDoctorAppointments', authUser, getDoctorAppointments);

appointmentsRouter.patch('/', newPatientAppointment);

appointmentsRouter.post('/removeDoctorAvailability', authUser, removeDoctorAvailability);