const express = require('express')
const { 
  signup,
  readUsers,
  readUserById,
  login 
} = require('../controllers/UserController')
const usersRouter = new express.Router()

// create a new user endpoint
usersRouter.post('/users', signup)

usersRouter.post('/users/login', login)

// read all users data with personal info endpoint
usersRouter.get('/users', readUsers)

// get  users data and personal data by id endpoint
usersRouter.get('/users/:id', readUserById)

module.exports = usersRouter