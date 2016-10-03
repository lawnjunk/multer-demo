'use strict'

const aws = require('aws-sdk')
const multer = require('multer')
const Router = require('express').Router
const upload = multer({dest: `${__dirname}/../upload`})
const s3upload = require('../lib/s3-image-upload.js')

const imageRouter = module.exports = Router()

imageRouter.post('/api/image', upload.single('image'), s3upload, function(req, res, next){ 
  res.json(req.s3data)
})
