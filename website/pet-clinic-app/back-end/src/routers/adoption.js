import { Router } from "express";
import auth from "../middleware/auth.js";
import { getAdoptionAd } from "../controllers/AdoptionController.js";

const adoptionRouter = new Router()

// get an adoption ad by id
adoptionRouter.get('/adoptionads/:id', auth, getAdoptionAd)

export default adoptionRouter