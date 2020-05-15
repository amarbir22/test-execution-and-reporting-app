
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const csv = require('csvtojson/v2');
const { validationResult, check, param } = require('express-validator');
const dynamoDb = require('../../libs/dynamodb-lib');
const s3 = require('../../libs/s3-lib');

const Report = require('../../models/Report');
const JsonReport = require('../../models/JsonReport');
const { maxFileSizeInBytes } = require('../../contants/contants');

const router = express.Router();


// create a GET route
router.get('/', async (req, res) => {
  try {
    const reports = await dynamoDb.query(
      {
        TableName: process.env.TABLE_NAME,
        IndexName: 'SK-PK-index',
        KeyConditionExpression: 'SK = :sk',
        ExpressionAttributeValues: {
          ':sk': 'REPORT'
        }
      }
    );

    return setTimeout(() => res.status(200)
      .send({
        reports: reports.Items,
        message: 'Successfully retrieved all reports'
      }), 0);
  } catch (err) {
    return res.status(500)
      .send({ errorMessage: `Server side error ${err.message}` });
  }
});

// GET jsonReport based on report id
// router.get('/jsonReport/:id',
//   [
//     param('id', 'id must be a UUID')
//       .matches(/^[0-9a-fA-F]{24}$/)
//   ], async (req, res) => {
//     try {
//       const jsonReport = await JsonReport.findOne({ report: req.params.id })
//         .populate('report');
//
//       return res.status(200)
//         .send({
//           jsonReport: (jsonReport) || undefined,
//           message: 'Successfully retrieved jsonReport'
//         });
//     } catch (err) {
//       return res.status(500)
//         .send({ errorMessage: `Server side error ${err.message}` });
//     }
//   });

// GET jsonReports based on report ids
router.post('/jsonReports', async (req, res) => {
  try {
    const { ids } = req.body;

    const Keys = ids.map((id) => ({
      PK: id,
      SK: 'PERF_CSV'
    }));

    const params = {
      RequestItems: {
        [process.env.TABLE_NAME]: {
          Keys
        }
      }
    };
    console.log('ids', ids);
    const dbResult = await dynamoDb.batchGet(params);
    const jsonReports = dbResult.Responses[process.env.TABLE_NAME];

    return res.status(200)
      .send({
        jsonReports,
        message: 'Successfully retrieved jsonReports'
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
  check('testEnvZone', 'is required')
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
    teamName, appName, testType, testEnvName, testEnvZone,
    executionDate, executionTime, isAutomated, testToolName, testingToolVersion, testNotes, force
  } = req.body;
  const id = uuidv4();
  let hasReportCsv = false;
  let reportFilePath;

  try {
    // Similar Report Check
    if (!force) {
      const existingReport = await dynamoDb.query(
        {
          TableName: process.env.TABLE_NAME,
          IndexName: 'SK-PK-index',
          KeyConditionExpression: 'SK = :sk',
          FilterExpression: 'teamName = :TeamName AND appName = :AppName AND testType = :TestType '
            + 'AND executionDate = :ExecutionDate AND executionTime = :ExecutionTime '
            + 'AND testEnvName = :TestEnvName AND testEnvZone = :TestEnvZone',
          ExpressionAttributeValues: {
            ':sk': 'REPORT',
            ':TestType': testType,
            ':AppName': appName,
            ':TeamName': teamName,
            ':ExecutionDate': executionDate,
            ':ExecutionTime': executionTime,
            ':TestEnvName': testEnvName,
            ':TestEnvZone': testEnvZone
          }
        }
      );

      if (existingReport.Count !== 0) {
        return res.status(400)
          .send({
            errorMessage: 'Similar report found. Submit request with \'force: true\' in payload',
            reports: existingReport.Items
          });
      }
    }
  } catch (err) {
    console.error({ errorMessage: err.message });
    return res.status(500)
      .send({ errorMessage: `Server error while querying into db. - ${err.message}` });
  }

  // Verify report file only if provided by user. As it is optional
  const file = req.files && req.files.file;
  if (file && file.name) {
    const filename = file.name;
    const fileExt = filename.split('.')[1];
    let jsonReport;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400)
        .send({ errorMessage: 'Did you forget to attach the file ?' });
    }

    if (file.size > maxFileSizeInBytes) {
      return res.status(400)
        .send({ errorMessage: `Maximum file size supported is ${maxFileSizeInBytes}B and you provided ${file.size}B` });
    }

    // Save the JMeter report as separate item
    try {
      if (fileExt === 'csv') {
        const csvData = file.data.toString('utf8');
        jsonReport = await csv()
          .fromString(csvData);

        if (!Object.keys(jsonReport[0])
          .join(',')
          .toLowerCase()
          .includes('label')) {
          return res.status(400)
            .send({ errorMessage: 'We only accept JMeter report in csv format' });
        }
        await dynamoDb.put({
          TableName: process.env.TABLE_NAME,
          Item: {
            PK: `${id}`,
            SK: 'PERF_CSV',
            metaData: {
              fileExt,
              filename,
              fileSize: file.size,
              contentType: file.mimetype
            },
            content: jsonReport
          }
        }).then(() => {
          hasReportCsv = true;
        });
      } else {
        await s3.upload({
          Bucket: process.env.BUCKET_NAME,
          Key: `${id}/${filename}`, // file will be saved as testBucket/contacts.csv
          Body: file.data
        }).then(() => {
          reportFilePath = `${id}/${filename}`;
        });
      }
    } catch (err) {
      if (err) {
        return res.status(500)
          .send({ errorMessage: `We have problem saving your performance report. ${err.message}` });
      }
    }
  }

  try {
    const timestamp = new Date().toISOString();
    const params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        PK: id,
        SK: 'REPORT',
        createTime: timestamp,
        id,
        teamName,
        appName,
        testType,
        testEnvZone,
        testEnvName,
        executionDate,
        executionTime,
        reportFilePath,
        hasReportCsv,
        isAutomated,
        testTool: (testToolName) ? {
          name: testToolName,
          version: testingToolVersion || undefined
        } : undefined,
        testNotes
      }
    };

    await dynamoDb.put(params);
    return setTimeout(() => res.status(200)
      .send({
        ...params.Item,
        message: 'Report saved into db'
      }), 0);
  } catch (err) {
    console.error({ errorMessage: err.message });
    return res.status(500)
      .send({ errorMessage: `Server error while saving into db. - ${err.message}` });
  }
});

// GET jsonReport based on report id
router.get('/jsonReport/:id',
  [
    param('id', 'id must be a UUID')
      .matches(/^[0-9a-fA-F]{24}$/)
  ], async (req, res) => {
    try {
      const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
          PK: req.params.id,
          SK: 'PERF_CSV'
        }
      };
      const jsonReport = await dynamoDb.get(params);

      return res.status(200)
        .send({
          jsonReport: jsonReport.Item,
          message: (jsonReport.Item) ? 'Successfully retrieved jsonReport' : `Report not found with id ${params.Key.PK}`
        });
    } catch (err) {
      return res.status(500)
        .send({ errorMessage: `Server side error ${err.message}` });
    }
  });

// DELETE report and associated report file
router.delete('/:id',
  [
    param('id', 'id must be a UUID')
      .matches(/^[0-9a-fA-F]{24}$/)
  ],
  async (req, res) => {
    const { id } = req.params;
    try {
      const existingReports = await dynamoDb.query(
        {
          TableName: process.env.TABLE_NAME,
          KeyConditionExpression: 'PK = :id',
          ExpressionAttributeValues: {
            ':id': id
          }
        }
      );

      if (existingReports.Items.length === 0) {
        return res.status(404)
          .send({ errorMessage: `Report not found with ID:  ${req.params.id}` });
      }

      // Delete each Item
      await existingReports.Items.map(async (report) => {
        const params = {
          TableName: process.env.TABLE_NAME,
          Key: {
            PK: req.params.id,
            SK: report.SK
          }
        };
        await dynamoDb.delete(params);

        if (report.reportFilePath) {
          await s3.delete({
            Bucket: process.env.BUCKET_NAME,
            Key: report.reportFilePath
          });
        }
      });


      return res.status(200)
        .send({
          message: 'Successfully deleted report',
          report: {
            id
          }
        });
    } catch (err) {
      return res.status(500)
        .send({ errorMessage: `Server side error ${err.message}` });
    }
  });

module.exports = router;
