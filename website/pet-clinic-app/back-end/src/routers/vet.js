import { Router } from 'express'
import { getActiveAppointments, getPetTreatments } from '../controllers/VetController.js'
import auth from '../middleware/auth.js'
import authorization from '../middleware/authorization.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
const vetRouter = new Router()

vetRouter.get('/vet/appointments', auth, authorization.vet, getActiveAppointments)
vetRouter.get('/vet/treatments/:appointment_id', auth, authorization.vet, validationMiddleware.getPetTreatments, getPetTreatments)

export default vetRouter