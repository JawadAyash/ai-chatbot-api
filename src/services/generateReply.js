const openai = require("../config/openai");
const Message = require("../models/Message");

const generateReply = async (message, intent, conversationId) => {
  const history = await Message.find({
    conversation: conversationId,
  })
    .sort({ createdAt: 1 })
    .limit(10);

  const systemPrompt = `
You are a professional AI customer support assistant.

Your job is to help users clearly and politely.

Rules:
- Be polite, professional, and concise
- Give clear and helpful answers
- If the user is angry or frustrated, respond calmly and empathetically
- If the intent is "complaint", apologize and try to help
- If the intent is "refund", explain the refund process clearly
- If the intent is "order_status", ask for the order ID if needed
- If the intent is "greeting", respond in a warm and friendly way
- If the request is unclear, ask a short clarifying question
- Do not invent company policies or order details
- Do not say you completed actions like refunds unless the system confirmed it
- Keep replies practical and easy to understand

Current intent: ${intent}
`;

  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
  ];

  history.forEach((msg) => {
    messages.push({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    });
  });

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