const express = require('express')
const staffmemRouter = new express.Router()

// middlewares
const auth = require('../middleware/auth')
const validationMiddleware = require('../middleware/validationMiddleware')
const {
  getStaffMems
} = require('../controllers/StaffController')

staffmemRouter.get('/staffmems', auth, validationMiddleware.getStaff, getStaffMems)

module.exports = staffmemRouter