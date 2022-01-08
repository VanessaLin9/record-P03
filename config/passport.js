const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
}

passport.use(new LocalStrategy({ 
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback:true
},  
(req, email, password, cb) => {
  User.findOne({email})
  .then(user => {
    if(!user) return cb(null, false, req.flash('error_messages', '帳號不存在!'))
    if(!bcrypt.compareSync(password, user.password)) return cb(null, false, req.flash('error_messages', '密碼輸入錯誤!'))
    return cb(null, user)
  })
  .catch(err => document(err, false))
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
 try {
   await User.findByPk(id).then(user => {
    user = user.toJSON()
    return cb(null, user)
  })
 } catch (error) {
    res.render('new', {Error})
 }
})