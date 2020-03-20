const mongoose = require('mongoose');

const { Schema } = mongoose;

const JsonReportSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  report: {
    type: Schema.Types.ObjectId,
    ref: 'report'
  },
  content: {
    type: JSON,
    required: true
  }
});

module.exports = JsonReport = mongoose.model('JsonReports', JsonReportSchema);
