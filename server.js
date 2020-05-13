const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 5000;
// Constants
const HOST = '0.0.0.0';
require('dotenv')
  .config();

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(fileUpload());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// create a GET route
app.get('/alive', (req, res) => {
  res.send({ express: 'Hi from backend api :)' });
});

// Define Routes
app.use('/report', require('./backend/routes/api/report'));
app.use('/team', require('./backend/routes/api/team'));


// eslint-disable-next-line no-console
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
