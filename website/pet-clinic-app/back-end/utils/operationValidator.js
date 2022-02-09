const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')

// checking the user credentials when logging in
const findUserByCredentials = async (conn, username, password) => {
  const [user] = await conn.execute('SELECT * FROM users WHERE username = ?', [username])
  console.log(username)
  console.log(user)
  if (!user.length)
    throw new Error('Wrong Credentials')

  // comparing between the entered password and the password in the database
  const userPassword = user[0].password
  const isMatch = await bcrypt.compare(password, userPassword)
  if (!isMatch)
    throw new Error('Wrong Credentials')

  return user[0]
}
module.exports = {
  findUserByCredentials
}