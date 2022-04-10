import { Router } from "express";
import auth from "../middleware/auth.js";
import { getAppointments, deleteAppointment, confirmAppointment, createAppointment, getPetsByUserName, registerPetRec, getShelterPets, getShelterPet, createAdoptionAd, getShelterAdoptionAds, updatePostStoryRec, deleteAdoptionAd, getAdoptionRequests, transferOwnerShip } from "../controllers/ReceptionistController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import formDataMiddleWare from "../middleware/formData.js";

const receptionistRouter = new Router()

// get pets of a user by username
receptionistRouter.get('/receptionist/pets', auth, getPetsByUserName)
receptionistRouter.post('/receptionist/pets', auth, formDataMiddleWare.single('photo'), validationMiddleware.registerPet, registerPetRec, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
// transfer the owner ship of a pet to the requester after owner approval
receptionistRouter.patch('/receptionist/pets/:pet_id/:new_owner_id/:ad_id', auth, validationMiddleware.transferOwnerShipRec, transferOwnerShip)

receptionistRouter.get('/receptionist/appointments', auth, getAppointments)
receptionistRouter.post('/receptionist/appointments', auth, validationMiddleware.RecCreateAppointment, createAppointment)
receptionistRouter.patch('/receptionist/appointments/:id', auth, validationMiddleware.confirmAppointment, confirmAppointment)
receptionistRouter.delete('/receptionist/appointments/:id', auth, validationMiddleware.deleteAppointment, deleteAppointment)

receptionistRouter.get('/receptionist/shelterpet/:id', auth, validationMiddleware.getShelterPet, getShelterPet)
receptionistRouter.get('/receptionist/shelterpets', auth, getShelterPets)
receptionistRouter.get('/receptionist/shelterpets', auth, getShelterPets)

receptionistRouter.get('/receptionist/adoptionads', auth, getShelterAdoptionAds)
// create an adoption ad by receptionist
receptionistRouter.post('/receptionist/adoptionads', auth, validationMiddleware.
createAdoptionAdRec, createAdoptionAd)
receptionistRouter.delete('/receptionist/adoptionads/:ad_id', auth, validationMiddleware.deleteAdPost, deleteAdoptionAd)

// update the story of an adoption ad
receptionistRouter.patch('/receptionist/adoptionads/:ad_id', auth, validationMiddleware.updatePostStory, updatePostStoryRec)



receptionistRouter.get('/receptionist/adoptionRequests', auth, getAdoptionRequests)

export default receptionistRouter