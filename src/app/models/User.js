/* eslint-disable func-names */
/* eslint-disable consistent-return */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: false,
    required: true,
  },
  phone: {
    type: String,
    unique: false,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
