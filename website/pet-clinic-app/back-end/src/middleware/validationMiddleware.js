const myValidator = require('../utils/dataValidator')

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

  if (phone_number) {
    if (!myValidator.isPhoneNumber(phone_number))
      return res.status(400).send({ error: 'invalid Phone Number!!' })
  }

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
  const { gender, birth_date, name, breed_name, pet_type } = req.body

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

  next()
}

const createAppointment = async (req, res, next) => {

  const { appointment_type, stmem_id, pet_id, date, hour } = req.body
  console.log(req.body)
  if (!appointment_type || !stmem_id || !pet_id || !date || !hour)
    return res.status(400).send({ error: 'missing data!!' })
  if (!myValidator.isValidId(stmem_id) || !myValidator.isValidId(pet_id))
    return res.status(400).send({ error: 'Invalid Data' })
  if (!myValidator.isValidAppointmentDate(date))
    return res.status(400).send({ error: 'No Available Dates on the date specified' })

  try {
    const result = await myValidator.isMyPet(req.user.id, pet_id)
    if (!result)
      return res.status(400).send({ error: 'Invalid pet/owner ' })

    const appointmentTypeId = await myValidator.isValidAppointmentType(appointment_type)
    if (!appointmentTypeId)
      return res.status(400).send({ error: 'Invalid Data' })

    // send the appointmentType id to the controller
    req.appointmentTypeId = appointmentTypeId
    
  } catch (e) {

    return res.status(500).send({ error: e.message })
  }
  next()
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
    return res.status(400).send({ error: 'No Available Dates on the date specified' })


  next()
}


module.exports = {
  signup,
  login,
  registerPet,
  getStaff,
  appointmentsTimes,
  createAppointment
}