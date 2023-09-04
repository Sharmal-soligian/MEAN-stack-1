const express = require('express');
const cors = require('cors');
const apiRotes = require('./server/routes/api.routes');

// Config setting
require('dotenv').config();

// DB setting
require('./server/config/db');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/', apiRotes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});