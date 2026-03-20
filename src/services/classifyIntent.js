const openai = require("../config/openai");

const classifyIntent = async (message) => {
  const prompt = `
You are an intent classifier.

Possible intents:
- refund
- order_status
- complaint
- greeting
- general

Return ONLY JSON in this format:
{ "intent": "refund" }

Message:
"${message}"
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
  });

  const text = response.choices[0].message.content;

  try {
    const json = JSON.parse(text);
    return json.intent;
  } catch (err) {
    console.log("Intent parse error:", text);
    return "general";
  }
};

module.exports = classifyIntent;