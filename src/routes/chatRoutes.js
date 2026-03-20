const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  sendMessage,
  getConversation,
} = require("../controllers/chatController");


// Send message to chatbot (protected)
router.post("/", authMiddleware, sendMessage);


// Get conversation history (protected)
router.get("/:id", authMiddleware, getConversation);


module.exports = router;