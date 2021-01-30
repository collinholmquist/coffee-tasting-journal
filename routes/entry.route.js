const express = require('express')
const router = express.Router()

const entries = require('../controllers/entry.controller.js')

router.post('/entry', entries.create)
router.get('/journal', entries.findAll)

module.exports = router