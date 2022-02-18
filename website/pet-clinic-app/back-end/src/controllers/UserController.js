const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')
const connData = require('../database/pet-clinic-db')
const myValidator = require('../utils/dataValidator')
const { findUserByCredentials, generateAuthToken } = require('../utils/authOperations')

const signup = async (req, res) => {
  const { first_name, last_name, address, phone_number, username, email, password, user_type, stmem_type } = req.body





  // to keep track of the id's of the inserted rows
  let userID, personalInfoId

  try {

    
    // establishing the connection
    const conn = await mysql.createConnection(connData)

    try {
      // inserting data into personal_info table
      const [personal_info, fields1] = await conn.execute('INSERT INTO personal_info (first_name, last_name, address, phone_number) VALUES (?, ?, ?, ?)', [
        first_name ? first_name : null,
        last_name ? last_name : null,
        address ? address : null,
        phone_number ? phone_number : null])
      personalInfoId = personal_info.insertId

      // inserting photo should be done here


      // hashing password before adding it to the database
      const hashedPassword = await bcrypt.hash(password, 8)


      // inserting data into users table all clients by default
      const [user, fields2] = await conn.execute('INSERT INTO users (username, email, password, user_type, stmem_type, personal_info_id) VALUES (?, ?, ?, ?, ?, ?)', [
        username ? username : null,
        email ? email : null,
        password ? hashedPassword : null,
        user_type ? user_type : 'client',
        stmem_type ? stmem_type : null,
        personalInfoId
      ])
      userID = user.insertId

      await conn.end()

      // creating the JWT 
      const token = await generateAuthToken(userID)

      // if storing token to the database failed
      if (!token) {
        return res.status(500).send({ error: 'Couldnt save token to the database' })
      }

      // data to send back when signup
      const userData = {
        id: userID,
        username: username ? username : null,
        email: email ? email : null,
        user_type: user_type ? user_type : 'client',
        stmem_type: stmem_type ? stmem_type : null,
        personal_info_id: personalInfoId
      }

      res.status(201).send({ token, userData })
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
      const token = await generateAuthToken(user.id)
      // if saving token to database failed
      if (!token) {
        return res.status(500).send({error: 'couldnt save token to database' })
      }
      res.status(200).send({ user, token})
    } catch (e) {
      await conn.end()
      res.status(400).send({error: e.message})
    }
    
  }
  catch (e) {
    await conn.end()
    res.status(500).send({ error: e.message })
  }
}


// read user's profile
const myProfile = async (req, res) => {
  res.send(req.user)
}

// logout user
const logout = async (req, res) => {
  res.status(200).send()
}
// // logout user
// const logout = async (req, res) => {
//   try {
//     const conn = await mysql.createConnection(connData)
//     await conn.execute('DELETE FROM user_tokens WHERE token = ? AND user_id = ?', [req.token, req.user.id])
//     await conn.end()
//     res.status(200).send()
//     // if the connection to database failed
//   } catch (e) {
//     await conn.end()
//     res.status(500).send({error: 'failed to connect to database'})
//   }
// }

// // logout from all devices
// const logoutAll = async (req, res) => {
//   try {
//     const conn = await mysql.createConnection(connData)
//     await conn.execute('DELETE FROM user_tokens WHERE user_id = ?', [req.user.id])
//     await conn.end()
//     res.status(200).send()

//   } catch (e) {
//     await conn.end()
//     res.status(500).send( {error: 'db error while clearing the tokens table' } )
//   }
// }



module.exports = {
  signup,
  myProfile,
  login,
  logout,
}