const categoriesRouter = require('express').Router()
const Category = require('../models/category')

categoriesRouter.get('/', async (req, res) => {
  const categories = await Category.find({}).populate('questions', { question: 1 })
  res.json(categories.map(Category.format))
})

categoriesRouter.post('/', async (req, res) => {
  const body = req.body
  const category = new Category({
    name: body.name,
    questions: []
  })
  await category.save()
  res.json(category)
})

module.exports = categoriesRouter