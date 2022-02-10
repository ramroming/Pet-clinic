// requiring express
const express = require('express')

// requiring the connection
const conn = require('./src/database/pet-clinic-db')

// requiring the routers
const usersRouter = require('./src/endpoints/users')

const app = express()

const PORT = 5000

// This will parse the incomming JSON data into javascript objects
app.use(express.json())

// Using the Routers
app.use(usersRouter)

app.listen(PORT, () => {
  console.log('Connected successfully to PORT ', PORT)
})