/* eslint-disable class-methods-use-this */

const WAService = require('../services/WatsonAssistantService');
const Message = require('../models/Messages');

class MessageController {
  async sendMessage(req, res) {
    const { text, context, workspaceId } = req.body;

    const newContext = {
      ...context,
      user: req.user,
    };

    const response = await WAService.sendMessage(workspaceId, text, newContext);

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
