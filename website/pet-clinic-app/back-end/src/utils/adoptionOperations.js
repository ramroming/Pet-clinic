import { createConnection } from 'mysql2/promise'
import connData from '../database/pet-clinic-db.js'

const get_wish_list = async (adId) => {
  try {
    const conn = await createConnection(connData)
    const [listCount] = await conn.execute('SELECT COUNT(date) as requesters_count FROM adoption_requests WHERE adoption_ad_id = ? AND status="pending"', [adId])
    await conn.end()
    return listCount[0].requesters_count

  } catch (e) {
    throw e
  }
}

export {
  get_wish_list
}