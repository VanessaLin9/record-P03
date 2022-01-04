const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const db = require('../models')
const { Op } = require('sequelize')
const Twstock = db.Twstock
const User = db.User


router.get('/', (req, res) => {
  return Twstock.findAll({
    raw:true,
    nest: true,
    attributes: ['id', 'name']
  })
  .then((stock) => res.render('login'))
  
})
// 登入
router.get('/users/login', (req, res) => {
  res.render('login')
})
// 註冊
router.get('/users/register', (req, res) => {
  res.render('register')
})
router.post('/users/register',(req, res) => {
  const { name, email, password, checkPassword} = req.body
  if ( !name || name.length > 50 || !email ) {
    req.flash('error_message', '表單內容不符條件')
    return res.render('register', {
       name, email, password 
      })
  }
  if ( checkPassword !== password) {
    req.flash('error_message', '兩次密碼輸入不符')
    return res.render('register', {
       name, email, password 
      })
  }

  User.findOne({where: { email:email}})
  .then( users => {
    if (users) {
      req.flash('error_message', '註冊失敗，email已註冊過')
      return res.render('register', {
       name, email, password 
      })
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
})

module.exports = router