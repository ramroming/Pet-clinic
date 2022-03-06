import { Router } from 'express'

import petController from '../controllers/petController.js'
import auth from '../middleware/auth.js'

const { getPetsBreeds } = petController

const petsRouter = new Router()

// to get the breeds when registering a pet
petsRouter.get('/pets/breeds', auth, getPetsBreeds)


petsRouter.use('/pets/*', (req, res) => {
  res.status(404).send({ error: 'pet endpoint not found'})
})

export default petsRouter