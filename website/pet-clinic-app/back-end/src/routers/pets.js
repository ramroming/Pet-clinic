const express = require('express')

const { 
  getPetsBreeds,
} = require('../controllers/petController')
const auth = require('../middleware/auth')
const validationMiddleware = require('../middleware/validationMiddleware')

const petsRouter = new express.Router()

// to get the breeds when registering a pet
petsRouter.get('/pets/breeds', auth, getPetsBreeds)


petsRouter.use('/pets/*', (req, res) => {
  res.status(404).send({ error: 'pet endpoint not found'})
})

module.exports = petsRouter