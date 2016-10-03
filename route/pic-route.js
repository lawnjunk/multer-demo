'use strict'

// npm modules
const Router = require('express').Router
const multer = require('multer')({dest: `${__dirname}/../upload`})

// app modules
const s3Upload = require('../lib/s3-image-upload.js')

// module constants
const Pic = require('../model/pic.js')
const picRouter = module.exports = Router()

// module logic
picRouter.post('/api/pic', multer.storage('image'), s3Upload, (req, res, next) => {
  let data = {
    name: req.file.filename,
    desc: req.file.filename,
    imageURI: req.s3data.Location,
    created: new Date(),
  }

  new Pic(data)
  .then(pic => res.json(pic))
  .catch(next)
})

