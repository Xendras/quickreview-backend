const jwt = require('jsonwebtoken')
const categoriesRouter = require('express').Router()
const Category = require('../models/category')
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

categoriesRouter.get('/', async (req, res) => {
  const categories = await Category.find({}).populate('questions', { question: 1 })
  res.json(categories.map(Category.format))
})

categoriesRouter.post('/', async (req, res) => {
  const body = req.body

  const decodedToken = authenticationCheck(req)
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const authorizedUser = await User.findById(decodedToken.id)
  if (authorizedUser.type !== 'admin') {
    return res.status(401).json({ error: 'authorization required' })
  }

  const category = new Category({
    name: body.name,
    questions: []
  })
  const savedCategory = await category.save()
  res.json(savedCategory)
})

module.exports = categoriesRouter