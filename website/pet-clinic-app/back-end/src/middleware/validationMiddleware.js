import myValidator from '../utils/dataValidator.js'
import petClinicRules from '../utils/petclinicrules.js'
import  validator  from 'validator'

const { CLINIC_WORKING_HOURS } = petClinicRules
// Client Related
const signup = (req, res, next) => {
  const { first_name, last_name, address, phone_number, username, email, password, user_type, stmem_type } = req.body

  // validating data for signing up
  if (myValidator.isLongData(username))
    return res.status(400).send({ error: 'long username !!' })

  if (myValidator.isLongData(first_name))
    return res.status(400).send({ error: 'long first name !!' })

  if (myValidator.isLongData(last_name))
    return res.status(400).send({ error: 'long last name !!' })

  if (myValidator.isTooLong(address))
    return res.status(400).send({ error: 'long address  !!' })

  if (!myValidator.isValidEmail(email))
    return res.status(400).send({ error: 'invalid Email Address!!' })

  if (!myValidator.isPhoneNumber(phone_number))
    return res.status(400).send({ error: 'invalid Phone Number!!' })
  

  if (user_type) {
    if (!myValidator.isUserType(user_type))
      return res.status(400).send({ error: 'invalid User Type!!' })

  }

  if (stmem_type) {
    if (!myValidator.isStmemType(stmem_type))
      return res.status(400).send({ error: 'invalid Staff Memeber type!!' })
  }

  if (!myValidator.isGoodPassword(password))
    return res.status(400).send({ error: 'Weak Password!!' })

  next()
}
const updateMyProfile = (req, res, next) => {

  const { first_name, last_name, address, phone_number, photoChanged } = req.body

  // validating data for signing up

 
  if (!first_name || !last_name || !address || !phone_number || !photoChanged)
    return res.status(400).send({ error: 'missing data' })
  if (photoChanged !== 'yes' && photoChanged !=='no')
    return res.status(400).send({ error: 'missing data' })

  if (myValidator.isLongData(first_name))
    return res.status(400).send({ error: 'long first name !!' })

  if (myValidator.isLongData(last_name))
    return res.status(400).send({ error: 'long last name !!' })

  if (myValidator.isTooLong(address))
    return res.status(400).send({ error: 'long address  !!' })


  if (!myValidator.isPhoneNumber(phone_number))
    return res.status(400).send({ error: 'invalid Phone Number!!' })
  

  next()
}

const updateMyAccount = (req, res, next) => {
  const { username, email, old_password, new_password, changePassword } = req.body
  if (!username || !email || !changePassword)
    return res.status(400).send({ error: 'missing data' })
  if (changePassword !== 'yes' && changePassword !== 'no')
    return res.status(400).send({ error: 'bad data' })

  if (changePassword === 'yes') {
    if (!old_password || !new_password)
      return res.status(400).send({ error: 'missing data' })
    if (!myValidator.isGoodPassword(new_password))
      return res.status(400).send({ error: 'Weak password' })
  }
  if (!myValidator.isValidEmail(email))
    return res.status(400).send({ error: 'invalid Email Address' })


  next()
}
const login = (req, res, next) => {
  const { username, password } = req.body

  // validating data for loging in
  if (myValidator.isLongData(username))
    return res.status(400).send({ error: 'long username !!' })

  if (myValidator.isLongPassword(password))
    return res.status(400).send({ error: 'long password !!' })
  next()
}

const registerPet = async (req, res, next) => {
  const { gender, birth_date, name, breed_name, pet_type, colors } = req.body

  if (!gender || !birth_date || !name || !breed_name || !pet_type || !colors)
    return res.status(400).send({ error: 'missing data' })
  // checking long values
  if (myValidator.isLongData(gender) || myValidator.isLongData(birth_date) || myValidator.isLongData(name) || myValidator.isLongData(breed_name))
    return res.status(400).send({ error: 'Long Data!! ' })

  // checking gender's validity
  if (!myValidator.isValidGender(gender))
    return res.status(400).send({ error: 'invalid gender value ' })

  // checking birth_date validity 
  if (!myValidator.isValidBirthDate(birth_date))
    return res.status(400).send({ error: 'invalid birthdate value or format hint: only YYYY-MM-DD format is allowed' })
  if (!myValidator.isValidPetType(pet_type))
    return res.status(400).send({ error: 'invalid pet_type ' })

  try {
    const result = await myValidator.isValidBreed(breed_name, pet_type)
    if (!result)
      return res.status(400).send({ error: 'invalid breed or pet_type ' })
  } catch (e) {

    return res.status(500).send({ error: e.message })
  }
  try {
    const result = await myValidator.isValidColors(colors)
    if (!result.valid)
      return res.status(400).send({ error: 'invalid colors' })
    req.body.colors = result.colorWithId
    
  }
  catch(e) {
    return res.status(500).send({ error: e.message })
  }

  next()
}
const updatePet = async (req, res, next) => {
  const { gender, birth_date, name, breed_name, colors, pet_type } = req.body

  if (!gender || !birth_date || !name || !breed_name || !req.params.pet_id || !pet_type || !colors)
    return res.status(400).send({ error: 'missing data' })

  if (!myValidator.isValidId(req.params.pet_id))
    return res.status(400).send({ error: 'Bad Data' })

  // checking long values
  if (myValidator.isLongData(gender) || myValidator.isLongData(birth_date) || myValidator.isLongData(name) || myValidator.isLongData(breed_name))
    return res.status(400).send({ error: 'Long Data!! ' })

  // checking gender's validity
  if (!myValidator.isValidGender(gender))
    return res.status(400).send({ error: 'invalid gender value ' })

  // checking birth_date validity 
  if (!myValidator.isValidBirthDate(birth_date))
    return res.status(400).send({ error: 'invalid birthdate value or format hint: only YYYY-MM-DD format is allowed' })
  if (!myValidator.isValidPetType(pet_type))
    return res.status(400).send({ error: 'invalid pet_type ' })

  try {
    const result = await myValidator.isValidBreed(breed_name, pet_type)
    if (!result)
      return res.status(400).send({ error: 'invalid breed or pet_type ' })
  } catch (e) {

    return res.status(500).send({ error: e.message })
  }
  try {
    const result = await myValidator.isValidColors(colors)
    if (!result.valid)
      return res.status(400).send({ error: 'invalid colors' })
    req.body.colors = result.colorWithId
    const validPet = await myValidator.isOwnerPet(req.user.id, req.params.pet_id)
    if (!validPet)
      return res.status(400).send({ error: 'invalid pet/owner_id' })

    
  }
  catch(e) {
    return res.status(500).send({ error: e.message })
  }

  next()
}
const getMyPet = async (req, res, next) => {
  if (!req.params.id || !myValidator.isValidId(req.params.id))
    return res.status(400).send({ error: 'Bad URL !!'})
  try {
    const result = await myValidator.isOwnerPet(req.user.id, req.params.id)
    if (!result)
      return res.status(400).send({ error: 'invalid pet/owner_id'})
    req.pet = result
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
  next()
}
const createAppointment = async (req, res, next) => {

  const { appointment_type, stmem_id, pet_id, date, hour } = req.body
  if (!appointment_type || !stmem_id || !pet_id || !date || !hour)
    return res.status(400).send({ error: 'missing data!!' })
  if (!myValidator.isValidId(stmem_id) || !myValidator.isValidId(pet_id))
    return res.status(400).send({ error: 'Invalid Data' })
  if (!myValidator.isValidAppointmentDate(date))
    return res.status(400).send({ error: 'No Available Dates on the date specified' })

  try {
    const result = await myValidator.isOwnerPet(req.user.id, pet_id)
    if (!result)
      return res.status(400).send({ error: 'Invalid pet/owner ' })

    const appointmentTypeId = await myValidator.isValidAppointmentType(appointment_type)
    if (!appointmentTypeId)
      return res.status(400).send({ error: 'Invalid Data' })

    const result2 = await myValidator.isValidStmemAppointment(appointment_type, stmem_id)
    if (!result2)
      return res.status(400).send({ error: 'Invalid Stmem/appointment' })

    // send the appointmentType id to the controller
    req.appointmentTypeId = appointmentTypeId
    
  } catch (e) {

    return res.status(500).send({ error: e.message })
  }
  next()
}



const createAdoptionAd = async (req, res, next) => {
  const { pet_id, story } = req.body
  if (!pet_id || !story)
    return res.status(400).send({ error: 'Missing Data!!' })
  if (myValidator.is2TooLong(story) || !myValidator.isValidId(pet_id))
    return res.status(400).send({ error: 'Invalid Data!! ' })
  try {
    const result = await myValidator.isOwnerPet(req.user.id, pet_id)
    if (!result)
      return res.status(400).send({ error: 'invalid pet/owner_id'})
    if (!result.photo)
      return res.status(400).send({ error: 'You should upload a photo for your pet first to create a post!!'})

    req.pet = result

  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
  
  next()
}
const commentOnAd =  (req, res, next) => {
  if (!req.body.comment || !req.body.ad_id || !myValidator.isValidId(req.body.ad_id))
    return res.status(400).send({ error: 'Bad Data' })

  if (myValidator.is2TooLong(req.body.comment))
    return res.status(400).send({ error: 'LONG DATA !!' })
  next()
}
const updatePostStory = (req, res, next) => {
  if (!req.body.story || myValidator.is2TooLong(req.body.story) || !req.params.ad_id || !myValidator.isValidId(req.params.ad_id))
    return res.status(400).send({ error: 'Bad Data !!' })
  next()
}
const createRequest = async (req, res, next) => {
  if (!req.params.ad_id || !myValidator.isValidId(req.params.ad_id))
    return res.status(400).send({ error: 'Bad Data !!' })
  try {
    const isValid = await myValidator.isValidRequestAdoptionAd(req.user.id, req.params.ad_id)
    if (!isValid)
      return res.status(404).send({ error: 'Invalid adoption ad id' })
    const exist = await myValidator.nonExistentRequest(req.user.id, req.params.ad_id)
    if (exist)
      return res.status(400).send({ error: 'you have already requested  this adoption ad'})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
  next()
}
const deleteAdPost = (req, res, next) => {
  if (!req.params.ad_id || !myValidator.isValidId(req.params.ad_id))
    return res.status(400).send({ error: 'Bad Data !!' })
  next() 
}
const deleteRequest = (req, res, next) => {
  if (!req.params.req_id || !myValidator.isValidId(req.params.req_id))
    return res.status(400).send({ error: 'Bad URL'})
  
  next()
}
const transferOwnerShip = async (req, res, next) => {
  if (!req.params.new_owner_id || !req.params.pet_id || !req.params.ad_id || !myValidator.isValidId(req.params.pet_id) || !myValidator.isValidId(req.params.new_owner_id) || !myValidator.isValidId(req.params.ad_id))
    return res.status(400).send({ error: 'Bad URL' })
  try {
    const result = await myValidator.isOwnerPet(req.user.id, req.params.pet_id)
    if (!result)
      return res.status(400).send({ error: 'invalid pet/owner_id'})
    const inAd = await myValidator.petInAdoptionAd(req.params.pet_id, req.params.ad_id, req.user.id)
    if (!inAd)
      return res.status(400).send({ error: 'invalid pet/adoption_ad'})
    const requested = await myValidator.nonExistentRequest(req.params.new_owner_id, req.params.ad_id)

    if (!requested){
      return res.status(400).send({ error: 'new owner didnt request your pet '})
    }
    
    
    next()

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

// Appointment Related

const getStaff = async (req, res, next) => {
  if (!req.query.appointment_type)
    return res.status(400).send({ error: 'Bad URL!!' })
  try {
    const appointmentTypeId = await myValidator.isValidAppointmentType(req.query.appointment_type)
    if (!appointmentTypeId)
      return res.status(400).send({ error: 'Bad URL!!' })

  } catch (e) {
    return res.status(500).send({ error: e.message })
  }

  next()
}

const appointmentsTimes = (req, res, next) => {
  if (!req.query.stmem_id || !req.query.date)
    return res.status(400).send({ error: 'Bad URL!!' })
  if (!myValidator.isValidId(req.query.stmem_id))
    return res.status(400).send({ error: 'Bad URL!!' })
  if (!myValidator.isValidAppointmentDate(req.query.date))
    return res.send({ availableTimes: [], CLINIC_WORKING_HOURS })


  next()
}

// Adoption related
const getAdoptionAds = async (req, res, next) => {
  if (req.query.last_date && !validator.isISO8601(req.query.last_date))
    return res.status(400).send({ error: 'Invalid Query string' })
  next()
}

// shared
const deleteAppointment = async (req, res, next) => {
  if (!req.params.id || !myValidator.isValidId(req.params.id))
    return res.status(400).send({ error: 'Bad URL!!' })
  next()
}

// receptionist realted
const confirmAppointment = async (req, res, next) => {
  if (!req.params.id || !myValidator.isValidId(req.params.id))
    return res.status(400).send({ error: 'Bad URL!!' })
  next()
}
const RecCreateAppointment = async (req, res, next) => {

  const { appointment_type, stmem_id, pet_id, user_name, date, hour } = req.body
  if (!appointment_type || !stmem_id || !pet_id || !date || !hour)
    return res.status(400).send({ error: 'missing data!!' })
  if (!myValidator.isValidId(stmem_id) || !myValidator.isValidId(pet_id)) 
    return res.status(400).send({ error: 'Invalid Data' })
  if (!myValidator.isValidAppointmentDate(date))
    return res.status(400).send({ error: 'No Available Dates on the date specified' })

  try {
    const userId = await myValidator.isValidUser(user_name)
    if (!userId)
      return res.status(400).send({ error: 'Invalid username ' })

    const result = await myValidator.isOwnerPet(userId, pet_id)
    if (!result)
      return res.status(400).send({ error: 'Invalid pet/owner ' })

    const appointmentTypeId = await myValidator.isValidAppointmentType(appointment_type)
    if (!appointmentTypeId)
      return res.status(400).send({ error: 'Invalid Data' })

    const result2 = await myValidator.isValidStmemAppointment(appointment_type, stmem_id)
    if (!result2)
      return res.status(400).send({ error: 'Invalid Stmem/appointment' })

    // send the appointmentType id to the controller
    req.appointmentTypeId = appointmentTypeId
    req.user_id = userId
    
  } catch (e) {

    return res.status(500).send({ error: e.message })
  }
  next()
}



export default {
  signup,
  updateMyProfile,
  updateMyAccount,
  login,
  registerPet,
  updatePet,
  getStaff,
  appointmentsTimes,
  createAppointment,
  deleteAppointment,
  getMyPet,
  createAdoptionAd,
  commentOnAd,
  getAdoptionAds,
  updatePostStory,
  deleteAdPost,
  createRequest, 
  deleteRequest,
  transferOwnerShip,
  confirmAppointment,
  RecCreateAppointment

}