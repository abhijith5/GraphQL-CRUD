const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const workersSchema = new Schema({
  name: String,
  department: String,
  skills: String
})

module.exports = mongoose.model('Workers', workersSchema)