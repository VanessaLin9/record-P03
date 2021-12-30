const express = require('express')
const router = express.Router()
const db = require('../../models')
const Twstock = db.Twstock


router.get('/', (req, res) => {
  return Twstock.findAll({
    raw:true,
    nest: true,
    attributes: ['id', 'name']
  })
  .then((stock) => res.render('index'))
  
})

module.exports = router