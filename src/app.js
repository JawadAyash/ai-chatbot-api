const express = require("express");
const cors = require("cors");
const knowledgeRoutes = require("./routes/knowledgeRoutes");

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/knowledge", knowledgeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "AI Chatbot API is running" });
});

module.exports = app;