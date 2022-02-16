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

// this will fix the CORS Error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ,Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE' )
  // setTimeout(() => next(), 4000);
  next()
})

// Using the Routers
app.use(usersRouter)

app.listen(PORT, () => {
  console.log('Connected successfully to PORT ', PORT)
})