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

      if (context.user._id.toString() === req.user._id.toString()) {
        newContext = {
          ...context,
          user: req.user,
        };
      }
    } else {
      newContext = {
        user: req.user,
      };
    }

    const response = await WAService.sendMessage(text, newContext);

    const message = await Message.create(response);

    res.json(message);
  }

  async listMessages(req, res) {
    const { _id } = req.user;

    const messages = await Message.find({ 'context.user._id': _id });

    res.json(messages);
  }
}

module.exports = new MessageController();
