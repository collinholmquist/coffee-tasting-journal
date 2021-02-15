const express = require('express')
const router = express.Router()

const entries = require('../controllers/entry.controller.js')


router.post('/entry', entries.create)
router.get('/journal', entries.findAll)
router.post('/journal', entries.orderBy)
router.post('/journal/:Coffee_Id', entries.editById)
router.get('/journal/:Coffee_Id', entries.findById)
router.get('/journal/remove/:Coffee_Id',entries.delete)

module.exports = router