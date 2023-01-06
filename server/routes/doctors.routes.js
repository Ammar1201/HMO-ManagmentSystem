import { Router } from "express";
// import { addDoctor, getDoctorAppointments, getDoctorInfo, newAppointment, updateDoctorInfo } from "../controllers/doctors.controller.js";
import { addDoctor, getDoctorInfo, updateDoctorInfo } from "../controllers/doctors.controller.js";
import { doctorLogin } from "../controllers/authentication.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

export const doctorsRouter = Router();

// doctorsRouter.get('/myappointments', getDoctorAppointments);
doctorsRouter.post('/me', authUser, getDoctorInfo);

doctorsRouter.post('/add', addDoctor);
doctorsRouter.post('/login', doctorLogin);
// doctorsRouter.post('/newappointment', newAppointment);

doctorsRouter.patch('/update', updateDoctorInfo);