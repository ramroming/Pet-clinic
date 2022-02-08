const express = require('express')
const { signup } = require('../controllers/UserController')
const usersRouter = new express.Router()

usersRouter.post('/users', signup)

module.exports = usersRouter