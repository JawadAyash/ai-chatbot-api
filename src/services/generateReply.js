const openai = require("../config/openai");

const generateReply = async (message, intent) => {
  const prompt = `
You are a helpful customer support assistant.

Intent: ${intent}
User message: ${message}

Generate a clear, short, and helpful reply.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0].message.content.trim();
};

module.exports = generateReply;