const express = require('express')
const { 
  signup,
  myProfile,
  login,
  logout,
  logoutAll,
} = require('../controllers/UserController')
const auth = require('../middleware/auth')

const usersRouter = new express.Router()

// create a new user endpoint
usersRouter.post('/users', signup)

usersRouter.post('/users/login', login)


// get my profile data
usersRouter.get('/users/me', auth, myProfile)

// logout user
usersRouter.get('/users/logout', auth, logout)

// logout from all devices
usersRouter.get('/users/logoutall', auth, logoutAll)

module.exports = usersRouter