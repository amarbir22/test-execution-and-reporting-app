const express = require('express');
const csv = require('csvtojson/v2');
const { validationResult, check, param } = require('express-validator');
const Report = require('../../models/Report');
const JsonReport = require('../../models/JsonReport');
const constants = require('../../contants/contants');

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

// GET jsonReport based on report id
router.get('/jsonReport/:id', async (req, res) => {
  try {
    const jsonReport = await JsonReport.findOne({ report: req.params.id }).populate();

    return res.status(200)
      .send({
        jsonReport: (jsonReport) || undefined,
        message: 'Successfully retrieved jsonReport'
      });
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
    .exists()
    .toBoolean(),
  check('testToolName', 'must be a string')
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
    executionDate, executionTime, isAutomated, testToolName, testingToolVersion, testNotes
  } = req.body;
  const { validFileTypes, maxFileSizeInBytes } = constants;

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
      executionTime
    },
    isAutomated,
    testTool: (testToolName) ? {
      name: testToolName,
      version: testingToolVersion || undefined
    } : undefined,
    testNotes
  };
  const jsonReportPayload = {};

  // Verify report file only if provided by user. As it is optional
  if (clientFilename) {
    const fileExt = clientFilename.split('.')[1];
    const reportFile = {
      metaData: {},
      jsonReport: {
        metaData: {}
      }
    };

    if (!validFileTypes.includes(fileExt)) {
      return res.status(400)
        .send({ errorMessage: `Invalid file type. Supported file types are:  ${validFileTypes}` });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400)
        .send({ errorMessage: 'Did you forget to attach the file ?' });
    }
    let jsonReport = [];
    const file = req.files && req.files.file;

    if (file.size > maxFileSizeInBytes) {
      return res.status(400)
        .send({ errorMessage: `Maximum file size supported is ${maxFileSizeInBytes}B and you provided ${file.size}B` });
    }

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
    reportFile.jsonReport.metaData.contentType = 'application/json';
    reportPayload.reportFile = reportFile;
    jsonReportPayload.content = jsonReport;
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
    let jsonReport;
    if (clientFilename) {
      const newJsonReportPayload = {
        report: report._id,
        content: jsonReportPayload.content
      };
      const newJsonReport = JsonReport(newJsonReportPayload);
      jsonReport = await newJsonReport.save();
    }

    return setTimeout(() => res.status(200)
      .send({
        report,
        jsonReport,
        message: 'Report saved into db'
      }), 0);
  } catch (err) {
    console.error({ errorMessage: err.message });
    return res.status(500)
      .send({ errorMessage: `Server error while saving into db. - ${err.message}` });
  }
});

// DELETE report and assocated report file
router.delete('/:id',
  [
    param('id', 'id must be a UUID')
      .matches(/^[0-9a-fA-F]{24}$/)
  ],
  async (req, res) => {
    try {
      const report = await Report.findOneAndRemove({ _id: req.params.id });
      if (!report) {
        return res.status(404)
          .send({ errorMessage: `Report not found with ID:  ${req.params.id}` });
      }
      let jsonReport;
      let successMessage = 'Successfully deleted report';
      if (report.reportFile) {
        jsonReport = await JsonReport.findOneAndRemove({ report: { _id: req.params.id } });
        if (jsonReport) {
          successMessage = 'Successfully deleted report and associated report file';
        }
      }
      return res.status(200)
        .send({
          report: (report) || undefined,
          jsonReport,
          message: successMessage
        });
    } catch (err) {
      return res.status(500)
        .send({ errorMessage: `Server side error ${err.message}` });
    }
  });

module.exports = router;
