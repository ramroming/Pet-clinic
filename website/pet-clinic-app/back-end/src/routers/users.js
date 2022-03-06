import { Router } from 'express'

import UserController from '../controllers/UserController.js'

// middlewares
import auth from '../middleware/auth.js'
import  formDataMiddleWare  from '../middleware/formData.js'
import validationMiddleware from '../middleware/validationMiddleware.js'

const { signup, myProfile, login, logout, registerPet, getPets, createAppointment, getAppointments, deleteAppointments } = UserController

const usersRouter = new Router()

// create a new user endpoint
usersRouter.post('/users', validationMiddleware.signup, signup)

usersRouter.post('/users/login', validationMiddleware.login, login)


// get my profile data
usersRouter.get('/users/me', auth, myProfile)

// logout user
usersRouter.get('/users/logout', auth, logout)

// to register a new pet for the user we are going to send form-data instead of application-json data and to parse this data we are using multer to create the formDataMiddleWare, we use the single function to tell that there is a file with the data called photo

usersRouter.post('/users/me/pets', auth, formDataMiddleWare.single('photo'), validationMiddleware.registerPet, registerPet, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// get the pets of the user
usersRouter.get('/users/me/pets/', auth, getPets)

// creating an appointment for a user
usersRouter.post('/users/appointment', auth, validationMiddleware.createAppointment, createAppointment)

// to show a user's active and old appointments
usersRouter.get('/users/appointment', auth, getAppointments)

usersRouter.delete('/users/appointment/:id', auth, validationMiddleware.deleteAppointment, deleteAppointments)

usersRouter.use('/users/*', (req, res) => {
  res.send('404 User endpoint not found!!')
})

export default usersRouter