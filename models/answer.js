const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  answer: String,
  date: Date
})

answerSchema.statics.format = (answer) => {
  return {
    id: answer._id,
    question: answer.question,
    answer: answer.answer,
    date: answer.date
  }
}

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer