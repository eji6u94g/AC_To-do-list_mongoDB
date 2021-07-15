const mongoose = require('mongoose')
const dbConnectionStatus = mongoose.connection

//setup mongoose
mongoose.connect('mongodb://localhost:27017/to-do-list', { useNewUrlParser: true, useUnifiedTopology: true })

//connection status response setting
dbConnectionStatus.on('error', () => {
  console.log('Mongodb error!')
})

dbConnectionStatus.once('open', () => {
  console.log('Mongodb is connected')
})

module.exports = dbConnectionStatus