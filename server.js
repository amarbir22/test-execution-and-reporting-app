const path = require('path');
const express = require('express');
const httpProxy = require('http-proxy');
const API_HOST = process.env.API_HOST || 'localhost:5000';
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// create a GET route
app.get('/api/alive', (req, res) => {
  res.send({ express: 'Hi from backend api :)' });
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
