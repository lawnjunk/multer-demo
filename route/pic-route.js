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
// multer wants thie <imputs name="image" ... for this route
picRouter.post('/api/pic', multer.single('image'), s3Upload, (req, res, next) => {
  let data = {
    name: req.body.name,
    desc: req.body.desc,
    size: req.file.size,
    mimetype: req.file.mimetype,
    imageURI: req.s3data.Location,
  }

  new Pic(data).save()
  .then(pic => res.json(pic))
  .catch(next)
})

