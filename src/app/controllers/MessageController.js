/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

const WAService = require('../services/WatsonAssistantService');
const Message = require('../models/Messages');

class MessageController {
  async sendMessage(req, res) {
    const { text } = req.body;

    const messages = await Message.find({ 'context.user._id': req.user._id });

    let newContext = {};

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      const { context } = lastMessage;

      const { name } = req.user;
      const firstName = name.split(' ')[0];
      const lastName = name.split(' ')[1];

      if (context.user._id.toString() === req.user._id.toString()) {
        newContext = {
          ...context,
          user: req.user,
          name,
          firstName,
          lastName,
        };
      }
    } else {
      newContext = {
        user: req.user,
        name,
        firstName,
        lastName,
      };
    }

    const response = await WAService.sendMessage(text, newContext);

    const message = await Message.create(response);

    const {
      output,
      context: { significant_message },
    } = message;

    const newMessage = {
      ...message._doc,
      output: {
        ...output,
        significant_message,
      },
    };

    res.json(newMessage);
  }

  async listMessages(req, res) {
    const { _id } = req.user;

    const messages = await Message.find({ 'context.user._id': _id });

    res.json(messages);
  }
}

module.exports = new MessageController();
