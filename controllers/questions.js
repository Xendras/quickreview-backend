const jwt = require('jsonwebtoken')
const questionsRouter = require('express').Router()
const Question = require('../models/question')
const User = require('../models/user')

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

questionsRouter.get('/', async (req, res) => {
  const questions = await Question.find({}).populate('category', { name: 1 })
  res.json(questions.map(Question.format))
})

questionsRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = authenticationCheck(req)
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const authorizedUser = await User.findById(decodedToken.id)
  if (authorizedUser.type !== 'admin') {
    return res.status(401).json({ error: 'authorization required' })
  }

  const question = new Question({
    question: body.question,
    answers: body.answers,
    correctAnswer: body.correctAnswer,
    explanation: body.explanation,
    category: body.category
  })
  const savedQuestion = await question.save()
  res.json(savedQuestion)
})

questionsRouter.delete('/:id', async (req, res) => {
  try {

    const decodedToken = authenticationCheck(req)
    if (!decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const authorizedUser = await User.findById(decodedToken.id)
    if (authorizedUser.type !== 'admin') {
      return res.status(401).json({ error: 'authorization required' })
    }

    await Question.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
  }
})

module.exports = questionsRouter