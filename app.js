const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000

const db = require('./models')
const Twstock = db.Twstock

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs'}))

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  return Twstock.findAll({
    raw:true,
    nest: true,
    attributes: ['id', 'name']
  })
  .then((stock) => res.json({stock:stock}))
  
})

app.listen(PORT, () => {
  console.log('app is running on http://localhost:3000')
})