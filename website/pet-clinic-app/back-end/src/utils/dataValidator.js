const validator = require('validator')
const mysql = require('mysql2/promise')
const connData = require('../database/pet-clinic-db')
const { CLINIC_TIME_ZONE_OFFSET, CLINIC_WORKING_HOURS} = require('./petclinicrules')

const myValidator = {

  
  // shared validation
  isLongData(data) {
    return data.length > 40
  },
  isTooLong(data) {
    return data.length > 200
  },
  isValidId(id) {
    return !(isNaN(id) || id <= 0)
  },


  // user related validations
  isUserType(type) {
    return  !(type !== 'client' && type !=='stmem')
  },
  isStmemType(stmem_type) {
    
    return (['trainer', 'groomer', 'vet', 'receptionist', 'admin'].includes(stmem_type))
  },
  isPhoneNumber(phone_number) {
    return validator.isMobilePhone(phone_number)
  },
  isValidEmail(email) {
    return validator.isEmail(email)
  },
  isGoodPassword(password) {
    if (!password)
      return true
    return validator.isStrongPassword(password)
  },
  isLongPassword(password) {
    return password.length > 128
  },
  async isMyPet(userId, pet_id) {
    try {
      const conn = await mysql.createConnection(connData)
      const [rows, fields] = await conn.execute('SELECT name FROM pets WHERE owner_id = ? AND id = ?', [userId, pet_id])
      await conn.end()

      // if a user dosen't own the pet 
      if (!rows.length)
        return false
      
      
      // if the user owns the pet
      return true

    }  catch(e) {
      throw e
    }
  },

  // pet related validations
  isValidGender(gender) {
    return (gender === 'male' || gender === 'female')
  },
  // check if the the date is a valid date and is in the past
  isValidBirthDate(date) {
    return (validator.isDate(date, { format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']}) )
  },
  isValidPetType(pet_type) {
    return (['cat', 'bird', 'dog'].includes(pet_type))
  },

  async isValidBreed(breed_name, pet_type) {
    try {
      const conn = await mysql.createConnection(connData)
      const [rows, fields] = await conn.execute('SELECT * FROM breeds WHERE name = ? AND type_name = ?', [breed_name, pet_type])
      await conn.end()

      // if the pet_type and the breeds are invalid 
      if (!rows.length)
        return false
      
      
      // if the pet_type and the breeds are valid 
      return true

    }  catch(e) {
      throw e
    }
  },

  // Appointment related validations

  async isValidAppointmentType(appointment_type) {
    try {
      const conn = await mysql.createConnection(connData)
      const [rows, fields] = await conn.execute('SELECT * FROM appointment_types WHERE name = ?', [appointment_type])
      await conn.end()

      // if the appointment_type is invalid 
      if (!rows.length)
        return false
      
      
      // if the appointment_type is valid  
      return rows[0].id

    }  catch(e) {
      throw e
    }
  },
  isValidAppStmem(appointment_type, stmem_id) {
    
  },
  isValidAppointmentDate(date) {

    return (validator.isDate(date, { format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']}) && (new Date(date).setUTCHours(23) >= new Date(new Date().setUTCHours(new Date().getUTCHours() + CLINIC_TIME_ZONE_OFFSET))))
  },
  isValidHour(hour) {
    return (!isNaN(hour) && CLINIC_WORKING_HOURS.includes(hour))
  },
  



}

module.exports = myValidator