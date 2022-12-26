import { Router } from "express";
import { addDoctor, getDoctorAppointments, newAppointment, updateDoctorInfo } from "../controllers/doctors.controller.js";
import { doctorLogin } from "../controllers/authentication.controller.js";

export const doctorsRouter = Router();

doctorsRouter.get('/myappointments', getDoctorAppointments);

doctorsRouter.post('/add', addDoctor);
doctorsRouter.post('/login', doctorLogin);
doctorsRouter.post('/newappointment', newAppointment);

doctorsRouter.patch('/update', updateDoctorInfo);