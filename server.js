const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const connectDB = require('./config/db');


const PORT = process.env.PORT || 5000;
// Constants
const HOST = process.env.HOST || '0.0.0.0';
require('dotenv')
  .config();

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(fileUpload());


// create a GET route
app.get('/api/alive', (req, res) => {
  res.send({ express: 'Hi from backend api :)' });
});

// Define Routes
app.use('/api/report', require('./backend/routes/api/report'));
app.use('/api/team', require('./backend/routes/api/team'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// eslint-disable-next-line no-console
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
