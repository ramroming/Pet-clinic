import { Router } from "express";
import auth from "../middleware/auth.js";
import { getAdoptionAd, getAdoptionAds } from "../controllers/AdoptionController.js";
import validationMiddleware from "../middleware/validationMiddleware.js";

const adoptionRouter = new Router()

// get adoption ads
adoptionRouter.get('/adoptionads/', auth, validationMiddleware.getAdoptionAds,  getAdoptionAds)

// get an adoption ad by id
adoptionRouter.get('/adoptionads/:id', auth, getAdoptionAd)


export default adoptionRouter