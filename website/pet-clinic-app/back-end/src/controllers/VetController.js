import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"

const getActiveAppointments = async (req, res) => {
  const todayDate = new Date().toISOString().split('T')[0]
  try {
    const conn = await createConnection(connData)
    const [appointments] = await conn.execute(`
    SELECT a.date, a.status, a.confirmed, pi.first_name, pi.last_name, pi.phone_number, p.name as pet_name, p.breed_name, b.type_name as pet_type
    FROM appointments a 
    JOIN users u ON a.client_id = u.id
    JOIN personal_info pi ON u.personal_info_id = pi.id
    JOIN pets p ON a.pet_id = p.id
    JOIN breeds b ON p.breed_name = b.name
    WHERE a.stmem_id = ? AND DATE(a.date) = ?
    ORDER BY a.date`, [req.user.id, todayDate])
    await conn.end()
    res.send(appointments)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  getActiveAppointments
}