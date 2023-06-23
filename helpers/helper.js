const { log } = require('console')
const fs = require('fs')

const newDate = () => new Date().toString()

// check if row exists with provided ID
function mustBeInArray(array, id) {
    return new Promise((resolve, reject) => {
        if(array.length === 0){
            reject({
                message: 'not record found',
                status: 404
            })
        }
        const row = array.find(r => r.productId === parseInt(id))
        if (!row) {
            reject({
                message: 'not found',
                status: 404
            })
        }
        resolve(row)
    })
}
// write data to JSON file
function writeJSONFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}
module.exports = {
    newDate,
    mustBeInArray,
    writeJSONFile
}