const restaurantList = require('../../restaurant.json')
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const seedUser = {
  user1: {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  user2: {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
}

db.once('open', () => {
  const restaurant = restaurantList.results
  console.log('mongodb connected!')
  
  for (let i in seedUser) {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser[key].password, salt))
      .then(hash => User.create({
        name: seedUser[i].name,
        email: seedUser[i].email,
        password: hash
      }))
      .then(user => {
        const userId = user._id

        for (let i = 0; i < 3; i++) {
          Restaurant.create({
            name: restaurant[0].name,
            location: restaurant[0].location,
            google_map: restaurant[0].google_map,
            phone: restaurant[0].phone,
            rating: restaurant[0].rating,
            description: restaurant[0].description,
            image: restaurant[0].image,
            category: restaurant[0].category,
            userId
          })
          restaurant.shift()
        }
      })
  }
  console.log('Done')
})