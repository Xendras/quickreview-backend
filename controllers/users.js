const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
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

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users.map(User.format))
})

usersRouter.post('/', async (req, res) => {
  const body = req.body

  // const decodedToken = authenticationCheck(req)
  // if (!decodedToken) {
  //   return res.status(401).json({ error: 'token missing or invalid' })
  // }

  // const authorizedUser = await User.findById(decodedToken.id)
  // if (authorizedUser.type !== 'admin') {
  //   return res.status(401).json({ error: 'authorization required' })
  // }

  // const existingUser = await User.find({ username: body.username })
  // if (existingUser.length > 0) {
  //   return res.status(400).json({ error: 'username must be unique' })
  // }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    type: body.type,
    passwordHash
  })
  const savedUser = await user.save()
  res.json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
  try {
    const decodedToken = authenticationCheck(req)
    if (!decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const authorizedUser = await User.findById(decodedToken.id)
    if (authorizedUser.type !== 'admin') {
      return res.status(401).json({ error: 'authorization required' })
    }

    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
  }
})

module.exports = usersRouter