const openai = require("../config/openai");
const Message = require("../models/Message");

const generateReply = async (
  message,
  intent,
  conversationId,
  role = "user",
  retrievedDocs = []
) => {
  const history = await Message.find({
    conversation: conversationId,
  })
    .sort({ createdAt: 1 })
    .limit(10);

  const roleInstructions = {
    user: `
- Explain things simply
- Use customer-friendly language
- Focus on practical next steps
`,
    support: `
- Respond like an internal support assistant
- Be more structured and operational
- Include troubleshooting-style guidance when useful
`,
    admin: `
- Respond with more detailed and structured information
- Be concise but strategic
- Highlight process or policy implications when relevant
`,
  };

  const contextBlock =
    retrievedDocs.length > 0
      ? retrievedDocs
          .map(
            (doc, index) => `
[Document ${index + 1}]
Title: ${doc.title}
Content: ${doc.content}
`
          )
          .join("\n")
      : "No knowledge base context found.";

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
Current user role: ${role}

Role-specific behavior:
${roleInstructions[role] || roleInstructions.user}

Use the following knowledge base context when relevant:
${contextBlock}

If the knowledge base contains relevant information, prioritize it.
If no relevant context is found, respond normally without inventing facts.
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