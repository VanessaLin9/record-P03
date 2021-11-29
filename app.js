const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000

const db = require('./models')

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs'}))

app.get('/', (req, res) => {
  res.send('Hello word')
})

app.listen(PORT, () => {
  console.log('app is running on http://localhost:3000')
})