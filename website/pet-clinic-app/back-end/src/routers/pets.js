import { Router } from 'express'

import { getPetsBreeds, getPetsColors } from '../controllers/petController.js'
import auth from '../middleware/auth.js'



const petsRouter = new Router()

// to get the breeds when registering a pet
petsRouter.get('/pets/breeds', auth, getPetsBreeds)

// to get the colors when registering a pet
petsRouter.get('/pets/colors', auth, getPetsColors)


petsRouter.use('/pets/*', (req, res) => {
  res.status(404).send({ error: 'pet endpoint not found'})
})

export default petsRouter