const bcrypt = require('bcrypt')
const mysql = require('mysql2/promise')
const sharp = require('sharp')

const connData = require('../database/pet-clinic-db')
const myValidator = require('../utils/dataValidator')
const { findUserByCredentials, generateAuthToken } = require('../utils/authOperations')
const { getAvailableTimes, convertToTurkishDate } = require('../utils/timeOperations')
const { MAX_ACTIVE_APPOINTMENTS, MAX_APPOINTMENTS_PER_DAY} = require('../utils/petclinicrules')

const signup = async (req, res) => {
  const { first_name, last_name, address, phone_number, username, email, password, user_type, stmem_type } = req.body





  // to keep track of the id's of the inserted rows
  let userID, personalInfoId

  // this try is to check database connection errors
  try {


    // establishing the connection
    const conn = await mysql.createConnection(connData)

    // this try is to detected database violations and other errors when creating new user
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
        return res.status(500).send({ error: 'couldnt save token to database' })
      }
      res.status(200).send({ user, token })
    } catch (e) {
      await conn.end()
      res.status(400).send({ error: e.message })
    }

  }
  catch (e) {
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

const registerPet = async (req, res) => {
  
  // this try is to detect database connection errors
  try {

    // this try is to detected database violations and other errors when creating new pet
    const conn = await mysql.createConnection(connData)
    try {
      const [rows1, fields1] = await conn.execute('SELECT * FROM pets WHERE owner_id = ?', [req.user.id])
      if (rows1.length >= 5) {
        conn.end()
        return res.status(403).send({ error: 'Max pet per user reached!' })
      }
      const { name, gender, birth_date, breed_name } = req.body
  


      const photo = req.file ? await sharp(req.file.buffer).resize({ width: 350, height: 350}).png().toBuffer() : null
      
      const [rows2, fields2] = await conn.execute('INSERT INTO pets (name, gender, birth_date, breed_name, photo, owner_id) VALUES (?, ?, ?, ?, ?, ?)', [
        name ? name : null,
        gender ? gender : null,
        birth_date ? birth_date : null,
        breed_name ? breed_name : null,
        photo,
        req.user.id
      ])

      // data to send back when registering a pet
      const petData = {
        id: rows2.insertId,
        name: name ? name : null,
        gender: gender ? gender : null,
        birth_date: birth_date ? birth_date : null,
        owner_id: req.user.id
      }

      res.status(201).send(petData)
    } catch (e) {
      conn.end()
      return res.status(400).send({ error: e.message })
    }

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const getPets = async (req, res) => {
  try {
    const conn = await mysql.createConnection(connData)
    const [pets] = await conn.execute('SELECT * FROM pets WHERE owner_id = ?', [req.user.id])
    await conn.end()
    res.send(pets)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const createAppointment = async (req, res) => {
  const {  stmem_id, pet_id, date, hour } = req.body
  const clientId = req.user.id
  try {
    const conn = await mysql.createConnection(connData)

    // check how many active appointments does a client have in total
    const [activeAppointments] = await conn.execute('SELECT * FROM appointments WHERE   client_id = ? AND status=1', [clientId])
    conn.end()

    // if they reached their max
    if (activeAppointments.length && activeAppointments.length >= MAX_ACTIVE_APPOINTMENTS)
      return res.status(400).send({ error: `Oops!! Looks like you have reached MAX ${MAX_ACTIVE_APPOINTMENTS} current active appointments in this clinic`})
    // more than one appointment in a day
    if (activeAppointments){
      const appointmentsInDay = activeAppointments.filter((appointment) => {
        // getting date from database and convert it to turkish time and then zero its time
        const filterDate = convertToTurkishDate(appointment.date, true)
        const userDate = convertToTurkishDate(new Date(date), true)

        return filterDate.getTime() === userDate.getTime()
      })
      if (appointmentsInDay.length >= MAX_APPOINTMENTS_PER_DAY)
        return res.status(400).send({ error: `Oops!! Looks like you already have ${MAX_APPOINTMENTS_PER_DAY} appointment at the date you specified, `})
    }
      

    // selected time was taken
    const availableTimes = await getAvailableTimes(stmem_id, date)
    if (!availableTimes.includes(parseInt(hour)))
      return res.status(400).send({ error: 'It looks like that the time you specified got taken please try a different time' })

    // inserting the appointment data to the database
    const conn2 = await mysql.createConnection(connData)
    const dateToInsert = `${date} ${hour}:00:00`
    await conn2.execute('INSERT INTO appointments (date, client_id, stmem_id, status, appointment_type_id, pet_id) VALUES (?, ?, ?, ?, ?, ?)', [dateToInsert, req.user.id, stmem_id, 1, req.appointmentTypeId, pet_id])

    res.status(201).send({ response: 'Your appointment was created successfully'})

  } catch (e) {
    if (e.errno === 1062)
      return res.status(400).send({ error: 'appointment is not available at the date and time specified ' })
    res.status(500).send({ error: e.message })
  }
}


module.exports = {
  signup,
  myProfile,
  login,
  logout,
  registerPet,
  getPets,
  createAppointment
}