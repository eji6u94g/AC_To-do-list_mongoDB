const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name: {
    type: text,
    required: true
  }
})

module.exports = mongoose.model('Todo_Schema', todoSchema)