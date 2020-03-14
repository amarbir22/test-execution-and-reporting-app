const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeamSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  teamName: {
    type: Schema.Types.String,
    required: true
  },
  teamApps: [
    {
      appName: {
        type: Schema.Types.String,
        required: true
      },
      appID: {
        type: Schema.Types.String,
        required: true
      }
    }
  ],
  teamEmail: {
    type: Schema.Types.String,
    required: true
  }
});

module.exports = Team = mongoose.model('Team', TeamSchema);
