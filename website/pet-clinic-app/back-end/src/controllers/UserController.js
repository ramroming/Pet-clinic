
import { hash, compare } from 'bcrypt'
import sharp from 'sharp'
import { createConnection } from 'mysql2/promise'
import dateFormat from 'dateformat'



import connData from '../database/pet-clinic-db.js'
import authOperations from '../utils/authOperations.js'
import timeOperations from '../utils/timeOperations.js'
import petClinicRules from '../utils/petclinicrules.js'
import { get_wish_list } from '../utils/adoptionOperations.js'
import { delete_appointments, get_appointments } from '../utils/appointmentOperations.js'

const { MAX_ACTIVE_APPOINTMENTS, MAX_APPOINTMENTS_PER_DAY, MAX_PETS_PER_USER } = petClinicRules
const { get_available_times } = timeOperations
const { find_user_by_credentials, generate_auth_token } = authOperations

const signup = async (req, res) => {
  const { first_name, last_name, address, phone_number, username, email, password, user_type, stmem_type } = req.body





  // to keep track of the id's of the inserted rows
  let userID, personalInfoId

  // this try is to check database connection errors
  try {


    // establishing the connection
    const conn = await createConnection(connData)

    // this try is to detected database violations and other errors when creating new user
    try {
      // inserting data into personal_info table
      const [personal_info, fields1] = await conn.execute('INSERT INTO personal_info (first_name, last_name, address, phone_number) VALUES (?, ?, ?, ?)', [
        first_name ? first_name : null,
        last_name ? last_name : null,
        address ? address : null,
        phone_number ? phone_number : null])
      personalInfoId = personal_info.insertId

      // inserting photo should be done here


      // hashing password before adding it to the database
      const hashedPassword = await hash(password, 8)


      // inserting data into users table all clients by default
      const [user, fields2] = await conn.execute('INSERT INTO users (username, email, password, user_type, stmem_type, personal_info_id) VALUES (?, ?, ?, ?, ?, ?)', [
        username ? username : null,
        email ? email : null,
        password ? hashedPassword : null,
        user_type ? user_type : 'client',
        stmem_type ? stmem_type : null,
        personalInfoId
      ])
      userID = user.insertId

      await conn.end()

      // creating the JWT 
      const token = await generate_auth_token({userId: userID, userRole: stmem_type})

      // if storing token to the database failed
      if (!token) {
        return res.status(500).send({ error: 'Couldnt save token to the database' })
      }

      // data to send back when signup
      const userData = {
        id: userID,
        username: username ? username : null,
        email: email ? email : null,
        user_type: user_type ? user_type : 'client',
        stmem_type: stmem_type ? stmem_type : null,
        personal_info_id: personalInfoId
      }

      res.status(201).send({ token, userData })
    } catch (e) {
      // incase of an error empty remove any inserted rows
      if (personalInfoId) {
        await conn.execute('delete from personal_info where id = ?', [personalInfoId])
      }
      if (userID) {
        await conn.execute('delete from users where id = ?', [userID])
      }
      await conn.end()

      // to check duplication error, this 1062 is an sql error code for duplication
      if (e.errno === 1062)
        return res.status(400).send({ error: 'UserName or Email is already used!!' })
      res.status(400).send({ error: e.message })
    }

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const login = async (req, res) => {
  try {
    const conn = await createConnection(connData)

    try {
      const user = await find_user_by_credentials(conn, req.body.username, req.body.password)
      const token = await generate_auth_token({userId: user.id, userRole: user.stmem_type})
      // if saving token to database failed
      if (!token) {
        return res.status(500).send({ error: 'couldnt save token to database' })
      }
      res.status(200).send({ user, token })
    } catch (e) {
      await conn.end()
      res.status(400).send({ error: e.message })
    }

  }
  catch (e) {
    res.status(500).send({ error: e.message })
  }
}


// read user's profile
const myProfile = async (req, res) => {
  res.send(req.user)
}

// logout user
const logout = async (req, res) => {
  res.status(200).send()
}


const registerPet = async (req, res) => {
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
        req.user.id
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
        owner_id: req.user.id
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
const updatePet = async (req, res) => {

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

const updateMyProfile = async (req, res) => {
  const { first_name, last_name, address, phone_number, photoChanged } = req.body
  try {

    const photo = req.file ? await sharp(req.file.buffer).resize({ width: 350, height: 350 }).png().toBuffer() : null
    const conn = await createConnection(connData)

    if (photoChanged === 'yes') {
      const [result] = await conn.execute(`UPDATE personal_info SET
      first_name = ?, last_name = ?, address = ?, phone_number = ?, photo = ?
      WHERE id = ?`, [
        first_name,
        last_name,
        address,
        phone_number,
        photo,
        req.user.personal_info_id
      ])
    }
    if (photoChanged === 'no') {
      const [result] = await conn.execute(`UPDATE personal_info SET
      first_name = ?, last_name = ?, address = ?, phone_number = ?
      WHERE id = ?`, [
        first_name,
        last_name,
        address,
        phone_number,
        req.user.personal_info_id
      ])
    }
    await conn.end()
    res.send({ result: 'Profile data hast been updated successfully !!' })


  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const updateMyAccount = async (req, res) => {
  const { username, email, old_password, new_password, changePassword } = req.body
  try {
    const conn = await createConnection(connData)
    try {
      if (changePassword === 'no') {
        const [result] = await conn.execute(`UPDATE users SET
        username = ?, email = ?
        WHERE id = ?`, [
          username,
          email,
          req.user.id
        ])
      }
      if (changePassword === 'yes') {
        const [oldPassword] = await conn.execute(`SELECT password FROM users WHERE id = ?`, [req.user.id])

        const isMatch = await compare(old_password, oldPassword[0].password)

        if (!isMatch)
          return res.status(400).send({ error: 'Wrong old password' })


        const newPasswordHashed = await hash(new_password, 8)

        const [result] = await conn.execute(`UPDATE users SET
          username = ?, email = ?, password = ?
          WHERE id = ?`, [
          username,
          email,
          newPasswordHashed,
          req.user.id
        ])
      }
      await conn.end()
      res.send({ result: 'Account info was updated successfully ' })
    } catch (e) {
      if (e.errno === 1062)
        return res.status(400).send({ error: 'UserName or Email is already used!!' })
      throw e
    }




  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const getPets = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [pets] = await conn.execute(`SELECT p.id, p.name, p.gender, p.birth_date, p.breed_name, p.photo, p.pervious_owner, p.shelter_id, p.owner_id, b.type_name as pet_type FROM pets p
    JOIN breeds b ON b.name = p.breed_name
    WHERE owner_id = ?`, [req.user.id])
    await conn.end()
    res.send(pets)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
// get pet data by id including training data
const getMyPet = async (req, res) => {
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

const createAppointment = async (req, res) => {
  const { stmem_id, pet_id, date, hour } = req.body
  const clientId = req.user.id
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
    await conn2.execute('INSERT INTO appointments (date, client_id, stmem_id, status, appointment_type_id, pet_id) VALUES (?, ?, ?, ?, ?, ?)', [dateToInsert, req.user.id, stmem_id, 1, req.appointmentTypeId, pet_id])

    res.status(201).send({ response: 'Your appointment was created successfully' })

  } catch (e) {
    if (e.errno === 1062)
      return res.status(400).send({ error: 'appointment is not available at the date and time specified ' })
    res.status(500).send({ error: e.message })
  }
}

const getAppointments = async (req, res) => {
  try {

    const appointments = await get_appointments('withUserId', req.user.id)
    res.send(appointments)

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const deleteAppointments = async (req, res) => {
  try {
    const result = await delete_appointments('byUser', req.user.id, req.params.id)
    if (!result)
      return res.status(404).send({ error: 'Appointment cannot be cancelled !!' })
    res.send({ result: 'Your appointment has been canceled successfully' })
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
    const [insertResult] = await conn.execute('INSERT INTO adoption_ads (date, ad_type, status, pet_id, client_id, story) VALUES (?, ?, 1, ?, ?, ?)', [dateFormat(new Date(), 'UTC: yyyy-mm-dd HH:MM:ss'), result[0].type_name, req.body.pet_id, req.user.id, req.body.story])
    await conn.end()
    return res.status(201).send({ response: 'Your Adoption ad Was posted Successfully ', ad_id: insertResult.insertId })
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
}
const commentOnAd = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [rows] = await conn.execute('INSERT INTO comments (date, text, adoption_ad_id, client_id) VALUES (?, ?, ?, ?)', [new Date(), req.body.comment, req.body.ad_id, req.user.id])
    await conn.end()
    res.status(201).send({ result: 'comment created' })
  } catch (e) {
    if (e.errno === 1452)
      return res.status(400).send({ error: 'Post not founnd' })
    res.status(500).send({ error: e.message })
  }
}

const getMyAdoptionAds = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [myAdoptionAds] = await conn.execute('SELECT id, date, story, status FROM adoption_ads WHERE client_id = ? ORDER BY date DESC', [req.user.id])
    await conn.end()
    res.send(myAdoptionAds)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const updatePostStory = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute('UPDATE adoption_ads SET story = ? WHERE client_id = ? AND id = ? AND status=1 ', [req.body.story, req.user.id, req.params.ad_id])
    if (result.affectedRows === 0)
      return res.status(404).send()
    res.send({ result: 'Adoption post story was updated successfully !!' })
    await conn.end()
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const deleteAdPost = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute('DELETE FROM adoption_ads WHERE client_id = ? AND id = ?  ', [req.user.id, req.params.ad_id])
    await conn.end()
    if (result.affectedRows === 0)
      return res.status(404).send({ error: '404 not found' })
    res.send({ result: 'Adoption ad was deleted successfully ' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}

const getMyRequests = async (req, res) => {
  try {
    // get sent requests
    const conn1 = await createConnection(connData)
    const [sentRequests] = await conn1.execute('SELECT id, date, adoption_ad_id, status FROM adoption_requests WHERE client_id= ? ORDER BY date DESC', [req.user.id])
    await conn1.end()
    // get received requests
    const conn2 = await createConnection(connData)
    const [receivedRequests] = await conn2.execute(`select ar.id, ar.date, ar.client_id as requester_id, ar.adoption_ad_id, ar.status, aa.client_id as post_owner_id, p.id as pet_id, pi.first_name as requester_first_name, pi.last_name as requester_last_name, pi.phone_number as requester_phone_number FROM adoption_requests ar
    JOIN adoption_ads aa ON ar.adoption_ad_id = aa.id
    JOIN pets p ON p.id = aa.pet_id
    JOIN users u ON u.id = ar.client_id
    JOIN personal_info pi ON u.personal_info_id = pi.id
    WHERE aa.client_id = ? AND aa.status= 1
    ORDER BY ar.adoption_ad_id , ar.date  desc`, [req.user.id])
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
    res.send({ sentRequests, finalReceived })

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const createRequest = async (req, res) => {
  try {
    // getting the wishlist count
    const requesters_count = await get_wish_list(req.params.ad_id)

    const conn = await createConnection(connData)
    const [result] = await conn.execute('INSERT INTO adoption_requests (date, client_id, adoption_ad_id, status) VALUES (?, ?, ?, "pending")', [
      dateFormat(new Date(), 'UTC: yyyy-mm-dd HH:MM:ss'),
      req.user.id,
      req.params.ad_id
    ])
    await conn.end()

    res.status(201).send({ result: `You've been successfully added to a wish list of ${requesters_count} ${requesters_count >= 2 ? 'people' : requesters_count === 0 ? 'people' : 'person'}  you can always check and manage your adoption requests from your profile ` })

  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const deleteRequest = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute('DELETE FROM adoption_requests WHERE client_id = ? AND adoption_ad_id = ? AND status="pending"', [req.user.id, req.params.req_id])
    await conn.end()
    if (!result.affectedRows)
      return res.status(404).send({ error: 'Request not found' })
    res.send({ result: 'Your Request has been deleted successfully !!' })

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
    SET pervious_owner = ?, owner_id = ?
    WHERE id = ?`, [req.user.id, req.params.new_owner_id, req.params.pet_id])
    await conn3.end()

    res.send({ result: 'Your ownership has been successfully transfered to the selected requester ' })
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
  res.send()
}
export {
  signup,
  myProfile,
  updateMyProfile,
  updateMyAccount,
  login,
  logout,
  registerPet,
  updatePet,
  getPets,
  createAppointment,
  getAppointments,
  deleteAppointments,
  getMyPet,
  createAdoptionAd,
  commentOnAd,
  getMyAdoptionAds,
  updatePostStory,
  deleteAdPost,
  getMyRequests,
  createRequest,
  deleteRequest,
  transferOwnerShip

}