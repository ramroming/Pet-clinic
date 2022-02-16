const myValidator = require('../utils/dataValidator')

const signup = (req, res, next) => {
  const { first_name, last_name, address, phone_number, username, email, password, user_type, stmem_type } = req.body

  // validating data
  if (myValidator.isLongUsername(username))
    return res.status(400).send({error: 'long username !!'})
    
  if (myValidator.isLongFirstName(first_name))
    return res.status(400).send({error: 'long first name !!'})

  if (myValidator.isLongLastName(last_name))
    return res.status(400).send({error:'long last name !!' })

  if (myValidator.isLongAddress(address))
    return res.status(400).send({error:'long address  !!' })

  if (!myValidator.isValidEmail(email))
    return res.status(400).send({error: 'invalid Email Address!!'})

  if (phone_number) {
    if (!myValidator.isPhoneNumber(phone_number))
      return res.status(400).send({error: 'invalid Phone Number!!'})
  }

  if (user_type) {
    if (!myValidator.isUserType(user_type))
      return res.status(400).send({error: 'invalid User Type!!'})

  }

  if (stmem_type) {
    if (!myValidator.isStmemType(stmem_type))
    return res.status(400).send({error: 'invalid Staff Memeber type!!'})
  }

  if (!myValidator.isGoodPassword(password))
    return res.status(400).send({error: 'Weak Password!!'})

  next()
}

const login = (req, res, next) => {
  const {username, password} = req.body

  // validating data
  if (myValidator.isLongUsername(username))
    return res.status(400).send({error: 'long username !!'})

  if (myValidator.isLongPassword(password))
    return res.status(400).send({error: 'long password !!'})
  next()
}

module.exports = {
  signup,
  login
}