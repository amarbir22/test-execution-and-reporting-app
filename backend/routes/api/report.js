const express = require('express');
const Report = require('../../models/Report');


const router = express.Router();

// create a GET route
router.get('/', async (req, res) => {
  try {
    const allReports = await Report.find();

    setTimeout(() => {
      return res.status(200)
        .send({
          reports: allReports,
          message: 'Successfully retrieved all reports'
        });
    }, 0);
  } catch (err) {
    return res.status(500)
      .send({ errorMessage: `Server side error ${err.message}` });
  }
});

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

  const reportPayload = {
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
  };

  const newReport = Report(reportPayload);

  try {
    const existingReport = await Report.findOne({ reportData: reportPayload.reportData });

    if (existingReport) {
      return res.status(400)
        .send({
          errorMessage: 'Duplicate report found',
          report: existingReport
        });
    }

    const report = await newReport.save();

    setTimeout(() => {
      return res.status(200)
        .send({
          report,
          message: 'Report saved into db'
        });
    }, 0);


  } catch (err) {
    console.error({ errorMessage: err.message });
    return res.status(500)
      .send({ errorMessage: `Server error while saving into db. - ${err.message}` });
  }
});

module.exports = router;
