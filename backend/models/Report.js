const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReportSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  metaData: {
    teamName: {
      type: String,
      required: true
    },
    appName: {
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
    isAutomated: {
      type: Boolean,
      required: true
    },
    testingTool: {
      name: {
        type: String
      },
      version: {
        type: String
      }
    }
  },
  reportFile: {
    metaData: {
      contentType: {
        type: String
      },
      clientFilename: {
        type: String
      },
      serverFilename: {
        type: String
      },
      serverFilePath: {
        type: String
      }
    },
    jsonReport: {
      metaData: {
        contentType: {
          type: String
        }
      }
    }
  },
  testNotes: {
    type: String
  }
});

module.exports = Report = mongoose.model('report', ReportSchema);
