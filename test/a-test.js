'use strict'
const expect = require('chai').expect
const server = require('../server.js')

describe('fake', function() {
  after( done => {
    server.close( err => {
      if (err) return done(err)
      console.log('server down')
      server.isRunning = false
      done()
    })
  })
  it('should pass', done => {
    expect(true).to.equal(true)
    done()
  })
})
