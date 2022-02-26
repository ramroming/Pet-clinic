const express = require('express')
const appointmentRouter = new express.Router()

// middlewares
const auth = require('../middleware/auth')
const validationMiddleware = require('../middleware/validationMiddleware')
const {
  getStaffMems,
  appointmentsTimes
} = require('../controllers/AppointmentController')

// getting necessary data when making an appointment

// getting staff members for a certian appointment type
appointmentRouter.get('/appointment/staffmems', auth, validationMiddleware.getStaff, getStaffMems)

// getting available times on a specific date for a specific stmem
appointmentRouter.get('/appointment/appointmentstimes', auth, validationMiddleware.appointmentsTimes, appointmentsTimes)


module.exports = appointmentRouter