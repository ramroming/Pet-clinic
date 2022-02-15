const express = require('express')
const { 
  signup,
  myProfile,
  login,
  logout,
  logoutAll,
} = require('../controllers/UserController')
const auth = require('../middleware/auth')
const validationMiddleware = require('../middleware/validationMiddleware')

const usersRouter = new express.Router()

// create a new user endpoint
usersRouter.post('/users', validationMiddleware.signup, signup)

usersRouter.post('/users/login', validationMiddleware.login, login)


// get my profile data
usersRouter.get('/users/me', auth, myProfile)

// logout user
usersRouter.get('/users/logout', auth, logout)

// logout from all devices
usersRouter.get('/users/logoutall', auth, logoutAll)

usersRouter.get('/users/*', (req, res) => {
  res.send('404 User endpoint not found!!')
})

module.exports = usersRouter