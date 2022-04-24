import { Router } from 'express'
import { getActiveAppointments } from '../controllers/VetController.js'
import auth from '../middleware/auth.js'
import authorization from '../middleware/authorization.js'
const vetRouter = new Router()

vetRouter.get('/vet/appointments', auth, authorization.vet, getActiveAppointments)

export default vetRouter