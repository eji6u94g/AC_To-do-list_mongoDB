const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
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

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('online')
})