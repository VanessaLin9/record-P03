const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require('../models')
const { Op } = require('sequelize')
const Twstock = db.Twstock
const User = db.User
const userController = require('../controllers/userController')

router.get('/', (req, res) => { res.render('home')})


// 登入
router.get('/users/login', userController.loginPage)
router.post('/users/login', passport.authenticate('local', { failureRedirect:'/users/login', failureFlash: true}), userController.login)

// 註冊
router.get('/users/register', userController.signUpPage)
router.post('/users/register', userController.signUp)

//登出
router.get('/user/logout', userController.logout)
module.exports = router