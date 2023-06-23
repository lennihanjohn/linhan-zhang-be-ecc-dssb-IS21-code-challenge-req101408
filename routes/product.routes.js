const express = require('express')
const router = express.Router()
const product = require('../models/product.model')
const m = require('../helpers/middlewares')

/* All products */
router.get('/', async (req, res) => {
    await product.getProducts()
    .then(products => res.json(products))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* Get a product by id */
router.get('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id
    await product.getProduct(id)
    .then(product => {
        return res.json(product)})
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
})

/* add a new product */
router.post('/', m.checkFields, async (req, res) => {
    await product.addProduct(req.body)
    .then(product => res.status(201).json({
        message: `The product #${product.productId} has been created`,
        content: product
    }))
    .catch(err => res.status(500).json({ message: err.message }))
})


/* Update a product */
router.put('/:id', m.mustBeInteger, m.checkFields, async (req, res) => {
    const id = req.params.id
    await product.updateProduct(id, req.body)
    .then(product => res.json({
        message: `The product #${id} has been updated`,
        content: product
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        }
        res.status(500).json({ message: err.message })
    })
})

/* Delete a product */
router.delete('/:id', m.mustBeInteger, async (req, res) => {
    const id = req.params.id

    await product.deleteProduct(id)
    .then(product => res.json({
        message: `The product #${id} has been deleted`, statusCode: 204
    }))
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message, statusCode: 204 })
        }
        res.status(500).json({ message: err.message })
    })
})

module.exports = router