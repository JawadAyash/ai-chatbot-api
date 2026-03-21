const KnowledgeChunk = require("../models/KnowledgeChunk");
const generateEmbedding = require("../services/generateEmbedding");

exports.getAllKnowledge = async (req, res) => {
  try {
    const chunks = await KnowledgeChunk.find().sort({
      sourceTitle: 1,
      chunkIndex: 1,
    });

    res.json(chunks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createKnowledge = async (req, res) => {
  try {
    const { sourceTitle, content, tags = [], chunkIndex = 0 } = req.body;

    if (!sourceTitle || !content) {
      return res
        .status(400)
        .json({ message: "sourceTitle and content are required" });
    }

    const embedding = await generateEmbedding(`${sourceTitle}\n${content}`);

    const chunk = await KnowledgeChunk.create({
      sourceTitle,
      content,
      tags,
      chunkIndex,
      embedding,
    });

    res.status(201).json(chunk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateKnowledge = async (req, res) => {
  try {
    const { id } = req.params;
    const { sourceTitle, content, tags, chunkIndex } = req.body;

    const chunk = await KnowledgeChunk.findById(id);

    if (!chunk) {
      return res.status(404).json({ message: "Knowledge chunk not found" });
    }

    if (sourceTitle !== undefined) chunk.sourceTitle = sourceTitle;
    if (content !== undefined) chunk.content = content;
    if (tags !== undefined) chunk.tags = tags;
    if (chunkIndex !== undefined) chunk.chunkIndex = chunkIndex;

    const embedding = await generateEmbedding(
      `${chunk.sourceTitle}\n${chunk.content}`
    );
    chunk.embedding = embedding;

    await chunk.save();

    res.json(chunk);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteKnowledge = async (req, res) => {
  try {
    const { id } = req.params;

    const chunk = await KnowledgeChunk.findByIdAndDelete(id);

    if (!chunk) {
      return res.status(404).json({ message: "Knowledge chunk not found" });
    }

    res.json({ message: "Knowledge chunk deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};