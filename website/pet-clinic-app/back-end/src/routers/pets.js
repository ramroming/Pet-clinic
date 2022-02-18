const express = require('express')
const { 
  getPetsBreeds,
  registerPet
} = require('../controllers/petController')
const auth = require('../middleware/auth')
const validationMiddleware = require('../middleware/validationMiddleware')

const petsRouter = new express.Router()

// to get the breeds when registering a pet
petsRouter.get('/pets/breeds', auth, getPetsBreeds)

// to register a new pet
petsRouter.post('/pets', auth, registerPet)

petsRouter.use('/pets/*', (req, res) => {
  res.status(404).send({ error: 'pet endpoint not found'})
})

module.exports = petsRouter