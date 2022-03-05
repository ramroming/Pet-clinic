// requiring express
const express = require('express')

const cors = require('cors')
// requiring the connection
const conn = require('./src/database/pet-clinic-db')

// requiring the routers
const usersRouter = require('./src/routers/users')
const petsRouter = require('./src/routers/pets')
const staffmemRouter = require('./src/routers/staffmem')
const appointmentRouter = require('./src/routers/appointment')


const app = express()

const PORT = 5000

// This will parse the incomming JSON data into javascript objects
app.use(express.json())

// this will fix the CORS Error
app.use(cors())

// app.use((req, res, next) => {
//   setTimeout(() => {
//     next()
//   }, 3000)
// })

// Using the Routers
app.use(usersRouter)
app.use(petsRouter)
app.use(appointmentRouter)

// not found url
app.use('/*', (req, res) => {
  res.send('404 Endpoint not found!!')
})

app.listen(PORT, () => {
  console.log('Connected successfully to PORT ', PORT)
})