const KnowledgeBase = require("../models/KnowledgeBase");

const retrieveContext = async (message) => {
  const words = message
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  if (words.length === 0) {
    return [];
  }

  const query = {
    $or: [
      { title: { $regex: words.join("|"), $options: "i" } },
      { content: { $regex: words.join("|"), $options: "i" } },
      { tags: { $in: words } },
    ],
  };

  const docs = await KnowledgeBase.find(query).limit(3);

  return docs;
};

module.exports = retrieveContext;