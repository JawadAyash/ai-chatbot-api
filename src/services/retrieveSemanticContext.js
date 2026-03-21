const KnowledgeChunk = require("../models/KnowledgeChunk");
const generateEmbedding = require("./generateEmbedding");
const cosineSimilarity = require("../utils/cosineSimilarity");

const retrieveSemanticContext = async (message) => {
  const queryEmbedding = await generateEmbedding(message);

  const chunks = await KnowledgeChunk.find({
    embedding: { $exists: true, $ne: [] },
  });

  const scoredChunks = chunks.map((chunk) => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scoredChunks.sort((a, b) => b.score - a.score);

  return scoredChunks.slice(0, 5).map((item) => item.chunk);
};

module.exports = retrieveSemanticContext;