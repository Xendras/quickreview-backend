const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
  name: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
})

categorySchema.statics.format = (category) => {
  return {
    id: category._id,
    name: category.name,
    questions: category.questions
  }
}

const Category = mongoose.model('Category', categorySchema)

module.exports = Category