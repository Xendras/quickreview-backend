const questionsRouter = require('express').Router()
const Question = require('../models/question')

questionsRouter.get('/api/questions', async (req, res) => {
  const questions = await Question.find({})
  res.json(questions.map(Question.format))
})

questionsRouter.post('/api/questions', (req, res) => {
  const body = req.body
  const question = new Question({
    question: body.question,
    answers: body.answer,
    correctAnswer: body.correctAnswer,
    explanation: body.explanation
  })
  await question.save()
  res.json(question)
})

module.exports = questionsRouter