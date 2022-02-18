const mysql = require('mysql2/promise')
const connData = require('../database/pet-clinic-db')

const getPetsBreeds = async (req, res) => {
  if (! req.query.pet_type ) 
    return res.send([])
  try {
    const conn = await mysql.createConnection(connData)
    const [rows, fields] = await conn.execute('SELECT name FROM breeds WHERE type_name = ?',[req.query.pet_type])
    conn.end()
    res.send(rows)
  } catch (e) {
    conn.end()
    res.status(500).send({ error: e.message})
  }
}
const registerPet = async (req, res) => {
 try {
    const conn = await mysql.createConnection(connData)
    const [rows1, fields1] = await conn.execute('SELECT * FROM pets WHERE owner_id = ?', [req.user.id])
    if (rows1.length >= 5){
      conn.end()
      return res.status(403).send({ error: 'Max pet per user reached!' })
    }
    const { name, gender, birth_date, breed_name, photo } = req.body
    const [rows2, fields2] = await conn.execute('INSERT INTO pets (name, gender, birth_date, breed_name, photo, owner_id) VALUES (?, ?, ?, ?, ?, ?)', [
      name ? name : null,
      gender ? gender : null,
      birth_date ? birth_date: null,
      breed_name ? breed_name: null,
      photo ? photo: null,
      req.user.id
    ])

    // data to send back when registering a pet
    const petData = {
      id: rows2.insertId,
      name: name ? name : null,
      gender: gender ? gender : null,
      birth_date: birth_date ? birth_date : null,
      photo: photo ? photo : null,
      owner_id: req.user.id
    }

    res.status(201).send(petData)
 } catch (e) {
   res.status(500).send({ error: e.message })
 }
}
module.exports = { 
  getPetsBreeds,
  registerPet
 }