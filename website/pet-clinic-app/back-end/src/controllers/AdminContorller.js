import { createConnection } from "mysql2/promise"
import connData from "../database/pet-clinic-db.js"

const adminGetUsers = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [users] = await conn.execute(`SELECT u.id, u.username, u.email, u.stmem_type, pi.first_name, pi.last_name, pi.id AS personal_id
    FROM users u JOIN personal_info pi ON u.personal_info_id = pi.id`)
    await conn.end()
    res.send(users)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }

}
const adminChageRole = async (req, res) => {
  const { newRole } = req.body
  let result
  try {
    const conn = await createConnection(connData)
    if (newRole) {
      result = await conn.execute(`UPDATE users SET user_type='stmem', stmem_type = ? WHERE id = ?`, [newRole, req.params.user_id])
    } else {
      result = await conn.execute(`UPDATE users SET user_type='client', stmem_type =null WHERE id = ?`, [req.params.user_id])
    }
    await conn.end()
    if (!result[0].affectedRows)
      return res.status(404).send({ error: 'user not found' })
    
    res.send({ result: 'User role changed was successfully '})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
const adminDeleteUser = async (req, res) => {
  try {
    const conn = await createConnection(connData)
    const [result] = await conn.execute(`DELETE FROM personal_info WHERE id=?`, [req.params.user_id])
    await conn.end()
    if (!result.affectedRows)
      return res.status(404).send({ error: 'user not found' })
    
    res.send({ result: 'User was deleted successfully '})
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
}
export {
  adminGetUsers,
  adminChageRole,
  adminDeleteUser
}