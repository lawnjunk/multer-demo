'use strict'

// nuke cash so that you can require the sever for the first time
// this is required for angular mocks to work

// aws mocks
require('./lib/aws-mocks.js')

// node modules
const fs = require('fs')
// npm modules
const Promise = require('bluebird')
const mongoose = require('mongoose')
const expect = require('chai').expect
const AWS = require('aws-sdk-mock')

// app modules
const Pic = require('../model/pic.js')
let formRequset = require('../lib/form-request.js')
const server = require('../server.js')

// mongoose config
mongoose.Promise = Promise

// decache server

// tests
describe('testing pic routes', function(){
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
