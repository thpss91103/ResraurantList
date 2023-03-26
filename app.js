const e = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const { Error } = require('mongoose')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const restaurantList = require("./restaurant.json")
const methodOverride = require('method-override')
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


app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', {restaurants}))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, location, google_map, phone, rating, description, image, category} = req.body
  return Restaurant.create({ name, location, google_map, phone, rating, description, image, category })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurant/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))  
})

app.put('/restaurant/:id', (req, res) => {
  const id = req.params.id
  const { name, location, google_map, phone, rating, description, image, category} = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.location = location
      restaurant.google_map = google_map
      restaurant.phone = phone
      restaurant.rating = rating
      restaurant.description = description
      restaurant.image = image
      restaurant.category = category
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurant/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

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