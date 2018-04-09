const http = require('http')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())

app.use(middleware.logger)

const questions = [
  {
    id: 1,
    question: '\\text{Calculate } 2^2',
    answers: [
      {
        id: 'a',
        answer: '4'
      },
      {
        id: 'b',
        answer: '2'
      },
      {
        id: 'c',
        answer: '0'
      }
    ],
    correctAnswer: 'a',
    explanation: '\\text{That\'s how exponents work}'
  },
  {
    id: 2,
    question: '\\text{Solve the equation } \blockkatex-block x^2-4=0 \block',
    answers: [
      {
        id: 'a',
        answer: '4'
      },
      {
        id: 'b',
        answer: '2 \\text{ and } -2'
      },
      {
        id: 'c',
        answer: '2'
      }
    ],
    correctAnswer: 'b',
    explanation: '\\text{Conjugate rule}'
  },
  {
    id: 3,
    question: '\\text{Evaluate the infinite sum }\blockkatex-block \\sum^\\infty_{n=0}\\frac{1}{n}\block',
    answers: [
      {
        id: 'a',
        answer: '1'
      },
      {
        id: 'b',
        answer: '0'
      },
      {
        id: 'c',
        answer: '\\infty'
      }
    ],
    correctAnswer: 'c',
    explanation: '\\text {Harmonic series}'
  }
]

app.get('/', (req, res) => {
  res.send('<h1>QuickReview!</h1>')
})

app.get('/questions', (req, res) => {
  res.json(questions)
})

app.post('/questions', (req, res) => {
  const question = request.body
  
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(middleware.error)