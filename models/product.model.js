let products = require('../data/products.json')
const filename = './data/products.json'

const helper = require('../helpers/helper.js')


// retrive list of products from JSON
function getProducts() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

// retrieve one product from JSON
function getProduct(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(product => resolve(product))
        .catch(err => reject(err))
    })
}

// new product to JSON
function addProduct(newProduct) {
    return new Promise((resolve, reject) => {
        newProduct = { ...newProduct, productId: products.length > 0 ? products[products.length - 1].productId + 1 : 1 }
        products.push(newProduct)
        helper.writeJSONFile(filename, products)

        resolve(newProduct)
    })
}
// update product to JSON
function updateProduct(id, newProduct) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(product => {
            const index = products.findIndex(p => p.productId == product.productId)    
            products[index] = {...newProduct, productId: parseInt(product.productId) }
            helper.writeJSONFile(filename, products)
            resolve(products[index])
        })
        .catch(err => reject(err))
    })
}
// delete a product to JSON 
function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(products, id)
        .then(() => {
            products = products.filter(p => p.productId !== parseInt(id))
            helper.writeJSONFile(filename, products)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    addProduct,
    getProducts,
    getProduct, 
    updateProduct,
    deleteProduct
}