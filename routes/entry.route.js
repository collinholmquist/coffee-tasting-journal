/* const express = require('express')
const router = express.Router()
const coffeeConfig = require('../static/coffeeConfig')
const entries = require('../controllers/entry.controller.js')

router.get('/', (req, res) => {
    res.render('pages/login')
})
router.get('/', (req, res) => {
    res.render('pages/home', {
        brewmethods: coffeeConfig.brew_methods,
        taste_profile: coffeeConfig.flavor_profiles
    })
})
router.post('/entry', entries.create)
router.get('/journal', entries.findAll)
router.post('/journal', entries.orderBy)
router.post('/journal/:Coffee_Id', entries.editById)
router.get('/journal/:Coffee_Id', entries.findById)
router.get('/journal/remove/:Coffee_Id',entries.delete)

module.exports = router */