const mysql = require('mysql2/promise')
const { getAvailableTimes } = require('../utils/timeOperations')
const { CLINIC_WORKING_HOURS } = require('../utils/petclinicrules')
const connData = require('../database/pet-clinic-db')


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
    const conn = await mysql.createConnection(connData)
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
    const availableTimes = await getAvailableTimes(stmemId, userDate)
    res.send({availableTimes, CLINIC_WORKING_HOURS})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

module.exports = {
  appointmentsTimes,
  getStaffMems
}