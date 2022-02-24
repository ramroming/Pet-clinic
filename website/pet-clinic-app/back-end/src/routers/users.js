const express = require('express')

const { 
  signup,
  myProfile,
  login,
  logout,
  registerPet,
  getPets
} = require('../controllers/UserController')

// middlewares
const auth = require('../middleware/auth')
const formDataMiddleWare = require('../middleware/formData')
const validationMiddleware = require('../middleware/validationMiddleware')

const usersRouter = new express.Router()

// create a new user endpoint
usersRouter.post('/users', validationMiddleware.signup, signup)

usersRouter.post('/users/login', validationMiddleware.login, login)


// get my profile data
usersRouter.get('/users/me', auth, myProfile)

// logout user
usersRouter.get('/users/logout', auth, logout)

// to register a new pet for the user we are going to send form-data instead of application-json data and to parse this data we are using multer to create the formDataMiddleWare, we use the single function to tell that there is a file with the data called photo

usersRouter.post('/users/me/pets/', auth, formDataMiddleWare.single('photo'), validationMiddleware.registerPet, registerPet, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// get the pets of the user
usersRouter.get('/users/me/pets/', auth, getPets)

usersRouter.use('/users/*', (req, res) => {
  res.send('404 User endpoint not found!!')
})

module.exports = usersRouter