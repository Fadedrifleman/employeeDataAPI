// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

// Import main route
const main = require('./routes/main');

// Create an instance of the Express application
const app = express();

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount the main route at /api/v1
app.use('/api/v1', main);

// Set the port to listen on
const port = process.env.PORT;

// Start the db and server
db.sequelize.sync().then((req) => {
	app.listen(port, () => console.log(`server running at port: ${port}`));
});
