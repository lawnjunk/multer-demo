'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const picSchema = Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  mimetype: {type: String, required: true},
  size: {type: Number, required: true},
  created: {type: Date, required: true, default: Date.now},
  imageURI: {type: String, required: true, unique: true},
})

const Pic = module.exports = mongoose.model('pic', picSchema)

Pic.schema.path('size').validate(function (value) {
  return value < 2097152 // less than 2 mega bytes
}, 'to large')

