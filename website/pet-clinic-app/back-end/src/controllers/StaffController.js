const mysql = require('mysql2/promise')

const connData = require('../database/pet-clinic-db')

const getStaffMems = async (req, res) => {
  try {
    const conn = await mysql.createConnection(connData)
    const [staffList] = await conn.execute('SELECT u.id, u.username, u.email, u.user_type, u.personal_info_id, u.status, u.stmem_type, p.first_name, p.last_name, p.address, p.phone_number, p.photo  FROM users u INNER JOIN personal_info p ON u.personal_info_id = p.id WHERE u.stmem_type = ?', [ req.query.stmem_type ])
    await conn.end()
    res.send(staffList)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

module.exports = {
  getStaffMems
}