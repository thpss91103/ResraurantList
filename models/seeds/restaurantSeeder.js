const mongoose = require('mongoose')
const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  const len = restaurantList.results.length
  const restaurant = restaurantList.results
  console.log('mongodb connected!')
  for (let i =0; i < len; i++) {
    Restaurant.create({ 
      name: restaurant[i].name, 
      location: restaurant[i].location,
      phone: restaurant[i].phone,
      rating: restaurant[i].rating,
      description: restaurant[i].description,
      image: restaurant[i].image,
      category: restaurant[i].category
    })
  }
  console.log('Done')
})