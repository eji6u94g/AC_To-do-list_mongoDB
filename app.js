const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

//setup mongoose
mongoose.connect('mongodb://localhost:27017/to-do-list', { useNewUrlParser: true, useUnifiedTopology: true })
const dbConnectionStatus = mongoose.connection

dbConnectionStatus.on('error', () => {
  console.log('Mongodb error!')
})

dbConnectionStatus.once('open', () => {
  console.log('Mongodb is connected')
})

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log('online')
})