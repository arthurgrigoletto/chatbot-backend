/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

class MessageService {
  buildContext(messages, user) {
    const { name } = user;
    const firstName = name.split(' ')[0];
    const lastName = name.split(' ')[1];

    let newContext = {};

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      const { context } = lastMessage;

      if (context.user._id.toString() === user._id.toString()) {
        newContext = {
          ...context,
          user,
          name,
          firstName,
          lastName,
        };
      }
    } else {
      newContext = {
        user,
        name,
        firstName,
        lastName,
      };
    }
    return newContext;
  }

  buildResponseMessage(responseFromAssistant) {
    const {
      output,
      context: { significant_message, finish_conversation, count },
    } = responseFromAssistant;

    return {
      output: {
        ...output,
        count,
        significant_message,
        finish_conversation,
      },
    };
  }
}

module.exports = new MessageService();
