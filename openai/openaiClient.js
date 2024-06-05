const axios = require('axios');

class OpenAIClient
{
  constructor(apiKey)
  {
    if (!OpenAIClient.instance)
    {
      this.apiKey = apiKey;
      this.apiUrl = 'https://api.openai.com/v1/chat/completions';
      this.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      };
      OpenAIClient.instance = this;
    }
    return OpenAIClient.instance;
  }

  async generateResponse(messages, maxTokens = 500)
  {
    const data = {
      model: 'gpt-4o',
      messages: messages,
      max_tokens: maxTokens
    };

    try
    {
      const response = await axios.post(this.apiUrl, data, { headers: this.headers });
      return response.data;
    }
    catch (error)
    {
      console.error('Error generating response:', error);
      throw error;
    }
  }
}

const instance = new OpenAIClient(process.env.OPENAITOKEN);
Object.freeze(instance);

module.exports = instance;
