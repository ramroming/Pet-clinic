import { delete_appointments, get_appointments } from "../utils/appointmentOperations.js"
import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"
import petClinicRules from "../utils/petclinicrules.js"
import timeOperations from "../utils/timeOperations.js"

const { MAX_ACTIVE_APPOINTMENTS, MAX_APPOINTMENTS_PER_DAY, MAX_PETS_PER_USER, MAX_SHELTER_CAPACITY } = petClinicRules
const { get_available_times } = timeOperations

const getPetsByUserName = async (req, res) => {

  if (req.user.stmem_type !== 'admin' && req.user.stmem_type !== 'receptionist')
    return res.status(401).send({ error: 'Unauthorized!!' })

  try {
    const conn = await createConnection(connData)
    const [user] = await conn.execute('SELECT id FROM users WHERE username=? AND user_type="client"',
    [req.query.username ? req.query.username: ''])
    if (!user.length) {
      await conn.end()
      return res.status(404).send({ error: 'User not found!' })
    }
    const [pets] = await conn.execute('SELECT id, name FROM pets WHERE owner_id = ? ', [user[0].id])
    await conn.end()
    res.send(pets)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const registerPetRec = async (req, res) => {

  if (req.user.stmem_type !== 'admin' && req.user.stmem_type !== 'receptionist')
    return res.status(401).send({ error: 'Unauthorized!!' })

  if (!req.userId)
    return res.status(400).send({ error: 'missing Data' })
  // this try is to detect database connection errors
  try {

    // this try is to detected database violations and other errors when creating new pet
    const conn = await createConnection(connData)
    try {
      const [rows1, fields1] = await conn.execute('SELECT * FROM pets WHERE owner_id = ?', [req.user.id])
      if (rows1.length >= MAX_PETS_PER_USER) {
        conn.end()
        return res.status(403).send({ error: 'Max pet per user reached!' })
      }
      const { name, gender, birth_date, breed_name } = req.body



      const photo = req.file ? await sharp(req.file.buffer).resize({ width: 350, height: 350 }).png().toBuffer() : null

      const [rows2, fields2] = await conn.execute('INSERT INTO pets (name, gender, birth_date, breed_name, photo, owner_id) VALUES (?, ?, ?, ?, ?, ?)', [
        name ? name : null,
        gender ? gender : null,
        birth_date ? birth_date : null,
        breed_name ? breed_name : null,
        photo,
        req.userId
      ])
      req.body.colors.forEach(async color => {

        await conn.execute('INSERT INTO color_records (pet_id, color_id) VALUES (?, ?)', [rows2.insertId, color.id])

      });

      // data to send back when registering a pet
      const petData = {
        id: rows2.insertId,
        name: name ? name : null,
        gender: gender ? gender : null,
        birth_date: birth_date ? birth_date : null,
        owner_id: req.userId
      }
      conn.end()

      res.status(201).send(petData)
    } catch (e) {
      conn.end()
      return res.status(400).send({ error: e.message })
    }

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const createAppointment = async (req, res) => {

  if (req.user.stmem_type !== 'admin' && req.user.stmem_type !== 'receptionist')
    return res.status(401).send({ error: 'Unauthorized!!' })

  const { stmem_id, pet_id, date, user_name, hour } = req.body
  const clientId = req.user_id
  try {
    const conn = await createConnection(connData)

    // check how many active appointments does a client have in total
    const [activeAppointments] = await conn.execute('SELECT * FROM appointments WHERE   client_id = ? AND status=1', [clientId])
    conn.end()

    // if they reached their max
    if (activeAppointments.length && activeAppointments.length >= MAX_ACTIVE_APPOINTMENTS)
      return res.status(400).send({ error: `Oops!! Looks like you have reached MAX ${MAX_ACTIVE_APPOINTMENTS} current active appointments in this clinic` })
    // more than one appointment in a day
    if (activeAppointments) {
      const appointmentsInDay = activeAppointments.filter((appointment) => {
        // getting date from database and convert it to turkish time and then zero its time
        const filterDate = new Date(new Date(appointment.date).setUTCHours(0, 0, 0, 0))
        const userDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0))

        return filterDate.getTime() === userDate.getTime()
      })
      if (appointmentsInDay.length >= MAX_APPOINTMENTS_PER_DAY)
        return res.status(400).send({ error: `Oops!! Looks like you already have ${MAX_APPOINTMENTS_PER_DAY} appointment at the date you specified, ` })
    }


    // selected time was taken
    const availableTimes = await get_available_times(stmem_id, date)
    if (!availableTimes.includes(parseInt(hour)))
      return res.status(400).send({ error: 'It looks like that the time you specified got taken please try a different time' })

    // inserting the appointment data to the database
    const conn2 = await createConnection(connData)
    const dateToInsert = `${date} ${hour}:00:00`
    await conn2.execute('INSERT INTO appointments (date, client_id, stmem_id, status, appointment_type_id, pet_id) VALUES (?, ?, ?, ?, ?, ?)', [dateToInsert, clientId, stmem_id, 1, req.appointmentTypeId, pet_id])

    res.status(201).send({ response: 'appointment was created successfully' })

  } catch (e) {
    if (e.errno === 1062)
      return res.status(400).send({ error: 'appointment is not available at the date and time specified ' })
    res.status(500).send({ error: e.message })
  }
}
const getAppointments = async (req, res) => {
  if (req.user.stmem_type !== 'admin' && req.user.stmem_type !== 'receptionist')
    return res.status(401).send({ error: 'Unauthorized!!' })
  try {
    const appointments = await get_appointments(req.query.amount)
    res.send(appointments)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const deleteAppointment = async (req, res) => {
  // only admin and receptionist can delete appointment
  if (req.user.stmem_type !== 'admin' && req.user.stmem_type !== 'receptionist')
    return res.status(401).send({ error: 'Unauthorized' })

    try {
      const result = await delete_appointments('byReceptionist', null, req.params.id)
      if (!result)
        return res.status(404).send({ error: 'Cannot cancel appointment due to a previous confirmation or late cancellation date' })

      res.send({ result: 'The appointment has been canceled successfully' })
    } catch (e) {
      res.status(500).send({ error: e.message })
  
    }
  
}

const confirmAppointment = async (req, res) => {

  if (req.user.stmem_type !== 'admin' && req.user.stmem_type !== 'receptionist')
    return res.status(401).send({ error: 'Unauthorized!!' })
  try {

    const conn = await createConnection(connData)
    const compareTime = `${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}`
    const maxConfirmationTime = new Date(new Date(new Date().toISOString().split('T')[0]).setUTCHours(23))
    await conn.execute('UPDATE appointments SET status = 0 WHERE date < ?', [compareTime])
    

    // change owner from user to shelter
    const [appointment] = await conn.execute('SELECT pet_id, client_id, appointment_type_id FROM appointments WHERE id = ?', [req.params.id])

    if (appointment.length && appointment[0].appointment_type_id === 4){
      
      const [shelter] = await conn.execute('SELECT current_capacity FROM shelters')
      if (shelter[0].current_capacity + 1 > MAX_SHELTER_CAPACITY){
        await conn.end()
        return res.status(403).send({ error: 'Max shelter capacity has been reached you cannot accept pet submission at the moment' })
      }
      
      const [result] = await conn.execute(`UPDATE  appointments 
      set confirmed= 1
      WHERE id = ? AND confirmed = 0 AND status = 1 AND date < ?`, [req.params.id, maxConfirmationTime])
      if (result.affectedRows === 0){
        await conn.end()
        return res.status(404).send({ error: 'Cannot confirm appointment due to a previous confirmation or late confirmation date' })
      }
      
      const [result2] = await conn.execute(
        `UPDATE  pets 
        set owner_id= null,  pervious_owner= ?, shelter_id = 1
        WHERE id = ?`, [appointment[0].client_id, appointment[0].pet_id])
      const [result3] = await conn.execute(`UPDATE shelters SET current_capacity = ?`, [shelter[0].current_capacity + 1])
    }
    else {
      const [result] = await conn.execute(`UPDATE  appointments 
      set confirmed= 1
      WHERE id = ? AND confirmed = 0 AND status = 1 AND date < ?`, [req.params.id, maxConfirmationTime])
      if (result.affectedRows === 0) {
        await conn.end()
        return res.status(404).send({ error: 'Cannot confirm appointment due to a previous confirmation or late confirmation date' })
      }
    }
    await conn.end()
    res.send({ result: 'appointment has been confirmed successfully' })

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  getAppointments,
  deleteAppointment,
  confirmAppointment,
  createAppointment,
  getPetsByUserName,
  registerPetRec
}