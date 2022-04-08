import { Router } from "express";
import auth from "../middleware/auth.js";
import { getAppointments, deleteAppointment, confirmAppointment } from "../controllers/ReceptionistController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const receptionistRouter = new Router()

receptionistRouter.get('/receptionist/appointments', auth, getAppointments)
receptionistRouter.patch('/receptionist/appointments/:id', auth, validationMiddleware.confirmAppointment, confirmAppointment)
receptionistRouter.delete('/receptionist/appointments/:id', auth, validationMiddleware.deleteAppointment, deleteAppointment)

export default receptionistRouter