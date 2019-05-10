const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  intents: [
    {
      intent: String,
      confidence: Number,
    },
  ],
  input: {
    text: {
      type: String,
    },
  },
  entities: [
    {
      entity: String,
      value: String,
      confidence: Number,
    },
  ],
  output: {
    text: {
      type: String,
    },
  },
  context: {
    user: {
      _id: String,
    },
    name: String,
    firstName: String,
    lastName: String,
    count: Number,
    conversation_id: String,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
