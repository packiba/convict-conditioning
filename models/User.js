const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  history: [{type: Types.ObjectId, ref: 'History'}]
})

module.exports = model('User', schema)