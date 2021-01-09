const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  userId: {type: Types.ObjectId, ref: 'User'},
  // date: {type: Date, default: Date.now},
  catId: Number,
  exId: Number,
  exercise: String,
  curLev: Number,
  sets: [Number]
})

module.exports = model('WorkoutLog', schema)