const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000


app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs'}))
app.set('view engine', 'hbs')



app.listen(PORT, () => {
  console.log('app is running on http://localhost:3000')
})

require('./routes')(app)
module.exports = app