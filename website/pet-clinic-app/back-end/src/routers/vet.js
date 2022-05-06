import { Router } from 'express'
import { getActiveAppointments, getPetTreatments, addTreatment, getCaseMedVac, updateTreatment } from '../controllers/VetController.js'
import auth from '../middleware/auth.js'
import authorization from '../middleware/authorization.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
const vetRouter = new Router()

vetRouter.get('/vet/appointments', auth, authorization.shared, getActiveAppointments)
vetRouter.get('/vet/treatments/:appointment_id', auth, authorization.vet, validationMiddleware.getPetTreatments, getPetTreatments)
vetRouter.post('/vet/treatments', auth, authorization.vet, validationMiddleware.addTreatment, addTreatment)
vetRouter.patch('/vet/treatments', auth, authorization.vet, validationMiddleware.updateTreatment, updateTreatment)
vetRouter.get('/vet/casemedvac', auth, authorization.vet, getCaseMedVac)


export default vetRouter