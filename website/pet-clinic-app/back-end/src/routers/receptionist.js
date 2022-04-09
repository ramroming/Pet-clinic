import { Router } from "express";
import auth from "../middleware/auth.js";
import { getAppointments, deleteAppointment, confirmAppointment, createAppointment, getPetsByUserName } from "../controllers/ReceptionistController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const receptionistRouter = new Router()

// get pets of a user by username
receptionistRouter.get('/receptionist/pets', auth, getPetsByUserName)
receptionistRouter.get('/receptionist/appointments', auth, getAppointments)
receptionistRouter.post('/receptionist/appointments', auth, validationMiddleware.RecCreateAppointment, createAppointment)
receptionistRouter.patch('/receptionist/appointments/:id', auth, validationMiddleware.confirmAppointment, confirmAppointment)
receptionistRouter.delete('/receptionist/appointments/:id', auth, validationMiddleware.deleteAppointment, deleteAppointment)

export default receptionistRouter