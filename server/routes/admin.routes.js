import { Router } from "express";
import { adminLogin, adminAuth } from "../controllers/Admin/admin.controller.js";
import { getAllAvailableAppointments, getAllAvailableDates } from "../controllers/Admin/admin.appointments.controller.js";
import { addDoctor, getAllDoctors, getSpecificDoctor, removeDoctor, updateSpecificDoctor } from "../controllers/Admin/admin.doctor.controller.js";
import { addPatient, getAllPatients, getSpecificPatient, removePatient, updateSpecificPatient } from "../controllers/Admin/admin.patient.controller.js";

export const adminRouter = Router();

adminRouter.post('/login', adminLogin);

//* Appointments
adminRouter.post('/allAvailableAppointments', getAllAvailableAppointments);
adminRouter.post('/allAvailableDates', getAllAvailableDates);

//* Doctors
adminRouter.post('/addDoctor', adminAuth, addDoctor);
adminRouter.post('/removeDoctor', adminAuth, removeDoctor);
adminRouter.post('/allDoctors', adminAuth, getAllDoctors);
adminRouter.post('/specificDoctor', adminAuth, getSpecificDoctor);
adminRouter.post('/updateSpecificDoctor', adminAuth, updateSpecificDoctor);

//* Patients
adminRouter.post('/addPatient', adminAuth, addPatient);
adminRouter.post('/removePatient', adminAuth, removePatient);
adminRouter.post('/allPatients', adminAuth, getAllPatients);
adminRouter.post('/specificPatient', adminAuth, getSpecificPatient);
adminRouter.post('/updateSpecificPatient', adminAuth, updateSpecificPatient);