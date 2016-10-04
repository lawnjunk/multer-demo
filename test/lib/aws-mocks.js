'use strict'

const AWS = require('aws-sdk-mock')

module.exports = exports = {} 

exports.uploadMock = {
  ETag: '"1234"',
  Location: 'https://slugbyte-img-demo.s3.amazonaws.com/1234.png',
  key: '1234.png',
  Key: '1234.png',
  Bucket: 'slugbyte-img-demo',
}

AWS.mock('S3', 'upload', function(params, callback){
  if (!params.ACL === 'public-read')
    return callback(new Error('ACL must be public-read'))
  if (!params.Bucket === 'slugbyte-img-demo')
    return callback(new Error('Bucket must be slugbyte-img-demo'))
  if (!params.Key)
    return callback(new Error('must have Key set'))
  if (!params.Body)
    return callback(new Error('must have Body set'))
  callback(null, exports.uploadMock)
})
