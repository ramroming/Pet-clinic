const connData = require('../database/pet-clinic-db')
const mysql = require('mysql2/promise')
const myValidator = require('../utils/validator')

const signup = async (req, res) => {
  const { first_name, last_name, address, phone_number, user_name, email, password, user_type, stmem_type } = req.body





  // to keep track of the id's of the inserted rows
  let userID, personalInfoId

  try {
    
    // validating data
    if (!myValidator.isValidEmail(email))
      throw new Error('invalid Email Address!!')

    if (phone_number) {
      if (!myValidator.isPhoneNumber(phone_number))
      throw new Error('invalid Phone Number!!')
    }

    if (user_type) {
      if (!myValidator.isUserType(user_type))
        throw new Error('invalid User Type!!')
    }

    if (stmem_type) {
      if (!myValidator.isStmemType(stmem_type))
      throw new Error('invalid Staff Memeber type!!')
    }

    if (!myValidator.isGoodPassword(password))
      throw new Error('Weak Password!!')

    
    // establishing the connection
    const conn = await mysql.createConnection(connData)

    try {
      // inserting data into personal_info table
      const [row1, fields1] = await conn.execute('INSERT INTO personal_info (first_name, last_name, address, phone_number) VALUES (?, ?, ?, ?)', [
        first_name ? first_name : null,
        last_name ? last_name : null,
        address ? address : null,
        phone_number ? phone_number : null])
      personalInfoId = row1.insertId
      // inserting photo should be done here

      // inserting data into users table all clients by default
      const [row2, fields2] = await conn.execute('INSERT INTO users (username, email, password, user_type, stmem_type, personal_info_id) VALUES (?, ?, ?, ?, ?, ?)', [
        user_name ? user_name : null,
        email ? email : null,
        password ? password : null,
        user_type ? user_type : 'client',
        stmem_type ? stmem_type : null,
        row1.insertId
      ])
      userID = row2.insertId

      await conn.end()
      res.status(201).send()
    } catch (e) {
      // incase of an error empty remove any inserted rows
      if (personalInfoId) {
        await conn.execute('delete from personal_info where id = ?', [personalInfoId])
        console.log('hello')
      }
      if (userID) {
        await conn.execute('delete from users where id = ?', [userID])
      }
      await conn.end()

      // to check duplication error, this 1062 is an sql error code for duplication
      if (e.errno === 1062)
        return res.status(400).send({ error: 'UserName or Email already used!!' })
      res.status(400).send(e.message)
    }

  } catch (e) {
    res.status(500).send(e.message)
  }
}

module.exports = {
  signup
}