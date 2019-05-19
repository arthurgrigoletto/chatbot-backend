const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ReportSchema = mongoose.Schema({
  user: {
    _id: String,
  },
  input: String,
  output: String,
  isCorrect: Boolean,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model('Report', ReportSchema);
