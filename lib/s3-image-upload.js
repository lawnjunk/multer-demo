'use strict'

// node modules
const path = require('path')

// npm modules
const fs = require('fs')
const aws = require('aws-sdk')

// module constants
const s3 = new aws.S3()

// module logic
module.exports = exports = {}
exports.upload = function(file){
  return new Promise((resolve, reject) => {
    if (!file)
      return reject(new Error('no file'))
    if (!file.path)
      return reject(new Error('no file path'))

    let extenstion = path.extname(file.originalname)
    const params = {
      ACL: 'public-read', // required for img tags to acces image asset
      Bucket: 'slugbyte-img-demo',
      Key: `${file.filename}${extenstion}`,
      Body: fs.createReadStream(file.path),
    }

    s3.upload(params, function(err, data){
      if(err) return reject(err)
      resolve(data)
    })
  })
}
