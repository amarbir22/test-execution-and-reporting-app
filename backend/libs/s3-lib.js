const AWS = require('aws-sdk');

const awsConfig = {
  region: 'us-east-1'
};

AWS.config.update(awsConfig);

const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

module.exports = {
  upload: (params) => s3.upload(params).promise(),
  getObject: (params) => s3.getObject(params).promise(),
  delete: (params) => s3.deleteObject(params).promise()
};
