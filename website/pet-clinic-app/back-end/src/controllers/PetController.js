import { createConnection } from 'mysql2/promise'
import connData from '../database/pet-clinic-db.js'

const getPetsBreeds = async (req, res) => {
  if (! req.query.pet_type ) 
    return res.status(200).send([])
  try { 
    const conn = await createConnection(connData)
    const [breeds, fields] = await conn.execute('SELECT name FROM breeds WHERE type_name = ?',[req.query.pet_type])
    conn.end()
    res.send(breeds)
  } catch (e) {
    res.status(500).send({ error: e.message})
  }
}
const getPetsColors = async (req, res) => {
  try { 
    const conn = await createConnection(connData)
    const [colors] = await conn.execute('SELECT name from colors')
    conn.end()
    res.send(colors)
  } catch (e) {
    res.status(500).send({ error: e.message})
  }
}



export  { 
  getPetsBreeds,
  getPetsColors,
 }