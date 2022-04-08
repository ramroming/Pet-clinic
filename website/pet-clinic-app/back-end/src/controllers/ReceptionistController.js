import { delete_appointments, get_appointments } from "../utils/appointmentOperations.js"
import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"

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
  confirmAppointment
}