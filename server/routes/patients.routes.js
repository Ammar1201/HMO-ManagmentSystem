import { Router } from "express";
import { addPatient, getPatientAppointments, newAppointment, updatePatientInfo } from "../controllers/patients.controller.js";
import { patientLogin } from "../controllers/authentication.controller.js";

export const patientsRouter = Router();

patientsRouter.get('/myappointments', getPatientAppointments);

patientsRouter.post('/add', addPatient);
patientsRouter.post('/login', patientLogin);
patientsRouter.post('/newappointment', newAppointment);

patientsRouter.patch('/update', updatePatientInfo);