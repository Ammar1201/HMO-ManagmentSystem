import { Router } from "express";
import { addPatient } from "../controllers/patients.controller.js";
import { patientLogin } from "../controllers/authentication.controller.js";

export const patientsRouter = Router();

patientsRouter.post('', addPatient);
patientsRouter.post('/login', patientLogin);