const mongoose = require('mongoose')
const dbConnectionStatus = mongoose.connection
const MONGODB_URI = process.env.MONGODB || 'mongodb://localhost:27017/to-do-list'

//setup mongoose
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//connection status response setting
dbConnectionStatus.on('error', () => {
  console.log('Mongodb error!')
})

dbConnectionStatus.once('open', () => {
  console.log('Mongodb is connected')
})

module.exports = dbConnectionStatus