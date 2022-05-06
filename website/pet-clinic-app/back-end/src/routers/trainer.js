import { Router } from 'express'
import authorization from '../middleware/authorization.js'
import auth from '../middleware/auth.js'
import { getPetTrainings, addTraining, getTrainingTypes, updateTraining } from '../controllers/TrainerController.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
const trainerRouter = new Router()


trainerRouter.get('/trainer/trainings/:appointment_id', auth, authorization.trainer, validationMiddleware.getPetTrainings, getPetTrainings)
trainerRouter.post('/trainer/trainings', auth, authorization.trainer, validationMiddleware.addTraining, addTraining)
trainerRouter.patch('/trainer/trainings', auth, authorization.trainer, validationMiddleware.updateTraining, updateTraining)
trainerRouter.get('/trainer/trainingtypes', auth, authorization.trainer, getTrainingTypes)


export default trainerRouter