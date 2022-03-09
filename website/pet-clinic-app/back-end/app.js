// requiring express
import express, { json } from 'express'

import cors from 'cors'


// requiring the routers
import usersRouter from './src/routers/users.js'
import petsRouter from './src/routers/pets.js'
import appointmentRouter from './src/routers/appointment.js'


const app = express()

const PORT = 5000

// This will parse the incomming JSON data into javascript objects
app.use(json())

// this will fix the CORS Error
app.use(cors())

app.use((req, res, next) => {
  setTimeout(() => {
    next()
  }, 1000)
})

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