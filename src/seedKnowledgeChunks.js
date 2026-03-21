const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const KnowledgeChunk = require("./models/KnowledgeChunk");

const splitIntoChunks = (text, maxLength = 120) => {
  const sentences = text.split(". ").map((s) => s.trim()).filter(Boolean);

  const chunks = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    const candidate = currentChunk
      ? `${currentChunk}. ${sentence}`
      : sentence;

    if (candidate.length <= maxLength) {
      currentChunk = candidate;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = sentence;
    }
  }

  if (currentChunk) chunks.push(currentChunk);

  return chunks;
};

const knowledgeDocs = [
  {
    title: "Refund Policy",
    content:
      "Customers can request a refund within 14 days of purchase. The product must not be used. Refund approval depends on eligibility under company policy. Processing may take several business days.",
    tags: ["refund", "policy", "returns"],
  },
  {
    title: "Order Status Help",
    content:
      "Customers asking about order status should provide their order ID. Delivery usually takes 3 to 5 business days. Delays may happen during holidays or peak periods.",
    tags: ["order", "status", "delivery"],
  },
  {
    title: "Complaint Handling",
    content:
      "When a customer files a complaint, apologize clearly. Acknowledge the frustration. Offer escalation to a human support agent when appropriate. Stay calm and professional.",
    tags: ["complaint", "support", "escalation"],
  },
];

const seedKnowledgeChunks = async () => {
  try {
    await connectDB();

    await KnowledgeChunk.deleteMany();

    const allChunks = [];

    knowledgeDocs.forEach((doc) => {
      const chunks = splitIntoChunks(doc.content);

      chunks.forEach((chunk, index) => {
        allChunks.push({
          sourceTitle: doc.title,
          content: chunk,
          tags: doc.tags,
          chunkIndex: index,
        });
      });
    });

    await KnowledgeChunk.insertMany(allChunks);

    console.log("Knowledge chunks seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Chunk seeding failed:", error.message);
    process.exit(1);
  }
};

seedKnowledgeChunks();