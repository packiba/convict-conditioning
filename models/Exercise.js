const {Schema, model} = require('mongoose')

const schema = new Schema({
  exercise: {
    id: Number,
    name: String
  },
  category: {
    id: Number,
    name: String
  },
  level1: [Number],
  level2: [Number],
  level3: [Number],
  "anim-uri": String,
  description: [String]
})

module.exports = model('Exercise', schema)