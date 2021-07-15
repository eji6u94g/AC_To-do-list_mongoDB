const express = require('express')
const router = express.Router()
const todoData = require('../../models/todo.js')

// create item
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const name = req.body.name
  todoData.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//see detail of item
router.get('/:id', (req, res) => {
  const id = req.params.id
  todoData.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//edit item
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  todoData.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const { name, isDone } = req.body
  const id = req.params.id
  todoData.findById(id)
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      console.log(todo.isDone)
      console.log(isDone)
      return todo.save()
    })
    .then(todo => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})

//delete item
router.delete('/:id', (req, res) => {
  const id = req.params.id
  todoData.findById(id)
    .then(todo => todo.remove())
    .then(todo => res.redirect('/'))
    .catch(error => console.log(error))
})


module.exports = router