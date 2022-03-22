import { Router } from 'express'

import { signup, myProfile, updateMyProfile, login, logout, registerPet, getPets, createAppointment, getAppointments, deleteAppointments, getMyPet, createAdoptionAd, commentOnAd, updatePostStory, deleteAdPost, getMyAdoptionAds, getMyRequests, createRequest, deleteRequest, transferOwnerShip, updateMyAccount,updatePet} from '../controllers/UserController.js'

// middlewares
import auth from '../middleware/auth.js'
import  formDataMiddleWare  from '../middleware/formData.js'
import validationMiddleware from '../middleware/validationMiddleware.js'



const usersRouter = new Router()

// create a new user endpoint
usersRouter.post('/users', validationMiddleware.signup, signup)

usersRouter.post('/users/login', validationMiddleware.login, login)


// get my profile data
usersRouter.get('/users/me', auth, myProfile)

// update user's personal info
usersRouter.patch('/users/me', auth, formDataMiddleWare.single('photo'), validationMiddleware.updateMyProfile,  updateMyProfile, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

//update users' account info
usersRouter.patch('/users/me/account', auth, validationMiddleware.updateMyAccount, updateMyAccount)

// logout user
usersRouter.get('/users/logout', auth, logout)

// to register a new pet for the user we are going to send form-data instead of application-json data and to parse this data we are using multer to create the formDataMiddleWare, we use the single function to tell that there is a file with the data called photo

usersRouter.post('/users/me/pets', auth, formDataMiddleWare.single('photo'), validationMiddleware.registerPet, registerPet, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
// update pets for a user
usersRouter.patch('/users/me/pet/:pet_id', auth, formDataMiddleWare.single('photo'), validationMiddleware.updatePet, updatePet, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

// transfer the owner ship of a pet to the requester after owner approval
usersRouter.patch('/users/me/pets/:pet_id/:new_owner_id/:ad_id', auth, validationMiddleware.transferOwnerShip, transferOwnerShip)

// get all  pets of the user
usersRouter.get('/users/me/pets/', auth, getPets)

// get a user pet by id
usersRouter.get('/users/me/pets/:id', auth, validationMiddleware.getMyPet,  getMyPet)

// creating an appointment for a user
usersRouter.post('/users/me/appointments', auth, validationMiddleware.createAppointment, createAppointment)

// to show a user's active and old appointments
usersRouter.get('/users/me/appointments', auth, getAppointments)

usersRouter.delete('/users/me/appointments/:id', auth, validationMiddleware.deleteAppointment, deleteAppointments)

usersRouter.get('/users/me/adoptionads/', auth, getMyAdoptionAds)
// create an adoption ad for a user
usersRouter.post('/users/me/adoptionads/', auth, validationMiddleware.createAdoptionAd, createAdoptionAd)

// update the story of an adoption ad
usersRouter.patch('/users/me/adoptionads/:ad_id', auth, validationMiddleware.updatePostStory, updatePostStory)
// update the story of an adoption ad
usersRouter.delete('/users/me/adoptionads/:ad_id', auth, validationMiddleware.deleteAdPost, deleteAdPost)

usersRouter.get('/users/me/requests/', auth, getMyRequests)
usersRouter.post('/users/me/requests/:ad_id', auth, validationMiddleware.createRequest, createRequest)
usersRouter.delete('/users/me/requests/:req_id', auth, validationMiddleware.deleteRequest, deleteRequest)
usersRouter.patch('/users/me/a')

// comment on an Ad
usersRouter.post('/users/me/comments/', auth, validationMiddleware.commentOnAd, commentOnAd)

usersRouter.use('/users/*', (req, res) => {
  res.send('404 User endpoint not found!!')
})

export default usersRouter