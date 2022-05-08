import { compare } from 'bcrypt'
import  jwt  from 'jsonwebtoken'

// checking the user credentials when logging in
const find_user_by_credentials = async (conn, username, password) => {
  const [user] = await conn.execute('SELECT id, username, email, password, user_type, personal_info_id, status, stmem_type FROM users WHERE username = ?', [username])
  if (user.length === 0)
    throw new Error('Wrong username or password')

  // comparing between the entered password and the password in the database
  const userPassword = user[0].password
  const isMatch = await compare(password, userPassword)
  if (!isMatch)
    throw new Error('Wrong username or password')

  // clearing password from the user Object before returning it
  delete user[0].password
  return user[0]
}

// creating a JWT
const generate_auth_token = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '7 days' })
  return token

  // try {
  //   const conn = await mysql.createConnection(connData)
  //   const [tokens, fields] = await conn.execute('INSERT INTO user_tokens (token, user_id) VALUES (?, ?)', [token, payload])

  //   await conn.end()
  //   return token

  //   // incase of failure in storing token in the database
  // } catch (e) {
  //   await conn.end()
  //   return undefined
  // }

}

export default {
  find_user_by_credentials,
  generate_auth_token,
}