const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const KnowledgeChunk = require("./models/KnowledgeChunk");
const generateEmbedding = require("./services/generateEmbedding");

const embedKnowledgeChunks = async () => {
  try {
    await connectDB();

    const chunks = await KnowledgeChunk.find();

    for (const chunk of chunks) {
      const textToEmbed = `${chunk.sourceTitle}\n${chunk.content}`;
      const embedding = await generateEmbedding(textToEmbed);

      chunk.embedding = embedding;
      await chunk.save();

      console.log(`Embedded chunk: ${chunk.sourceTitle} #${chunk.chunkIndex}`);
    }

    console.log("All chunk embeddings generated successfully");
    process.exit();
  } catch (error) {
    console.error("Embedding failed:", error.message);
    process.exit(1);
  }
};

embedKnowledgeChunks();