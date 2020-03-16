const express = require('express');
const csv = require('csvtojson/v2');

const Report = require('../../models/Report');
const validFileExt = require('../../contants/validFileExt');


const router = express.Router();

// create a GET route
router.get('/', async (req, res) => {
  try {
    const allReports = await Report.find();

    setTimeout(() => res.status(200)
      .send({
        reports: allReports,
        message: 'Successfully retrieved all reports'
      }), 0);
  } catch (err) {
    return res.status(500)
      .send({ errorMessage: `Server side error ${err.message}` });
  }
});

router.post('/', async (req, res) => {
  const {
    reportUUID, teamName, applicationId, testType, testEnvName, testEnvZone, clientFilename,
    executionDate, executionTime
  } = req.body;

  const fileExt = clientFilename.split('.')[1];

  if (!validFileExt.includes(fileExt)) {
    return res.status(400)
      .send({ errorMessage: `Invalid file type. Supported file types are:  ${validFileExt}` });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400)
      .send({ errorMessage: 'Did you forget to attach the file ?' });
  }

  const file = req.files && req.files.file;

  const serverFilename = [
    applicationId,
    testType,
    testEnvZone,
    testEnvName,
    executionDate,
    reportUUID.substr(reportUUID.lastIndexOf('-') + 1)
  ].join('_');

  const fileLocation = `${__dirname}/../../../client/public/uploads/${serverFilename}`;


  await file.mv(fileLocation, async (err) => {
    if (err) {
      return res.status(500)
        .send({ errorMessage: 'Server side error while writing file' });
    }
  });

  let jsonReport;
  try {
    jsonReport = await csv()
      .fromFile(fileLocation);

    if (!Object.keys(jsonReport[0])
      .join(',').toLowerCase().includes('label')) {
      console.log('my keys ', Object.keys(jsonReport[0]));
      return res.status(400)
        .send({ errorMessage: 'We only accept Jmeter report in csv format' });
    }
  } catch (err) {
    if (err) {
      return res.status(500)
        .send({ errorMessage: `We have a problem with translating your report file. ${err.message}` });
    }
  }

  const reportPayload = {
    reportUUID,
    teamName,
    reportData: {
      applicationId,
      testType,
      testEnvZone,
      testEnvName,
      executionDate,
      executionTime,
      uploadedReport: {
        value: jsonReport,
        contentType: 'json',
        uploadedContentType: fileExt
      }
    },
    fileData: {
      serverFilename,
      serverPath: `/public/uploads/${serverFilename}.${fileExt}`,
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

    return setTimeout(() => res.status(200)
      .send({
        report,
        message: 'Report saved into db'
      }), 0);
  } catch (err) {
    console.error({ errorMessage: err.message });
    return res.status(500)
      .send({ errorMessage: `Server error while saving into db. - ${err.message}` });
  }
});

module.exports = router;
