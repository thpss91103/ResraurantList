const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

db.once('open', () => {
  const len = restaurantList.results.length
  const restaurant = restaurantList.results
  console.log('mongodb connected!')
  for (let i =0; i < len; i++) {
    Restaurant.create({ 
      name: restaurant[i].name, 
      location: restaurant[i].location,
      google_map : restaurant[i].google_map,
      phone: restaurant[i].phone,
      rating: restaurant[i].rating,
      description: restaurant[i].description,
      image: restaurant[i].image,
      category: restaurant[i].category
    })
  }
  console.log('Done')
})