const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const classifyIntent = require("../services/classifyIntent");
const generateReply = require("../services/generateReply");

exports.sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }

    let conversation;

    // create or use existing conversation
    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    } else {
      conversation = await Conversation.create({
        user: req.userId,
      });
    }

    // classify intent
    const intent = await classifyIntent(message);

    // escalation rule
    let escalated = false;

    if (intent === "complaint") {
      escalated = true;
      conversation.escalated = true;
      await conversation.save();
    }

    // save user message
    await Message.create({
      conversation: conversation._id,
      sender: "user",
      text: message,
      intent,
    });

    // generate reply
    const reply = await generateReply(message, intent);

    // save bot message
    await Message.create({
      conversation: conversation._id,
      sender: "bot",
      text: reply,
    });

    res.json({
      conversationId: conversation._id,
      intent,
      reply,
      escalated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getConversation = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await Message.find({
      conversation: id,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};