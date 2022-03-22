import { createConnection } from 'mysql2/promise'
import connData from '../database/pet-clinic-db.js'
import myValidator from '../utils/dataValidator.js'
import timeOperations from '../utils/timeOperations.js'

const { calculatePetAge } = timeOperations

const getAdoptionAd = async (req, res) => {
 if (!req.params.id || !myValidator.isValidId(req.params.id))
  return res.status(400).send({ error: 'Invalid Id' })

  try {
    const conn = await createConnection(connData)
    const [adoptionAds] = await conn.execute(`SELECT ad.date, ad.story,p.owner_id, p.id AS pet_id, p.name as pet_name, p.gender, p.birth_date, p.breed_name, p.photo, u.username, group_concat(co.name) as colors FROM adoption_ads ad
    JOIN pets p ON ad.pet_id = p.id
    JOIN users u ON p.owner_id = u.id
    JOIN color_records cr ON cr.pet_id = p.id
    JOIN colors co ON co.id = cr.color_id WHERE ad.id = ? AND ad.status=1
    GROUP BY ad.date, ad.story,p.owner_id, p.id , p.name , p.gender, p.birth_date, p.breed_name, u.username`, [req.params.id])
    await conn.end()
    
    // the sql query will return an array with one object that containes nulls and that is because of group_concat
    if (!adoptionAds.length)
      return res.status(404).send({ error: 'Post is not found :( Bad link or the post you are looking for was removed by the owner' })

    // getting the comments of an adoption ad
    const conn2 = await createConnection(connData)
    const [comments] = await conn2.execute(`SELECT c.date, c.text, u.username, u.id AS user_id FROM comments c 
    JOIN users u ON c.client_id = u.id
    JOIN adoption_ads aa ON aa.id = c.adoption_ad_id
    WHERE adoption_ad_id = ? AND aa.status = 1
    ORDER BY date  `, [req.params.id])
    await conn2.end()

    // getting the training of the pet
    const conn3 = await createConnection(connData)
    const [trainings] = await conn3.execute(`SELECT t.start_date, t.end_date, tt.name AS training, pi.first_name AS trainer_first_name, pi.last_name AS trainer_last_name FROM trainings t
    JOIN training_types tt ON t.training_type_id = tt.id
    JOIN users u ON t.trainer_id = u.id
    JOIN personal_info pi ON pi.id = u.personal_info_id
    WHERE t.pet_id = ?`, [adoptionAds[0].pet_id])
    await conn3.end()
    
    const isRequestedByMe = await myValidator.nonExistentRequest(req.user.id, req.params.id)

    adoptionAds[0].birth_date = calculatePetAge(adoptionAds[0].birth_date)
    adoptionAds[0].trainings = trainings
    adoptionAds[0].requested = isRequestedByMe
    res.send({adoptionAd: adoptionAds[0], comments})

  } catch(e) {
    return res.status(500).send({ error: e.message })
  }
}

const getAdoptionAds = async (req, res) => {
  const colors = req.query.colors ? req.query.colors.split(','): undefined
  const firstColor = colors ? (colors[0] ? colors[0] : '') : ''
  const secondColor = colors ? colors[1] ? colors[1] : '' : ''
  const thirdColor = colors ? colors[2] ? colors[2] : '' : ''
  try {
    
    const conn2 = await createConnection(connData)
    const [breeds] = await conn2.execute(`SELECT name FROM breeds WHERE type_name = ? ${req.query.ad_type ? '' : ' OR 1=1'}`, [req.query.ad_type ? req.query.ad_type : ''])
    await conn2.end()

    const conn = await createConnection(connData)
    const sqlQuery = `SELECT ad.date, ad.ad_type, ad.id, p.gender, p.breed_name, p.photo, group_concat(c.name) as colors FROM adoption_ads ad
    JOIN pets p ON ad.pet_id = p.id
    JOIN color_records cr ON cr.pet_id = p.id
    JOIN colors c ON cr.color_id = c.id
    WHERE ad.status = 1 AND ad.date < ?
    AND (ad.ad_type=? ${req.query.ad_type ? '': ' OR 1=1'})
    AND (p.breed_name=? ${req.query.breed_name ? '': ' OR 1=1'})
    AND (p.gender=? ${req.query.gender ? '': ' OR 1=1'})
    group by p.id, ad.date, ad.ad_type, ad.id, p.gender, p.breed_name
    having colors like '%${firstColor}%' AND colors like '%${secondColor}%' AND colors like '%${thirdColor}%'
    ORDER BY ad.date DESC
    limit 5`

    const [adoptionAds] = await conn.execute(sqlQuery, 
      [req.query.last_date ? req.query.last_date : new Date(), 
      req.query.ad_type ? req.query.ad_type : '',
      req.query.breed_name ? req.query.breed_name : '',
      req.query.gender ? req.query.gender : '',
      
    ])
    
    

    await conn.end()
    res.send({result: adoptionAds, breeds})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export  {
  getAdoptionAd,
  getAdoptionAds
}