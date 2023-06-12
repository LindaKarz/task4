const {Schema, model} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  date: {type: Date, default: new Date(Date.now())}
})

module.exports = model('User', schema)