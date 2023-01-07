import { Router } from "express";
import { getPatientInfo, updatePatientInfo } from "../controllers/patients.controller.js";
import { patientLogin } from "../controllers/authentication.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

export const patientsRouter = Router();

patientsRouter.post('/me', authUser, getPatientInfo);

patientsRouter.patch('/update', authUser, updatePatientInfo);

//* authentication
patientsRouter.post('/login', patientLogin);