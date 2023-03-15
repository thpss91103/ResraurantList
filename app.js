const express = require('express')
const exphbs = require('express-handlebars')
const restaurantList = require("./restaurant.json")
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurant/:id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id === Number(req.params.id))
  res.render('show', { restaurant: restaurant[0] })
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
  console.log(`Express is listening on localhost:${port}`)
})