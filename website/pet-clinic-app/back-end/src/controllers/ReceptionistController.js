import { delete_appointments, get_appointments } from "../utils/appointmentOperations.js"
import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"
import petClinicRules from "../utils/petclinicrules.js"
import timeOperations from "../utils/timeOperations.js"
import dateFormat from "dateformat"
import sharp from "sharp"

const { MAX_ACTIVE_APPOINTMENTS, MAX_APPOINTMENTS_PER_DAY, MAX_PETS_PER_USER, MAX_SHELTER_CAPACITY } = petClinicRules
const { get_available_times, calculate_pet_age } = timeOperations

const getPetsByUserName = async (req, res) => {


  try {
    const conn = await createConnection(connData)
    const [user] = await conn.execute('SELECT id FROM users WHERE username=? AND user_type="client"',
      [req.query.username ? req.query.username : ''])
    if (!user.length) {
      await conn.end()
      return res.status(404).send({ error: 'User not found!' })
    }
    const [pets] = await conn.execute('SELECT id, name FROM pets WHERE owner_id = ? ', [user[0].id])
    await conn.end()
    res.send(pets)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const registerPetRec = async (req, res) => {


  if (!req.userId)
    return res.status(400).send({ error: 'missing Data' })
  // this try is to detect database connection errors
  try {

    // this try is to detected database violations and other errors when creating new pet
    const conn = await createConnection(connData)
    try {
      const [rows1, fields1] = await conn.execute('SELECT * FROM pets WHERE owner_id = ?', [req.user.id])
      if (rows1.length >= MAX_PETS_PER_USER) {
        conn.end()
        return res.status(403).send({ error: 'Max pet per user reached!' })
      }
      const { name, gender, birth_date, breed_name } = req.body



      const photo = req.file ? await sharp(req.file.buffer).resize({ width: 350, height: 350 }).png().toBuffer() : null

      const [rows2, fields2] = await conn.execute('INSERT INTO pets (name, gender, birth_date, breed_name, photo, owner_id) VALUES (?, ?, ?, ?, ?, ?)', [
        name ? name : null,
        gender ? gender : null,
        birth_date ? birth_date : null,
        breed_name ? breed_name : null,
        photo,
        req.userId
      ])
      req.body.colors.forEach(async color => {

        await conn.execute('INSERT INTO color_records (pet_id, color_id) VALUES (?, ?)', [rows2.insertId, color.id])

      });

      // data to send back when registering a pet
      const petData = {
        id: rows2.insertId,
        name: name ? name : null,
        gender: gender ? gender : null,
        birth_date: birth_date ? birth_date : null,
        owner_id: req.userId
      }
      conn.end()

      res.status(201).send(petData)
    } catch (e) {
      conn.end()
      return res.status(400).send({ error: e.message })
    }

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const createAppointment = async (req, res) => {


  const { stmem_id, pet_id, date, user_name, hour } = req.body
  const clientId = req.user_id
  try {
    const conn = await createConnection(connData)

    // check how many active appointments does a client have in total
    const [activeAppointments] = await conn.execute('SELECT * FROM appointments WHERE   client_id = ? AND status=1', [clientId])
    conn.end()

    // if they reached their max
    if (activeAppointments.length && activeAppointments.length >= MAX_ACTIVE_APPOINTMENTS)
      return res.status(400).send({ error: `Oops!! Looks like you have reached MAX ${MAX_ACTIVE_APPOINTMENTS} current active appointments in this clinic` })
    // more than one appointment in a day
    if (activeAppointments) {
      const appointmentsInDay = activeAppointments.filter((appointment) => {
        // getting date from database and convert it to turkish time and then zero its time
        const filterDate = new Date(new Date(appointment.date).setUTCHours(0, 0, 0, 0))
        const userDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0))

        return filterDate.getTime() === userDate.getTime()
      })
      if (appointmentsInDay.length >= MAX_APPOINTMENTS_PER_DAY)
        return res.status(400).send({ error: `Oops!! Looks like you already have ${MAX_APPOINTMENTS_PER_DAY} appointment at the date you specified, ` })
    }


    // selected time was taken
    const availableTimes = await get_available_times(stmem_id, date)
    if (!availableTimes.includes(parseInt(hour)))
      return res.status(400).send({ error: 'It looks like that the time you specified got taken please try a different time' })

    // inserting the appointment data to the database
    const conn2 = await createConnection(connData)
    const dateToInsert = `${date} ${hour}:00:00`
    await conn2.execute('INSERT INTO appointments (date, client_id, stmem_id, status, appointment_type_id, pet_id) VALUES (?, ?, ?, ?, ?, ?)', [dateToInsert, clientId, stmem_id, 1, req.appointmentTypeId, pet_id])

    res.status(201).send({ response: 'appointment was created successfully' })

  } catch (e) {
    if (e.errno === 1062)
      return res.status(400).send({ error: 'appointment is not available at the date and time specified ' })
    res.status(500).send({ error: e.message })
  }
}
const getAppointments = async (req, res) => {
  try {
    const appointments = await get_appointments(req.query.amount)
    res.send(appointments)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const deleteAppointment = async (req, res) => {

  try {
    const result = await delete_appointments('byReceptionist', null, req.params.id)
    if (!result)
      return res.status(404).send({ error: 'Cannot cancel appointment due to a previous confirmation or late cancellation date' })

    res.send({ result: 'The appointment has been canceled successfully' })
  } catch (e) {
    res.status(500).send({ error: e.message })

  }

}

const confirmAppointment = async (req, res) => {
  try {

    const conn = await createConnection(connData)
    const compareTime = `${new Date().toISOString().split('T')[0]} ${new Date().toISOString().split('T')[1].split('.')[0]}`
    const maxConfirmationTime = new Date(new Date(new Date().toISOString().split('T')[0]).setUTCHours(23))
    await conn.execute('UPDATE appointments SET status = 0 WHERE date < ?', [compareTime])


    // change owner from user to shelter
    const [appointment] = await conn.execute('SELECT pet_id, client_id, appointment_type_id FROM appointments WHERE id = ?', [req.params.id])

    if (appointment.length && appointment[0].appointment_type_id === 4) {

      const [shelter] = await conn.execute('SELECT current_capacity FROM shelters')
      if (shelter[0].current_capacity + 1 > MAX_SHELTER_CAPACITY) {
        await conn.end()
        return res.status(403).send({ error: 'Max shelter capacity has been reached you cannot accept pet submission at the moment' })
      }

      const [result] = await conn.execute(`UPDATE  appointments 
      set confirmed= 1, status=0
      WHERE id = ? AND confirmed = 0 AND status = 1 AND date < ?`, [req.params.id, maxConfirmationTime])
      if (result.affectedRows === 0) {
        await conn.end()
        return res.status(404).send({ error: 'Cannot confirm appointment due to a previous confirmation or late confirmation date' })
      }

      const [result2] = await conn.execute(
        `UPDATE  pets 
        set owner_id= null,  pervious_owner= ?, shelter_id = 1
        WHERE id = ?`, [appointment[0].client_id, appointment[0].pet_id])
      const [result3] = await conn.execute(`UPDATE shelters SET current_capacity = ?`, [shelter[0].current_capacity + 1])
      const [result4] = await conn.execute('UPDATE adoption_ads SET client_id=null, shelter_id=1 WHERE pet_id=?', [appointment[0].pet_id])
    }
    else {
      const [result] = await conn.execute(`UPDATE  appointments 
      set confirmed= 1, status=0
      WHERE id = ? AND confirmed = 0 AND status = 1 AND date < ?`, [req.params.id, maxConfirmationTime])
      if (result.affectedRows === 0) {
        await conn.end()
        return res.status(404).send({ error: 'Cannot confirm appointment due to a previous confirmation or late confirmation date' })
      }
    }
    await conn.end()
    res.send({ result: 'appointment has been confirmed successfully' })

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const getShelterPets = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [shelterPets] = await conn.execute(`SELECT id, pets.name, type_name, gender, birth_date, breed_name, photo FROM pets
    JOIN breeds ON pets.breed_name = breeds.name
     WHERE shelter_id = 1`)
    const petsToSend = []
    for (let i = 0; i < shelterPets.length; i++) {
      const [ads] = await conn.execute('SELECT pet_id FROM adoption_ads WHERE pet_id = ? AND status=1', [shelterPets[i].id])
      shelterPets[i].hasPost = !(ads.length === 0)
      shelterPets[i].age = calculate_pet_age(shelterPets[i].birth_date)
      petsToSend.push(shelterPets[i])

    }
    await conn.end()

    res.send(petsToSend)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const getShelterPet = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [trainings] = await conn.execute(`SELECT t.start_date, t.end_date, tt.name AS training, pi.first_name AS trainer_first_name, pi.last_name AS trainer_last_name FROM trainings t
    JOIN training_types tt ON t.training_type_id = tt.id
    JOIN users u ON t.trainer_id = u.id
    JOIN personal_info pi ON pi.id = u.personal_info_id
    WHERE t.pet_id = ?`, [req.params.id])
    await conn.end()
    req.pet.trainings = trainings
    res.send(req.pet)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const createAdoptionAd = async (req, res) => {
  // getting the pet type based on the pet breed to add it to the adoption post
  try {
    const conn = await createConnection(connData)
    const [ads] = await conn.execute('SELECT id FROM adoption_ads WHERE pet_id = ? AND status=1', [req.body.pet_id])
    if (ads.length !== 0)
      return res.status(400).send({ error: 'It looks like you have already posted an ad for this pet, you may post again once your ad is removed from the site !!' })

    const [result] = await conn.execute('SELECT type_name FROM breeds WHERE name = ? ', [req.pet.breed_name])
    const [insertResult] = await conn.execute('INSERT INTO adoption_ads (date, ad_type, status, pet_id, shelter_id, story) VALUES (?, ?, 1, ?, 1, ?)', [dateFormat(new Date(), 'UTC: yyyy-mm-dd HH:MM:ss'), result[0].type_name, req.body.pet_id, req.body.story])
    await conn.end()
    return res.status(201).send({ response: 'Your Adoption ad Was posted Successfully ', ad_id: insertResult.insertId })
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
}
const getShelterAdoptionAds = async (req, res) => {

  try {
    const conn = await createConnection(connData)
    const [adoptionAds] = await conn.execute('SELECT id, date, story, status FROM adoption_ads WHERE shelter_id = 1 ORDER BY date DESC')
    await conn.end()
    res.send(adoptionAds)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const updatePostStoryRec = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute('UPDATE adoption_ads SET story = ? WHERE shelter_id = 1 AND id = ? AND status=1 ', [req.body.story, req.params.ad_id])
    if (result.affectedRows === 0)
      return res.status(404).send()
    res.send({ result: 'Adoption post story was updated successfully !!' })
    await conn.end()
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const deleteAdoptionAd = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute('DELETE FROM adoption_ads WHERE shelter_id = 1 AND id = ?  ', [req.params.ad_id])
    await conn.end()
    if (result.affectedRows === 0)
      return res.status(404).send({ error: '404 not found' })
    res.send({ result: 'Adoption ad was deleted successfully ' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const getAdoptionRequests = async (req, res) => {

  try {

    // get received requests
    const conn2 = await createConnection(connData)
    const [receivedRequests] = await conn2.execute(`select ar.id, ar.date, ar.client_id as requester_id, ar.adoption_ad_id, ar.status, aa.client_id as post_owner_id, p.id as pet_id, pi.first_name as requester_first_name, pi.last_name as requester_last_name, pi.phone_number as requester_phone_number FROM adoption_requests ar
    JOIN adoption_ads aa ON ar.adoption_ad_id = aa.id
    JOIN pets p ON p.id = aa.pet_id
    JOIN users u ON u.id = ar.client_id
    JOIN personal_info pi ON u.personal_info_id = pi.id
    WHERE aa.shelter_id = 1 AND aa.status= 1
    ORDER BY ar.adoption_ad_id , ar.date  desc`)
    await conn2.end()
    const finalReceived = []
    let adoption_ad_requests = []
    for (let i = 0; i < receivedRequests.length; i++) {
      if (i === 0) {
        adoption_ad_requests.push(receivedRequests[i])
        if (i + 1 === receivedRequests.length)
          finalReceived.push(adoption_ad_requests)
        continue
      }
      if (receivedRequests[i - 1].adoption_ad_id === receivedRequests[i].adoption_ad_id) {
        if (i + 1 === receivedRequests.length)
          finalReceived.push(adoption_ad_requests)
        adoption_ad_requests.push(receivedRequests[i])
        continue
      }
      else {
        finalReceived.push(adoption_ad_requests)
        adoption_ad_requests = []
        adoption_ad_requests.push(receivedRequests[i])
        if (i + 1 === receivedRequests.length)
          finalReceived.push(adoption_ad_requests)
        continue
      }


    }
    res.send({ sentRequests: [], finalReceived })

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const transferOwnerShip = async (req, res) => {

  try {
    // disable the requested post
    const conn = await createConnection(connData)
    const [result] = await conn.execute(`UPDATE adoption_ads
    SET status = 0
    WHERE id= ? AND status = 1`, [req.params.ad_id])
    await conn.end()

    // accept the selected requester and reject all other requesters
    const conn2 = await createConnection(connData)
    const [result2] = await conn2.execute(`UPDATE adoption_requests
    SET status = CASE WHEN client_id = ? THEN 'accepted' ELSE 'rejected' END
    WHERE adoption_ad_id = ? AND status="pending"`, [req.params.new_owner_id, req.params.ad_id])
    await conn2.end()

    // transfer the pet for the old owner to the new owner
    const conn3 = await createConnection(connData)
    const [result3] = await conn3.execute(`UPDATE pets
    SET shelter_id = null, pervious_owner = 1, owner_id = ?
    WHERE id = ?`, [req.params.new_owner_id, req.params.pet_id])
    await conn3.end()

    res.send({ result: 'Your ownership has been successfully transfered to the selected requester ' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
  res.send()
}

const recUpdatePet = async (req, res) => {

  // this try is to detect database connection errors
  try {

    // this try is to detected database violations and other errors when creating new pet
    const conn = await createConnection(connData)
    try {

      const { name, gender, birth_date, breed_name } = req.body



      const photo = req.file ? await sharp(req.file.buffer).resize({ width: 350, height: 350 }).png().toBuffer() : null


      if (photo) {
        // updating with photo
        const [rows2, fields2] = await conn.execute(`UPDATE  pets 
      set name= ?, gender = ?, birth_date = ?, breed_name = ?, photo = ?
      WHERE id = ?`, [
          name ? name : null,
          gender ? gender : null,
          birth_date ? birth_date : null,
          breed_name ? breed_name : null,
          photo,
          req.params.pet_id
        ])
      } else {
        // updating without photo

        const [rows2, fields2] = await conn.execute(`UPDATE  pets 
      set name= ?, gender = ?, birth_date = ?, breed_name = ?
      WHERE id = ?`, [
          name ? name : null,
          gender ? gender : null,
          birth_date ? birth_date : null,
          breed_name ? breed_name : null,
          req.params.pet_id
        ])
      }
      await conn.execute('DELETE FROM color_records WHERE pet_id = ?', [req.params.pet_id])

      req.body.colors.forEach(async color => {

        await conn.execute('INSERT INTO color_records (pet_id, color_id) VALUES (?, ?)', [req.params.pet_id, color.id])

      });
      conn.end()
      res.status(200).send({ result: 'Pet data has been successfully updated' })
    } catch (e) {
      conn.end()
      return res.status(400).send({ error: e.message })
    }

  } catch (e) {
    res.status(500).send({ error: e.message })
  }

}
const deleteShelterPet = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute('DELETE FROM pets WHERE id=? AND shelter_id=1', [req.params.pet_id])
    await conn.end()
    if (!result.affectedRows)
      return res.status(404).send({ error: 'shelter pet not found' })
    res.send({ result: 'Pet was deleted successfully '})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  getAppointments,
  deleteAppointment,
  confirmAppointment,
  createAppointment,
  getPetsByUserName,
  registerPetRec,
  getShelterPets,
  getShelterPet,
  createAdoptionAd,
  getShelterAdoptionAds,
  updatePostStoryRec,
  deleteAdoptionAd,
  getAdoptionRequests,
  transferOwnerShip,
  recUpdatePet,
  deleteShelterPet

}