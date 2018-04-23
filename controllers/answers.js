const jwt = require('jsonwebtoken')
const answersRouter = require('express').Router()
const User = require('../models/user')
const Answer = require('../models/answer')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const authenticationCheck = (request) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return false
  }

  return decodedToken
}

answersRouter.get('/', async (req, res) => {
  const answers = await Answer.find({}).populate('question', { question: 1, correctAnswer: 1 })
  res.json(answers.map(Answer.format))
})

answersRouter.post('/', async (req, res) => {
  const body = req.body

  const answer = new Answer({
    question: body.question,
    answer: body.answer,
    date: new Date()
  })
  const savedAnswer = await answer.save()
  res.json(savedAnswer)
})

module.exports = answersRouter