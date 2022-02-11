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
  },
  isLongPassword(password) {
    return password.length > 128
  },
  isLongUsername(username) {
    return username.length > 20
  },
  isLongFirstName(firstName) {
    return firstName.length > 20
  },
  isLongLastName(lastName) {
    return lastName.length > 20
  },
  isLongAddress(address) {
    return address.length > 200
  }


}

module.exports = myValidator