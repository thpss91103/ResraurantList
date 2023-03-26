const e = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const { Error } = require('mongoose')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const restaurantList = require("./restaurant.json")
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error!')
})

db.once('open', () => {
  console.log('Mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(methodOverride('_method'))
app.use(routes)






app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect("/")
  }
  
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})