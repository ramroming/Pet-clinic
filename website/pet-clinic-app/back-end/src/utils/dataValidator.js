const validator = require('validator')
const connData = require('../database/pet-clinic-db')
const mysql = require('mysql2/promise')

const myValidator = {

  
  // shared validation
  isLongData(data) {
    return data.length > 40
  },
  isTooLong(data) {
    return data.length > 200
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


  // pet related validations
  isValidGender(gender) {
    return (gender === 'male' || gender === 'female')
  },
  // check if the the date is a valid date and is in the past
  isValidBirthDate(date) {
    return (validator.isDate(date, { format: 'YYYY-MM-DD', strictMode: true, delimiters: ['-']}) && (new Date(date) <= new Date()))
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






}

module.exports = myValidator