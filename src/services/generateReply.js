const openai = require("../config/openai");
const Message = require("../models/Message");

const generateReply = async (message, intent, conversationId) => {
  // get last messages
  const history = await Message.find({
    conversation: conversationId,
  })
    .sort({ createdAt: 1 })
    .limit(10);

  const messages = [
    {
  role: "system",
  content: `You are a customer support AI.
Intent: ${intent}
Respond professionally.`,
}
  ];

  // add history
  history.forEach((msg) => {
    messages.push({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    });
  });

  // add new message
  messages.push({
    role: "user",
    content: message,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
  });

  return response.choices[0].message.content.trim();
};

module.exports = generateReply;