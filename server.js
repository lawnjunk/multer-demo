'use strict'

// npm modules
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const debug = require('debug')('filedemo:server')

// app modules
const imageRouter = require('./route/image.js')

// env vars
dotenv.load()

// setup mongoose
mongoose.connect(process.env.MONGODB_URI)

// module constants
const PORT = process.env.PORT
const app = express()

// app middleware
app.use(cors())
app.use(morgan('dev'))

// static server 
app.use(express.static(`${__dirname}/public`))

// app routes
app.use(imageRouter)

module.exports = app.listen(PORT, () => debug(`server up :: ${PORT}`))


