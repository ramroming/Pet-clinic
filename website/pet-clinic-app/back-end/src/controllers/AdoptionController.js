import { createConnection } from 'mysql2/promise'
import connData from '../database/pet-clinic-db.js'
import myValidator from '../utils/dataValidator.js'
import timeOperations from '../utils/timeOperations.js'

const { convertToTurkishDate, calculatePetAge } = timeOperations

const getAdoptionAd = async (req, res) => {
 if (!req.params.id || !myValidator.isValidId(req.params.id))
  return res.status(400).send({ error: 'Invalid Id' })

  try {
    const conn = await createConnection(connData)
    const [adoptionAds] = await conn.execute(`SELECT ad.date, ad.story,p.id AS pet_id, p.name as pet_name, p.gender, p.birth_date, p.breed_name, p.photo, u.username, group_concat(co.name) as Colors FROM adoption_ads ad
    JOIN pets p ON ad.pet_id = p.id
    JOIN users u ON p.owner_id = u.id
    JOIN color_records cr ON cr.pet_id = p.id
    JOIN colors co ON co.id = cr.color_id WHERE ad.id = ? AND ad.status=1`, [req.params.id])
    await conn.end()
    if (!adoptionAds.length)
      return res.status(404).send()

    // getting the comments of an adoption ad
    const conn2 = await createConnection(connData)
    const [comments] = await conn2.execute('SELECT * FROM comments WHERE adoption_ad_id = ?', [req.params.id])
    await conn2.end()

    // getting the training of the pet
    const conn3 = await createConnection(connData)
    const [trainings] = await conn3.execute(`SELECT t.start_date, t.end_date, tt.name AS training, pi.first_name AS trainer_first_name, pi.last_name AS trainer_last_name FROM trainings t
    JOIN training_types tt ON t.training_type_id = tt.id
    JOIN users u ON t.trainer_id = u.id
    JOIN personal_info pi ON pi.id = u.personal_info_id
    WHERE t.pet_id = ?`, [adoptionAds[0].pet_id])
    await conn3.end()
    // adoptionAds[0].date = convertToTurkishDate(adoptionAds[0].date)
    console.log(adoptionAds[0].date)
    adoptionAds[0].birth_date = calculatePetAge(adoptionAds[0].birth_date)
    adoptionAds[0].trainings = trainings
    res.send({adoptionAd: adoptionAds[0], comments})

  } catch(e) {
    return res.status(500).send({ error: e.message })
  }
}


export  {
  getAdoptionAd,
}