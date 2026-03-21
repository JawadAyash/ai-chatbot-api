const mongoose = require("mongoose");

const knowledgeChunkSchema = new mongoose.Schema(
  {
    sourceTitle: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    embedding: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KnowledgeChunk", knowledgeChunkSchema);