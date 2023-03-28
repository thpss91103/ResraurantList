const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  console.log(req.query)
  if (!req.query.keyword) {
    return res.redirect("/")
  }

  const keywords = req.query.keyword
  const keyword = req.query.keyword.trim().toLowerCase()
  const sortMethod = req.query.sort
  let sortKeyword = {name: 'asc'}

  if (sortMethod === 'Z > A')
    sortKeyword = {name: 'desc'}
  
  if (sortMethod === '類別')
    sortKeyword = {category: 'asc'}

  if(sortMethod === '地區')
    sortKeyword = {location: 'asc'}
    
  return Restaurant.find({})
    .lean()
    .sort(sortKeyword)
    .then(restaurant => {
      const restaurantData = restaurant.filter(data => 
        data.name.toLowerCase().includes(keyword) || data.category.includes(keyword)
      )
      res.render('index', { restaurants: restaurantData, keywords, sortMethod})
    })
    .catch(error => console.log(error))
})


module.exports = router