const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const classifyIntent = require("../services/classifyIntent");
const generateReply = require("../services/generateReply");
const retrieveContext = require("../services/retrieveContext");

exports.sendMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message required" });
    }

    let conversation;

    if (conversationId) {
      conversation = await Conversation.findById(conversationId);
    } else {
      conversation = await Conversation.create({
        user: req.userId,
      });
    }

    const intent = await classifyIntent(message);

    const retrievedDocs = await retrieveContext(message);

    let escalated = false;

    if (intent === "complaint" || intent === "refund") {
      escalated = true;
      conversation.escalated = true;
      await conversation.save();
    }

    await Message.create({
      conversation: conversation._id,
      sender: "user",
      text: message,
      intent,
    });

    const reply = await generateReply(
      message,
      intent,
      conversation._id,
      req.userRole || "user",
      retrievedDocs
    );

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

    const conversation = await Conversation.findById(id);

    if (!conversation) {
      return res.status(404).json({ message: "Not found" });
    }

    if (conversation.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const messages = await Message.find({
      conversation: id,
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};