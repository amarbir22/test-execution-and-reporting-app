const express = require('express');
const Report = require('../../models/Report');


const router = express.Router();

// create a GET route
router.get('/', (req, res) => res.status(200)
  .send('reached report api'));

router.post('/', async (req, res) => {
  const {
    reportUUID, applicationId, testType, testEnvName, testEnvZone, clientFilename, executionDate,
    executionTime
  } = req.body;


  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400)
      .send({ errorMessage: 'Did you forget to attach the file ?' });
  }

  const file = req.files && req.files.file;
  const path = `${__dirname}/../../../client/public/uploads/${file.name}`;
  const serverFilename = [
    applicationId,
    testType,
    testEnvZone,
    testEnvName,
    executionDate,
    reportUUID.substr(reportUUID.lastIndexOf('-') + 1)
  ].join('_');

  const newReport = Report({
    reportUUID,
    reportData: {
      applicationId,
      testType,
      testEnvZone,
      testEnvName,
      executionDate,
      executionTime
    },
    fileData: {
      serverFilename,
      serverPath: `/public/uploads/${serverFilename}`,
      clientFilename
    }
  });

  try {
    const report = await newReport.save();

    return res.status(200)
      .send(report);
  } catch (err) {
    console.error(err.message);
    return res.status(500)
      .send('Server Error');
  }
});

module.exports = router;
