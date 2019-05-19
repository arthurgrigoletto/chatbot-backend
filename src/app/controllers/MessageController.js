/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

const WAService = require('../services/WatsonAssistantService');
const MessageService = require('../services/MessageService');
const Message = require('../models/Messages');

class MessageController {
  async sendMessage(req, res) {
    const { text } = req.body;

    const messages = await Message.find({ 'context.user._id': req.user._id });

    const contextSendToAssistant = MessageService.buildContext(messages, req.user);

    const response = await WAService.sendMessage(text, contextSendToAssistant);

    const message = await Message.create(response);

    const outputMessage = MessageService.buildResponseMessage(message._doc);

    res.json(outputMessage);
  }

  async listMessages(req, res) {
    const { _id } = req.user;

    const messages = await Message.find({ 'context.user._id': _id });

    res.json(messages);
  }
}

module.exports = new MessageController();
