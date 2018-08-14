const mongoose = require('mongoose')
const Schema = mongoose.Schema
const pressSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

pressSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})
// mongoose.model('Press', pressSchema)
module.exports = mongoose.model('Press', pressSchema)
