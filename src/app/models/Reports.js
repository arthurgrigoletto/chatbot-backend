const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ReportSchema = mongoose.Schema({
  user: {
    _id: String,
  },
  input: String,
  output: String,
  is_correct: Boolean,
  count: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

mongoose.plugin(mongoosePaginate);

module.exports = mongoose.model('Report', ReportSchema);
