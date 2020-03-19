const express = require('express');
const csv = require('csvtojson/v2');
const { validationResult, check } = require('express-validator');

const Report = require('../../models/Report');
const validFileExt = require('../../contants/validFileExt');


const router = express.Router();

// create a GET route
router.get('/', async (req, res) => {
  try {
    const allReports = await Report.find();

    return setTimeout(() => res.status(200)
      .send({
        reports: allReports,
        message: 'Successfully retrieved all reports'
      }), 0);
  } catch (err) {
    return res.status(500)
      .send({ errorMessage: `Server side error ${err.message}` });
  }
});

router.post('/', [
  check('teamName', 'is required')
    .exists(),
  check('appName', 'is required')
    .exists(),
  check('testType', 'is required')
    .exists(),
  check('testEnvName', 'is required')
    .exists(),
  check('isAutomated', 'is required')
    .toBoolean(),
  check('testingToolName', 'must be a string')
    .optional()
    .isString(),
  check('testingToolVersion', 'must be a string')
    .optional()
    .isString(),
  check('clientFilename', 'must be a string')
    .optional()
    .isString(),
  check('testNotes', 'must be a string')
    .optional()
    .isString()
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400)
      .json({ errors: errors.array() });
  }
  const {
    teamName, appName, testType, testEnvName, testEnvZone, clientFilename,
    executionDate, executionTime, isAutomated, testingToolName, testingToolVersion, testNotes
  } = req.body;

  /**
     * 1. input validation - done
     * 2. validate file -
     *    check if file is passed
     *    check sise anything latger than 5mb is rejected
     *    check file type
     *    check tool type
     *    check if content is valid. Currently only jmeter csv file
     * 3. save file locally
     * 4. translate file to json
     * 5. save report to DB
     */

  const reportPayload = {
    metaData: {
      teamName,
      appName,
      testType,
      testEnvZone,
      testEnvName,
      executionDate,
      executionTime,
      isAutomated,
      testingTool: (testingToolName) ? {
        name: testingToolName,
        version: (testingToolVersion) || undefined
      } : undefined
    },
    testNotes
  };

  // Verify report file only if provided by user. As it is optional
  if (clientFilename) {
    const fileExt = clientFilename.split('.')[1];
    const reportFile = {
      metaData: {},
      translatedFile: {
        metaData: {}
      }
    };

    if (!validFileExt.includes(fileExt)) {
      return res.status(400)
        .send({ errorMessage: `Invalid file type. Supported file types are:  ${validFileExt}` });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400)
        .send({ errorMessage: 'Did you forget to attach the file ?' });
    }
    // TODO Save jsonReport as seperate object on DB
    let jsonReport = [];
    const file = req.files && req.files.file;
    try {
      const csvData = file.data.toString('utf8');
      jsonReport = await csv()
        .fromString(csvData);

      if (!Object.keys(jsonReport[0])
        .join(',')
        .toLowerCase()
        .includes('label')) {
        return res.status(400)
          .send({ errorMessage: 'We only accept Jmeter report in csv format' });
      }
    } catch (err) {
      if (err) {
        return res.status(500)
          .send({ errorMessage: `We have a problem with translating your report file. ${err.message}` });
      }
    }
    reportFile.metaData.contentType = fileExt;
    reportFile.metaData.clientFilename = clientFilename;
    reportFile.translatedFile.metaData.contentType = 'application/json';
    reportFile.translatedFile.content = jsonReport;
    reportPayload.reportFile = reportFile;
  }

  const newReport = Report(reportPayload);
  try {
    const existingReport = await Report.findOne(
      {
        'metaData.teamName': reportPayload.metaData.teamName,
        'metaData.appName': reportPayload.metaData.appName,
        'metaData.testType': reportPayload.metaData.testType,
        'metaData.testEnvZone': reportPayload.metaData.testEnvZone,
        'metaData.testEnvName': reportPayload.metaData.testEnvName,
        'metaData.executionDate': reportPayload.metaData.executionDate,
        'metaData.executionTime': reportPayload.metaData.executionTime
      }
    );

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
