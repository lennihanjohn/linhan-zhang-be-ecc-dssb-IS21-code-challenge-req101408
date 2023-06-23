const express = require('express')
const router = express.Router()

// create product endpoint
router.use('/api/product', require('./product.routes'))

module.exports = router