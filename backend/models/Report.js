const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
  reportUUID: {
    type: Schema.Types.String,
    required: true
  },
  teamName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  reportData: {
    applicationId: {
      type: String,
      required: true
    },
    testType: {
      type: String,
      required: true
    },
    testEnvZone: {
      type: String,
      required: true
    },
    testEnvName: {
      type: String,
      required: true
    },
    executionDate: {
      type: String,
      required: true
    },
    executionTime: {
      type: String,
      required: true
    },
    uploadedReport: {
      value: {
        type: JSON
      },
      contentType: {
        type: String
      },
      uploadedContentType: {
        type: String
      }
    }
  },
  fileData: {
    serverFilename: {
      type: String
    },
    clientFilename: {
      type: String
    },
    serverPath: {
      type: String
    },
    required: false
  }

});

module.exports = Report = mongoose.model('Report', ReportSchema);
