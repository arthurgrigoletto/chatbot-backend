const AssistantV1 = require('watson-developer-cloud/assistant/v1');

class WAService {
  constructor() {
    this.assistant = new AssistantV1({
      version: process.env.WA_VERSION,
      iam_apikey: process.env.WA_APIKEY,
      url: process.env.WA_URL,
    });
  }

  async sendMessage(workspaceId, text, context) {
    const response = await this.assistant.message({
      workspace_id: workspaceId,
      input: { text },
      context,
    });

    return response;
  }
}

module.exports = new WAService();
