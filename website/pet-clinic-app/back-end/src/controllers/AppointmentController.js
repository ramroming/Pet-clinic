import { createConnection } from 'mysql2/promise'
import connData from '../database/pet-clinic-db.js'
import timeOperations from '../utils/timeOperations.js'
import petClinicRules from '../utils/petclinicrules.js'


const { CLINIC_WORKING_HOURS } = petClinicRules
const { get_available_times } = timeOperations
// getting necessary data when making an appointment

// getting staff members for a certian appointment type
const getStaffMems = async (req, res) => {
  let stmem_type
  switch(req.query.appointment_type) {
    case 'Examination': 
      stmem_type = 'vet'
      break
    case 'Grooming': 
      stmem_type = 'groomer'
      break
    case 'Training':
      stmem_type = 'trainer'
      break
    case 'Adoption':
      stmem_type = 'receptionist'
      break

    default:
      break
  }
  try {
    const conn = await createConnection(connData)
    const [staffList] = await conn.execute('SELECT u.id, p.first_name, p.last_name, p.photo  FROM users u INNER JOIN personal_info p ON u.personal_info_id = p.id WHERE u.stmem_type = ?', [ stmem_type ])
    await conn.end()
    res.send(staffList)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

// getting available times on a specific date for a specific stmem
const appointmentsTimes = async (req, res) => {
  const userDate = req.query.date
  const stmemId = req.query.stmem_id
  try {
    const availableTimes = await get_available_times(stmemId, userDate)
    res.send({availableTimes, CLINIC_WORKING_HOURS})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const getAppointmentTypes = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [appointmentTypes] = await conn.execute('SELECT name FROM appointment_types')
    await conn.end()
    res.send(appointmentTypes)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}


export  {
  appointmentsTimes,
  getStaffMems,
  getAppointmentTypes,
}