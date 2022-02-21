const express = require('express')

const { 
  signup,
  myProfile,
  login,
  logout,
  registerPet,
  uploadPetImage
} = require('../controllers/UserController')

// middlewares
const auth = require('../middleware/auth')
const upload_pet_image = require('../middleware/uploadPetImage')
const validationMiddleware = require('../middleware/validationMiddleware')

const usersRouter = new express.Router()

// create a new user endpoint
usersRouter.post('/users', validationMiddleware.signup, signup)

usersRouter.post('/users/login', validationMiddleware.login, login)


// get my profile data
usersRouter.get('/users/me', auth, myProfile)

// logout user
usersRouter.get('/users/logout', auth, logout)

// to register a new pet for the user there is a two step process first create a pet without a photo and send back the newly created pet id, the second step is sending another request to post the pet's image this one will be multi-part/form type header
usersRouter.post('/users/me/pets', auth, validationMiddleware.registerPet,  registerPet)

usersRouter.post('/users/me/pets/image/:pet_id', auth, upload_pet_image.single('pet_image'), uploadPetImage, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

usersRouter.use('/users/*', (req, res) => {
  res.send('404 User endpoint not found!!')
})

module.exports = usersRouter