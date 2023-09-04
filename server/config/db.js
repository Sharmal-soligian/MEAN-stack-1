const mongoose = require('mongoose');
const mongoDB_url = process.env.MongoDB_url;

// Connect to db
mongoose.connect(mongoDB_url);

// Ensure connection
mongoose.connection.on('connected', () => {
    console.log('Connected to Database');
});

mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to database: ' + err);
});