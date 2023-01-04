import { Router } from "express";
import { addPatient, getPatientAppointments, getPatientInfo, newAppointment, updatePatientInfo } from "../controllers/patients.controller.js";
import { patientLogin, verifyPatientToken } from "../controllers/authentication.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

export const patientsRouter = Router();

patientsRouter.get('/myappointments', authUser, getPatientAppointments);
patientsRouter.post('/me', authUser, getPatientInfo);

patientsRouter.post('/add', addPatient);
patientsRouter.post('/newappointment', authUser, newAppointment);

patientsRouter.patch('/update', authUser, updatePatientInfo);

//* authentication
patientsRouter.post('/login', patientLogin);
patientsRouter.post('/verify', authUser, verifyPatientToken);