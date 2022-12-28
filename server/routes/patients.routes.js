import { Router } from "express";
import { addPatient, getPatientAppointments, newAppointment, updatePatientInfo } from "../controllers/patients.controller.js";
import { patientLogin, verifyPatientToken } from "../controllers/authentication.controller.js";

export const patientsRouter = Router();

patientsRouter.get('/myappointments', getPatientAppointments);

patientsRouter.post('/add', addPatient);
patientsRouter.post('/newappointment', newAppointment);

patientsRouter.patch('/update', updatePatientInfo);

//* authentication
patientsRouter.post('/login', patientLogin);
patientsRouter.post('/verify', verifyPatientToken);