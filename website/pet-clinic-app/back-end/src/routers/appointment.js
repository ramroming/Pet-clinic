const express = require('express')
const appointmentRouter = new express.Router()

// middlewares
const auth = require('../middleware/auth')
const validationMiddleware = require('../middleware/validationMiddleware')
const {
  appointmentsTimes
} = require('../controllers/AppointmentController')

appointmentRouter.get('/appointmentstimes', auth, validationMiddleware.appointmentsTimes, appointmentsTimes)

module.exports = appointmentRouter