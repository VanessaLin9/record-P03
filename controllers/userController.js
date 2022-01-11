const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {

  // router.get('/', (req, res) => {
  // return Twstock.findAll({
  //   raw:true,
  //   nest: true,
  //   attributes: ['id', 'name']
  // })
  // .then((stock) => res.render('home'))
  
// }),


// 登入
loginPage: (req, res) => {
  return res.render('login')
  },

login: (req, res) => {
  req.flash('success_message', '成功登入')
  res.redirect('/')
 },

// 註冊
signUpPage:  (req, res) => { 
  return res.render('register')},

signUp: (req, res) => {
  const { name, email, password, confirmPassword} = req.body
  if ( !name || name.length > 50 || !email ) {
    req.flash('error_message', '表單內容不符條件')
    return res.render('register', { name, email })
  }
  if ( confirmPassword !== password) {
    req.flash('error_message', '兩次密碼輸入不符')
    return res.render('register', { name, email })
  }

  User.findOne({where: { email:email}})
  .then( users => {
    if (users) {
      req.flash('error_message', '註冊失敗，email已註冊過')
      return res.render('register', { name, email })
    }
    User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
    })
    .then(() => {
      req.flash('success_message', '帳號已成功註冊!')
      return res.redirect('/users/login')
    })
  })
  },

//登出
logout: (req,res) => {
  req.flash('success_message', '成功登出!')
  req.logout()
  res.redirect('/users/login')
  },

}



module.exports = userController