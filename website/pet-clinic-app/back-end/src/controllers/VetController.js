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
    const [treatments] = await conn.execute(`SELECT tr.id, tr.date, dr.first_name, dr.last_name, p.name as pet_name, c.name as case_name, v.name as vaccine_name, GROUP_CONCAT(mt.dose SEPARATOR ',') as doses, GROUP_CONCAT(med.name SEPARATOR ',') as med_names, GROUP_CONCAT(med.id SEPARATOR ',') as med_ids
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
const addTreatment = async (req, res) => {
  const { date, petId, caseId, medDoses, appId, vaccineId } = req.body
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute(`INSERT INTO treatments (date, doctor_id, pet_id, case_id, vaccine_id) VALUES (?, ?, ?, ?, ?)`, [date, req.user.id, petId, caseId, vaccineId ? vaccineId : null])
    if (caseId !== 1) {
      for (let i = 0; i < medDoses.length; i++) {
        if (!medDoses[i].medId || !medDoses[i].dose) {
          await conn.execute('DELETE FROM treatments WHERE id= ?', [result.insertId])
          await conn.end()
          return res.status(400).send({ error: 'Wrong formated medDose data' })
        }
        const [result2] = await conn.execute(`SELECT id FROM medicines WHERE id =?`, [medDoses[i].medId])
        if (!result2.length) {
          await conn.execute('DELETE FROM treatments WHERE id= ?', [result.insertId])
          await conn.end()
          return res.status(400).send({ error: 'Wrong medicine Id' })
        }
        const [result3] = await conn.execute(`INSERT INTO medicine_treatments (medicine_id, treatment_id, dose) VALUES (?, ?, ?)`, [medDoses[i].medId, result.insertId, medDoses[i].dose ])
      }
    }
    await conn.end()
    res.send({ result: 'Treatment Added Successfully !!' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }

}
const getCaseMedVac = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [cases] = await conn.execute(`SELECT * FROM cases`)
    const [medicines] = await conn.execute(`SELECT * FROM medicines`)
    const [vaccines] = await conn.execute(`SELECT * FROM vaccines`)
    await conn.end()
    res.send({cases, medicines, vaccines})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  getActiveAppointments,
  getPetTreatments,
  addTreatment,
  getCaseMedVac
}