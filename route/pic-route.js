'use strict'


// npm modules
const Router = require('express').Router
//const Promise = require('bluebird')
//const multer = require('multer')({dest: `${__dirname}/../upload`})

// node + promisify
//const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})

// app modules
//const s3 = require('../lib/s3-image-upload.js')

// module constants
//const Pic = require('../model/pic.js')
const picRouter = module.exports = new Router()

// module logic
// multer wants thie <imputs name="image" ... for this route
picRouter.post('/api/pic', function(req, res, next){
})

  //s3.upload(req.file)
  //.then(s3Data  => {
    //let data = {
      //name: req.body.name,
      //desc: req.body.desc,
      //size: req.file.size,
      //mimetype: req.file.mimetype,
      //imageURI: s3Data.Location,
    //}
    //return new Pic(data).save()
  //})
  //.then(pic => res.json(pic))
  //.then(() => fs.unlinkProm(req.file.path))
  //.catch((err) => {
    //fs.unlinkProm(req.file.path)
    //return Promise.reject(err)
  //})
  //.catch(next)
//})

//picRouter.delete('/api/pic/:id', function(req, res, next){
//})
