const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')
const connData = require('../database/pet-clinic-db')
const myValidator = require('../utils/dataValidator')
const { findUserByCredentials } = require('../utils/operationValidator')

const signup = async (req, res) => {
  const { first_name, last_name, address, phone_number, user_name, email, password, user_type, stmem_type } = req.body





  // to keep track of the id's of the inserted rows
  let userID, personalInfoId

  try {

    // establishing the connection
    const conn = await mysql.createConnection(connData)

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


      // inserting data into personal_info table
      const [user1, fields1] = await conn.execute('INSERT INTO personal_info (first_name, last_name, address, phone_number) VALUES (?, ?, ?, ?)', [
        first_name ? first_name : null,
        last_name ? last_name : null,
        address ? address : null,
        phone_number ? phone_number : null])
      personalInfoId = user1.insertId
      // inserting photo should be done here


      // hashing password before adding it to the database
      const hashedPassword = await bcrypt.hash(password, 8)


      // inserting data into users table all clients by default
      const [user2, fields2] = await conn.execute('INSERT INTO users (username, email, password, user_type, stmem_type, personal_info_id) VALUES (?, ?, ?, ?, ?, ?)', [
        user_name ? user_name : null,
        email ? email : null,
        password ? hashedPassword : null,
        user_type ? user_type : 'client',
        stmem_type ? stmem_type : null,
        user1.insertId
      ])
      userID = user2.insertId

      await conn.end()
      res.status(201).send()
    } catch (e) {
      // incase of an error empty remove any inserted rows
      if (personalInfoId) {
        await conn.execute('delete from personal_info where id = ?', [personalInfoId])
      }
      if (userID) {
        await conn.execute('delete from users where id = ?', [userID])
      }
      await conn.end()

      // to check duplication error, this 1062 is an sql error code for duplication
      if (e.errno === 1062)
        return res.status(400).send({ error: 'UserName or Email already used!!' })
      res.status(400).send({ error: e.message })
    }

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const login = async (req, res) => {
  try {
    const conn = await mysql.createConnection(connData)

    try {
      const user = await findUserByCredentials(conn, req.body.username, req.body.password)
      res.status(200).send(user)
    } catch (e) {
      await conn.end()
      res.status(400).send(e.message)
    }
    
  }
  catch (e) {
    await conn.end()
    res.status(500).send({ error: e.message })
  }
}

const readUsers = async (req, res) => {
  try {
    const conn = await mysql.createConnection(connData)

    const [users, fields] = await conn.execute('SELECT * FROM users INNER JOIN personal_info ON users.personal_info_id = personal_info.id')

    if (!users) {
      await conn.end()
      return res.status(404).send()
    }

    await conn.end()
    res.status(200).send(users)

  } catch (e) {
    await conn.end()
    res.status(500).send({ error: e.message })
  }

}

const readUserById = async (req, res) => {
  const userId = req.params.id
  try {
    const conn = await mysql.createConnection(connData)

    const [users, fields] = await conn.execute('SELECT * FROM users INNER JOIN personal_info ON users.personal_info_id=personal_info.id WHERE users.id=?', [userId])

    if (!users.length) {
      await conn.end()
      return res.status(404).send({ error: 'User not found!!' })
    }
    await conn.end()
    res.status(200).send(users[0])

  } catch (e) {
    await conn.end()
    res.status(500).send({ error: e.message })
  }
}





module.exports = {
  signup,
  readUsers,
  readUserById,
  login
}