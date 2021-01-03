const {Schema, model} = require('mongoose')

const schema = new Schema({
  userId: {ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now},
  catId: Number,
  exId: Number,
  curLev: Number,
  sets: [Number]
})

module.exports = model('WorkoutLog', schema)