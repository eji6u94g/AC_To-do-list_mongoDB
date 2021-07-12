const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const todoData = require('./models/todo.js')
const app = express()
const port = 3000
const dbConnectionStatus = mongoose.connection

//setup mongoose
mongoose.connect('mongodb://localhost:27017/to-do-list', { useNewUrlParser: true, useUnifiedTopology: true })

dbConnectionStatus.on('error', () => {
  console.log('Mongodb error!')
})

dbConnectionStatus.once('open', () => {
  console.log('Mongodb is connected')
})

//set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set body-parser
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  //get all of data from Todo models
  todoData.find()
    .lean() //把 Mongoose 的 Model 物件轉換成乾淨單純的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// create item
app.get('/todos/new', (req, res) => {
  res.render('new')
})

app.post('/todos', (req, res) => {
  const name = req.body.name
  todoData.create({ name })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//see detail of item
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  todoData.findById(id)
    .lean()
    .then(todo => res.render('detail', { todo }))
    .catch(error => console.log(error))
})

//edit item
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  todoData.findById(id)
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(error => console.log(error))
})

app.post('/todos/:id', (req, res) => {
  const name = req.body.name
  const id = req.params.id
  todoData.findById(id)
    .then(todo => {
      todo.name = name
      return todo.save()
    })
    .then(todo => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})



app.listen(port, () => {
  console.log('online')
})