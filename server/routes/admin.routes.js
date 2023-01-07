import { Router } from "express";
import { adminLogin, adminAuth } from "../controllers/Admin/admin.controller.js";
import { getAllAvailableAppointments } from "../controllers/Admin/admin.appointments.controller.js";
import { addDoctor } from "../controllers/Admin/admin.doctor.controller.js";
import { addPatient } from "../controllers/Admin/admin.patient.controller.js";

export const adminRouter = Router();

adminRouter.post('/login', adminLogin);

//* Appointments
adminRouter.post('/allAvailableAppointments', getAllAvailableAppointments);

//* Doctors
adminRouter.post('/addDoctor', adminAuth, addDoctor);

//* Patients
adminRouter.post('/addPatient', adminAuth, addPatient);