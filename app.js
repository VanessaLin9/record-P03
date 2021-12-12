const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const PORT = 3000
const routes = require('./routes')

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs'}))
app.set('view engine', 'hbs')

app.use(routes)



app.listen(PORT, () => {
  console.log('app is running on http://localhost:3000')
})