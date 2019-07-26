const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
  priority: String,
  description: String,
  worker: String,
  department: String
})

module.exports = mongoose.model('Work', workSchema)