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
    const [treatments] = await conn.execute(`SELECT tr.date, dr.first_name, dr.last_name, p.name as pet_name, c.name as case_name, v.name as vaccine_name, pr.notes, mp.dose, med.name as med_name
    FROM appointments ap 
    JOIN treatments tr ON ap.pet_id = tr.pet_id
    JOIN users u ON u.id = tr.doctor_id
    JOIN personal_info dr ON dr.id = u.personal_info_id
    JOIN pets p ON tr.pet_id = p.id
    LEFT JOIN cases c ON c.id = tr.case_id
    LEFT JOIN vaccines v on v.id = tr.vaccine_id
    LEFT JOIN prescriptions pr ON tr.prescription_id = pr.id
    LEFT JOIN medicine_prescriptions mp ON mp.prescription_id = pr.id
    LEFT JOIN medicines med ON mp.medicine_id = med.id`)
    await conn.end()
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  getActiveAppointments,
  getPetTreatments
}