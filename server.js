const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const fileUpload = require('express-fileupload');


const PORT = process.env.PORT || 5000;
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

/**
 * Used to upload any file to public dir
 */
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400)
      .send({ errorMessage: 'Did you forget to attach the file ?' });
  }

  const file = req.files && req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      return res.status(500)
        .send({ errorMessage: 'Server side error while writing file' });
    }

    return res.status(200)
      .send({
        fileName: file.name,
        filePath: `/uploads/${file.name}`
      });
  });
  // TODO: getting a weird error when putting a return statement here.
});

// Define Routes
app.use('/report', require('./backend/routes/api/report'));


// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
