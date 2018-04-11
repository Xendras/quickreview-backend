const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  question: String,
  answers: [{
    id: String,
    answer: String
  }],
  correctAnswer: String,
  explanation: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})

questionSchema.statics.format = (question) => {
  return {
    id: question._id,
    question: question.question,
    answers: question.answers,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    category: question.category
  }
}

const Question = mongoose.model('Question', questionSchema)

module.exports = Question