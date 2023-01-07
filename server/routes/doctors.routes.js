import { Router } from "express";
import { getDoctorInfo, updateDoctorInfo } from "../controllers/doctors.controller.js";
import { doctorLogin } from "../controllers/authentication.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

export const doctorsRouter = Router();

doctorsRouter.post('/me', authUser, getDoctorInfo);

doctorsRouter.post('/login', doctorLogin);

doctorsRouter.patch('/update', updateDoctorInfo);