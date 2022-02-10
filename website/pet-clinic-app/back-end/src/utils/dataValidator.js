const validator = require('validator')

const myValidator = {
  isUserType(type) {
    return  !(type !== 'client' && type !=='stmem')
  },
  isStmemType(stmem_type) {
    return !(stmem_type !== 'trainer' && stmem_type !== 'groomer' && stmem_type !== 'vet')
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
  }
}

module.exports = myValidator