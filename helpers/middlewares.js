// check before to continue if the id is an integer. Using when we need to get the id (Read One, Update and Delete).
function mustBeInteger(req, res, next) {
    const id = req.params.id
    if (!Number.isInteger(parseInt(id))) {
        res.status(400).json({ message: 'ID must be an integer' })
    } else {
        next()
    }
}

// check before to continue if data attributes are all exist
function checkFields(req, res, next) {
    const { productId, productName, productOwnerName, developers, scrumMasterName, startDate , methodology, location } = req.body
    if (productId, productName, productOwnerName, developers, scrumMasterName, startDate , methodology, location) {
        next()
    } else {
        res.status(400).json({ message: 'the value(s) is/are invalid' })
    }
}
module.exports = {
    mustBeInteger,
    checkFields
}