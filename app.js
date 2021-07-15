const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')
const todoData = require('./models/todo.js')
const routes = require('./routes/index.js')
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
app.use(express.urlencoded({ extended: true }))

//set methodoverride
app.use(methodOverRide('_method'))

//routes
app.use(routes)

app.listen(port, () => {
  console.log('online')
})