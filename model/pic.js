'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const picSchema = Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  created: {type: Date, required: true},
  imageURI: {type: String, required: true},
})

module.exports = mongoose.model('pic', picSchema);

