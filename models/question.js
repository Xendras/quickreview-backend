const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: String,
  answers: [Object],
  correctAnswer: String,
  explanation: String
})

questionSchema.statics.format = (question) => {
  return {
    id: question._id,
    question,
    answers: question.answers,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation
  }
}

const Question = mongoose.model('Question', questionSchema)

module.exports = Question