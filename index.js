const http = require('http')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./utils/config')
const questionsRouter = require('./controllers/questions')
const categoriesRouter = require('./controllers/categories')

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(bodyParser.json())
app.use(cors())

app.use(middleware.logger)

app.use('/api/questions', questionsRouter)
app.use('/api/categories', categoriesRouter)

const server = http.createServer(app)

app.use(middleware.error)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}