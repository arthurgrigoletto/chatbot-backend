/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

const services = require('../services');
const Message = require('../models/Messages');

const { WatsonAssistantService, MessageService } = services;

class MessageController {
  async sendMessage(req, res) {
    const { text } = req.body;

    const messages = await Message.find({ 'context.user._id': req.user._id });

    const contextSendToAssistant = MessageService.buildContext(messages, req.user);

    const response = await WatsonAssistantService.sendMessage(text, contextSendToAssistant);

    const responseToSave = {
      ...response,
      output: {
        text: response.output.text[0],
      },
    };

    const message = await Message.create(responseToSave);

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
