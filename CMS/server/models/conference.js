const mongoose = require('mongoose');

const ConferenceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: Date,
  venue: String,
  price: {type: Number, default:0}
}, { timestamps: true });

module.exports = mongoose.model('Conference', ConferenceSchema);
