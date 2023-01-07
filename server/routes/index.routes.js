import { Router } from "express";
import { patientsRouter } from "./patients.routes.js";
import { doctorsRouter } from "./doctors.routes.js";
import { appointmentsRouter } from "./appointments.routes.js";
import { adminRouter } from "./admin.routes.js";

export const indexRouter = Router();

indexRouter.use('/patients', patientsRouter);
indexRouter.use('/doctors', doctorsRouter);
indexRouter.use('/appointments', appointmentsRouter);
indexRouter.use(`${process.env.ADMIN_ROUTE}`, adminRouter);