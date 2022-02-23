const mysql = require('mysql2/promise')
const connData = require('../database/pet-clinic-db')

const getPetsBreeds = async (req, res) => {
  if (! req.query.pet_type ) 
    return res.status(200).send([])
  try { 
    const conn = await mysql.createConnection(connData)
    const [breeds, fields] = await conn.execute('SELECT name FROM breeds WHERE type_name = ?',[req.query.pet_type])
    conn.end()
    res.send(breeds)
  } catch (e) {
    res.status(500).send({ error: e.message})
  }
}

module.exports = { 
  getPetsBreeds,
 }