const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = app => {
  //初始化 passport 模組
  app.use(passport.initialize())
  app.use(passport.session())

 //本地登入策略
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

  //Facebook登入策略
//  passport.use(new FacebookStrategy({
//    clientID: process.env.FACEBOOK_ID, //應用程式編號
//    clientSecret: process.env.FACEBOOK_SECRET, //應用程式密碼
//    callbackURL: process.env.FACEBOOK_CALLBACK, //重新導向網址
//    profiledFields: ['email', 'displayName'] //要求資料
//  }, (accessToken, refreshToken, profile, done) => {
//    console.log(profile)
//    const { name, email } = profile._json
//    User.finOne({ email })
//    .then(user => {
//      if(user) return done (null, user)
//      const randomPassword = Math.random().toString(36).slice(-8)
//      bcrypt
//      .genSalt(10)
//      .then(salt => bcrypt.hash(randomPassword, salt))
//      .then(hash => User.creat({
//        name,
//        email,
//        password: hash
//      })) 
//      .then(user => done(null, user))
//      .catch(err => done(err, false))
//    })
//  }))

 //序列化，反序列化
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

}