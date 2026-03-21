const KnowledgeChunk = require("../models/KnowledgeChunk");

const retrieveChunkContext = async (message) => {
  const words = message
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  if (words.length === 0) {
    return [];
  }

  const regexPattern = words.join("|");

  const query = {
    $or: [
      { sourceTitle: { $regex: regexPattern, $options: "i" } },
      { content: { $regex: regexPattern, $options: "i" } },
      { tags: { $in: words } },
    ],
  };

  const chunks = await KnowledgeChunk.find(query).limit(5);

  return chunks;
};

module.exports = retrieveChunkContext;