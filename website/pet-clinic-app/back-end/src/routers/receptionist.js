import { Router } from "express";
import auth from "../middleware/auth.js";
import { getAppointments, deleteAppointment, confirmAppointment, createAppointment, getPetsByUserName, registerPetRec, getShelterPets, getShelterPet, createAdoptionAd, getShelterAdoptionAds, updatePostStoryRec, deleteAdoptionAd, getAdoptionRequests, transferOwnerShip, recUpdatePet, deleteShelterPet } from "../controllers/ReceptionistController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";
import formDataMiddleWare from "../middleware/formData.js";
import authorization from "../middleware/authorization.js";

const receptionistRouter = new Router()

// get pets of a user by username
receptionistRouter.get('/receptionist/pets', auth, authorization.rec, getPetsByUserName)
receptionistRouter.post('/receptionist/pets', auth, authorization.rec, formDataMiddleWare.single('photo'), validationMiddleware.registerPet, registerPetRec, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
// transfer the owner ship of a pet to the requester after owner approval
receptionistRouter.patch('/receptionist/pets/:pet_id/:new_owner_id/:ad_id', auth, authorization.rec, validationMiddleware.transferOwnerShipRec, transferOwnerShip)

receptionistRouter.get('/receptionist/appointments', auth, authorization.rec, getAppointments)
receptionistRouter.post('/receptionist/appointments', auth, authorization.rec, validationMiddleware.RecCreateAppointment, createAppointment)
receptionistRouter.patch('/receptionist/appointments/:id', auth, authorization.rec, validationMiddleware.confirmAppointment, confirmAppointment)
receptionistRouter.delete('/receptionist/appointments/:id', auth, authorization.rec, validationMiddleware.deleteAppointment, deleteAppointment)

receptionistRouter.get('/receptionist/shelterpet/:id', auth, authorization.rec, validationMiddleware.getShelterPet, getShelterPet)
receptionistRouter.get('/receptionist/shelterpets', auth, authorization.rec, getShelterPets)
receptionistRouter.patch('/receptionist/shelterpets/:pet_id', auth, authorization.rec, formDataMiddleWare.single('photo'), validationMiddleware.updatePet, recUpdatePet, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})
receptionistRouter.delete('/receptionist/shelterpets/:pet_id', auth, authorization.rec, validationMiddleware.deleteShelterPet, deleteShelterPet)
receptionistRouter.get('/receptionist/adoptionads', auth, authorization.rec, getShelterAdoptionAds)
// create an adoption ad by receptionist
receptionistRouter.post('/receptionist/adoptionads', auth, authorization.rec, validationMiddleware.
createAdoptionAdRec, createAdoptionAd)
receptionistRouter.delete('/receptionist/adoptionads/:ad_id', auth, authorization.rec, validationMiddleware.deleteAdPost, deleteAdoptionAd)

// update the story of an adoption ad
receptionistRouter.patch('/receptionist/adoptionads/:ad_id', auth, authorization.rec, validationMiddleware.updatePostStory, updatePostStoryRec)



receptionistRouter.get('/receptionist/adoptionRequests', auth, authorization.rec, getAdoptionRequests)

export default receptionistRouter