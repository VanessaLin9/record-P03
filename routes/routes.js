const express = require('express')
const router = express.Router()
const db = require('../models')
const Twstock = db.Twstock


router.get('/', (req, res) => {
  return Twstock.findAll({
    raw:true,
    nest: true,
    attributes: ['id', 'name']
  })
  .then((stock) => res.render('login'))
  
})

router.get('/users/login', (req, res) => {
  res.render('login')
})
router.get('/users/register', (req, res) => {
  res.render('register')
})

module.exports = router