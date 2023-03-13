const express = require('express')
const exphbs = require('express-handlebars')
const resturant = require("./resturant.json")
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { resturant: resturant.results})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})