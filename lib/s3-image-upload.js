'use strict'

// node modules
const path = require('path')

// npm modules
const fs = require('fs')
const aws = require('aws-sdk')

// module constants
const s3 = new aws.S3()

// module logic
module.exports = function(req, res, next){
  if (!req.file) return next(new Error('no file'))
  if (!req.file.path) return next(new Error('no file path'))

  console.log('req.file', req.file)

  let extenstion = path.extname(req.file.originalname)
  const params = {
    Bucket: 'slugbyte-img-demo',
    Key: `${req.file.filename}${extenstion}`,
    Body: fs.createReadStream(req.file.path),
  }

  s3.upload(params, function(err, data){
    if(err) return next(err)
    req.s3data = data
    next()
    fs.unlink(req.file.path, (err, data) => {
      if (err) return next(err)
    })
  })
}
