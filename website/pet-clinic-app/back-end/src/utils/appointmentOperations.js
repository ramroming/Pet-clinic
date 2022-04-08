import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"
import dateFormat from "dateformat"

const get_appointments = async (query = 'all', clientId) => {
  try {
    const conn = await createConnection(connData)
    const compareTime = `${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}`
    await conn.execute('UPDATE appointments SET status = 0 WHERE date < ?', [compareTime])
    const tempTime = `${new Date().toISOString().split('T')[0]}`
    const compareTime1 = `${tempTime} ${new Date(tempTime).toISOString().split('T')[1].split('.')[0]}`
    const compareTime2 = `${tempTime} ${new Date(new Date(tempTime).setUTCHours(23)).toISOString().split('T')[1].split('.')[0]}`
    let appointments = []
    switch (query) {
      case 'all': {
        const [rows] = await conn.execute(`select  a.id, apt.name as appointment_type, a.status, a.date, a.confirmed, per.first_name AS stmem_first_name, per.last_name AS stmem_last_name, p.name as pet_name, per2.first_name AS owner_first_name, per2.last_name AS owner_last_name
        FROM appointments a 
        JOIN pets p ON p.id = a.pet_id 
        JOIN users s ON a.stmem_id = s.id
        JOIN personal_info per ON s.personal_info_id = per.id
        JOIN appointment_types apt ON a.appointment_type_id = apt.id
        JOIN users s2 ON s2.id = p.owner_id
        JOIN personal_info per2 ON per2.id = s2.personal_info_id
        ORDER BY a.date DESC`)
        appointments = rows
        break
      }
      case 'withUserId': {
        const [rows] = await conn.execute(`select  a.id, apt.name as appointment_type, a.status, a.date, a.confirmed, per.first_name, per.last_name, p.name as pet_name FROM appointments a 
        JOIN pets p ON p.id = a.pet_id 
        JOIN users s ON a.stmem_id = s.id
        JOIN personal_info per ON s.personal_info_id = per.id
        JOIN appointment_types apt ON a.appointment_type_id = apt.id
        WHERE a.client_id = ? 
        ORDER BY a.status DESC`, [clientId])
        appointments = rows
        break
      }
      case 'today': {
        const tempTime = `${new Date().toISOString().split('T')[0]}`
        const compareTime1 = `${tempTime} ${new Date(tempTime).toISOString().split('T')[1].split('.')[0]}`
        const compareTime2 = `${tempTime} ${new Date(new Date(tempTime).setUTCHours(23)).toISOString().split('T')[1].split('.')[0]}`

        const [rows] = await conn.execute(`select  a.id, apt.name as appointment_type, a.status, a.date, a.confirmed, per.first_name AS stmem_first_name, per.last_name AS stmem_last_name, p.name as pet_name, per2.first_name AS owner_first_name, per2.last_name AS owner_last_name
        FROM appointments a 
        JOIN pets p ON p.id = a.pet_id 
        JOIN users s ON a.stmem_id = s.id
        JOIN personal_info per ON s.personal_info_id = per.id
        JOIN appointment_types apt ON a.appointment_type_id = apt.id
        JOIN users s2 ON s2.id = p.owner_id
        JOIN personal_info per2 ON per2.id = s2.personal_info_id
        WHERE a.date >= ? AND a.date <= ?
        ORDER BY a.date DESC`, [compareTime1, compareTime2])
        appointments = rows
        break
      }
      default:
        break
    }

    await conn.end()
    const arrayToSend = appointments.map((appointment, index) => {
      const newDate = dateFormat((appointment.date), 'isoUtcDateTime')
      return { ...appointment, date: newDate }
    })

    return arrayToSend


  } catch (e) {
    throw e
  }
}
const delete_appointments = async (query = '', clientId, appId) => {
  try {
    let result
    const conn = await createConnection(connData)
    const compareTime = `${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}`
    await conn.execute('UPDATE appointments SET status = 0 WHERE date < ?', [compareTime])
    switch(query) {
      case 'byUser':{
        const [rows] = await conn.execute(`DELETE FROM appointments WHERE id = ? AND client_id=? AND status=1 AND confirmed = 0`, [appId, clientId])
        result = rows
        break
      }
      case 'byReceptionist': {
        const [rows] = await conn.execute(`DELETE FROM appointments WHERE id = ? AND confirmed = 0 AND status = 1`, [appId])
        result = rows

        break
      }
      default: 
        break
    }
    
    await conn.end()
    return !(result.affectedRows === 0)

  } catch (e) {
    throw e
  }
}
export {
  get_appointments,
  delete_appointments
}