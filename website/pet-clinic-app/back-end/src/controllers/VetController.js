import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"
import { get_appointments } from "../utils/appointmentOperations.js"

const getActiveAppointments = async (req, res) => {
  const todayDate = new Date().toISOString().split('T')[0]
  try {
    const { arrayToSend } = await get_appointments('forVet', req.user.id)
    res.send(arrayToSend)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const getPetTreatments = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [treatments] = await conn.execute(`SELECT tr.id, tr.date, dr.first_name, dr.last_name, p.name as pet_name, c.name as case_name, v.name as vaccine_name, GROUP_CONCAT(mt.dose SEPARATOR ',') as doses, GROUP_CONCAT(med.name SEPARATOR ',') as med_names
    FROM appointments  ap 
    JOIN pets p ON p.id = ap.pet_id 
    JOIN treatments tr ON p.id = tr.pet_id
    JOIN users u ON u.id = tr.doctor_id
    JOIN personal_info dr ON dr.id = u.personal_info_id
    JOIN cases c ON c.id = tr.case_id
    left JOIN vaccines v on v.id = tr.vaccine_id
    left JOIN medicine_treatments mt ON mt.treatment_id = tr.id
    left JOIN medicines med ON mt.medicine_id = med.id
    WHERE ap.id = ? AND ap.confirmed = 1
    GROUP BY tr.id
    ORDER BY tr.date DESC`, [req.params.appointment_id])
    await conn.end()
    res.send(treatments)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  getActiveAppointments,
  getPetTreatments
}