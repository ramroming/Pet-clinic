import { delete_appointments, get_appointments } from "../utils/appointmentOperations.js"
import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"
import petClinicRules from "../utils/petclinicrules.js"
import timeOperations from "../utils/timeOperations.js"
const { MAX_ACTIVE_APPOINTMENTS, MAX_APPOINTMENTS_PER_DAY, MAX_PETS_PER_USER } = petClinicRules
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
    const [result] = await conn.execute(`UPDATE  appointments 
    set confirmed= 1
    WHERE id = ? AND confirmed = 0 AND status = 1 AND date < ?`, [req.params.id, maxConfirmationTime])
    await conn.end()
    if (result.affectedRows === 0)
      return res.status(404).send({ error: 'Cannot confirm appointment due to a previous confirmation or late confirmation date' })
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
  getPetsByUserName
}