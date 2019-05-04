/* eslint-disable func-names */
/* eslint-disable consistent-return */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
