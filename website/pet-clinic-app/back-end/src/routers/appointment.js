import { Router } from 'express'
const appointmentRouter = new Router()

// middlewares
import auth from '../middleware/auth.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
import AppointmentController from '../controllers/AppointmentController.js'

const { getStaffMems, appointmentsTimes } = AppointmentController
// getting necessary data when making an appointment

// getting staff members for a certian appointment type
appointmentRouter.get('/appointment/staffmems', auth, validationMiddleware.getStaff, getStaffMems)

// getting available times on a specific date for a specific stmem
appointmentRouter.get('/appointment/appointmentstimes', auth, validationMiddleware.appointmentsTimes, appointmentsTimes)


export default appointmentRouter