const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')
const app = express()
const PORT = 3000

const usePassport = require('./config/passport')

app.engine('hbs', exphbs({ defaultLayout:'main', extname:'.hbs'}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true}))

// session and flash
app.use(session({ secret:'secret', resave: false, saveUninitialized: false}))
app.use(flash())

app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  next()
})

usePassport(app)

app.listen(PORT, () => {
  console.log('app is running on http://localhost:3000')
})

require('./routes')(app)
module.exports = app