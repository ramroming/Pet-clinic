import { Router } from 'express'
const appointmentRouter = new Router()

// middlewares
import auth from '../middleware/auth.js'
import validationMiddleware from '../middleware/validationMiddleware.js'
import { getStaffMems, appointmentsTimes, getAppointmentTypes } from '../controllers/AppointmentController.js'

// getting necessary data when making an appointment

// getting staff members for a certian appointment type
appointmentRouter.get('/appointment/staffmems', auth, validationMiddleware.getStaff, getStaffMems)

// getting available times on a specific date for a specific stmem
appointmentRouter.get('/appointment/appointmentstimes', auth, validationMiddleware.appointmentsTimes, appointmentsTimes)

// get appointment types
appointmentRouter.get('/appointment/appointmenttypes', auth, getAppointmentTypes)





export default appointmentRouter