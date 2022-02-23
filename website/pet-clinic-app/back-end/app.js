// requiring express
const express = require('express')

const cors = require('cors')
// requiring the connection
const conn = require('./src/database/pet-clinic-db')

// requiring the routers
const usersRouter = require('./src/routers/users')
const petsRouter = require('./src/routers/pets')


const app = express()

const PORT = 5000

// This will parse the incomming JSON data into javascript objects
app.use(express.json())

// this will fix the CORS Error
app.use(cors())



// Using the Routers
app.use(usersRouter)
app.use(petsRouter)

// not found url
app.use('/*', (req, res) => {
  res.send('404 Endpoint not found!!')
})

app.listen(PORT, () => {
  console.log('Connected successfully to PORT ', PORT)
})