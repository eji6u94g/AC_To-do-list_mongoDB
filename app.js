//import modules
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')

//self-definition setting
const routes = require('./routes/index.js')
require('./config/mongoose')
const port = 3000

//items created from imported modules
const app = express()

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