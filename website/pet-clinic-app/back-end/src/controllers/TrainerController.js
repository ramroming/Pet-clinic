import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"


const getPetTrainings = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [trainings] = await conn.execute(`SELECT tr.id, tr.start_date, tr.end_date, tr.training_type_id, tr.trainer_id, p.name as pet_name, pi.first_name, pi.last_name, trt.name as training_type
    FROM appointments a 
    JOIN pets p ON a.pet_id = p.id
    JOIN trainings tr ON a.pet_id = tr.pet_id
    JOIN training_types trt ON trt.id = tr.training_type_id
    JOIN users u ON u.id = a.stmem_id
    JOIN personal_info pi ON pi.id = u.personal_info_id
    WHERE a.id = ? AND a.confirmed = 1
    ORDER BY tr.start_date DESC`, [req.params.appointment_id])
    await conn.end()
    res.send(trainings)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const addTraining = async (req, res) => {
  const { startDate, endDate, petId, appId, trainingTypeId } = req.body
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute(`INSERT INTO trainings (start_date, pet_id, trainer_id, training_type_id, end_date) VALUES (?, ?, ?, ?, ?)`, [startDate, petId, req.user.id, trainingTypeId, endDate])
    await conn.end()
    res.send({ result: 'Training Added Successfully !!' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }

}

const updateTraining = async (req, res) => {
  const { startDate, endDate, trainingId, trainingTypeId, petId } = req.body
  try {
    const conn = await createConnection(connData)

    const [result] = await conn.execute(`UPDATE trainings set  start_date = ?, end_date =?, training_type_id = ? WHERE id=? AND pet_id=?`, [ startDate, endDate, trainingTypeId, trainingId, petId])
    if (!result.affectedRows) {
      await conn.end()
      return res.status(404).send({ error: 'training not found !!' })
    }
    
    await conn.end()
    res.send({ result: 'training Updated Successfully !!' })
  } catch (e) {
    if (e.errno === 1062)
      return res.status(400).send({ error: 'A training for this pet with same date already exists' })
    res.status(500).send({ error: e.message })
  }
}
const getTrainingTypes = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [cases] = await conn.execute(`SELECT * FROM training_types`)
    await conn.end()
    res.send(cases)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  getPetTrainings,
  addTraining,
  getTrainingTypes,
  updateTraining
}