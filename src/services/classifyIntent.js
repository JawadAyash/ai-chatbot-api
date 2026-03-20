const openai = require("../config/openai");

const classifyIntent = async (message) => {
  const prompt = `
Classify the user message into one of these intents:

- refund
- order_status
- complaint
- general_question
- greeting

Message: "${message}"

Return only the intent name.
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

module.exports = classifyIntent;