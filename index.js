// Import packages
const express = require('express')
const cors = require("cors");
const morgan = require('morgan')

// App
const app = express()

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cors for local only
var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

// logger
app.use(morgan('tiny'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))

// Starting server
app.listen('8080')