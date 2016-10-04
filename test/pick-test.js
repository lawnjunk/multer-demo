'use strict'

// nuke cash so that you can require the sever for the first time
// this is required for angular mocks to work

// node modules
const fs = require('fs')

// npm modules
const decache = require('decache')
const Promise = require('bluebird')
const mongoose = require('mongoose')
const expect = require('chai').expect
decache('aws-sdk')
const AWS = require('aws-sdk-mock')

// app modules
const Pic = require('../model/pic.js')
let formRequset = require('../lib/form-request.js')

// mongoose config
mongoose.Promise = Promise

// decache server

// aws s3 mock
let uploadMock = {
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
  callback(null, uploadMock)
})

// tests
describe('testing pic routes', function(){
  const server = require('../server.js');
  before(done => {
    if (!server.isRunning) {
      return server.listen(process.env.PORT, () =>  {
        console.log('server up')
        server.isRunning = true
        done()
      })
    }
    done()
  })

  describe('testing POST /api/pic', function(){
    after( done => {
      Pic.remove({})
      .then(() => done())
      .catch(done)
    })

    it('should return a pic', done => {
      let params = {
        name: 'slug',
        desc: 'cool',
        image: fs.createReadStream(`${__dirname}/data/computer.png`),
      }

      formRequset('http://localhost:3000/api/pic', params)
      .then( res => {
        expect(res.statusCode).to.equal(200)
        expect(res.body.name).to.equal('slug')
        done()
      })
      .catch(done)
    })
  })
})
