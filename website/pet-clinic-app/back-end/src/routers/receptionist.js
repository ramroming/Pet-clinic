import { Router } from "express";
import auth from "../middleware/auth.js";
import { getAppointments, deleteAppointment, confirmAppointment, createAppointment, getPetsByUserName, registerPetRec } from "../controllers/ReceptionistController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import formDataMiddleWare from "../middleware/formData.js";

const receptionistRouter = new Router()

// get pets of a user by username
receptionistRouter.get('/receptionist/pets', auth, getPetsByUserName)
receptionistRouter.post('/receptionist/pets', auth, formDataMiddleWare.single('photo'), validationMiddleware.registerPet, registerPetRec, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
receptionistRouter.get('/receptionist/appointments', auth, getAppointments)
receptionistRouter.post('/receptionist/appointments', auth, validationMiddleware.RecCreateAppointment, createAppointment)
receptionistRouter.patch('/receptionist/appointments/:id', auth, validationMiddleware.confirmAppointment, confirmAppointment)
receptionistRouter.delete('/receptionist/appointments/:id', auth, validationMiddleware.deleteAppointment, deleteAppointment)

export default receptionistRouter