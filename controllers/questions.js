const questionsRouter = require('express').Router()
const Question = require('../models/question')

questionsRouter.get('/', async (req, res) => {
  const questions = await Question.find({}).populate('category', { name: 1 })
  res.json(questions.map(Question.format))
})

questionsRouter.post('/', async (req, res) => {
  const body = req.body
  const question = new Question({
    question: body.question,
    answers: body.answers,
    correctAnswer: body.correctAnswer,
    explanation: body.explanation,
    category: body.category
  })
  await question.save()
  res.json(question)
})

module.exports = questionsRouter