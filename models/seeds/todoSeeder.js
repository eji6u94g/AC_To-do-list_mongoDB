const dbConnectionStatus = require('../../config/mongoose.js')
const Todo = require('../todo.js')

dbConnectionStatus.once('open', () => {
  for (let i = 0; i < 10; i++) {
    Todo.create({ name: `name-${i}` })
  }

  console.log('Seed data are loaded')
})