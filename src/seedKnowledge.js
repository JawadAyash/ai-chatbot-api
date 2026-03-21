const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const KnowledgeBase = require("./models/KnowledgeBase");

const seedKnowledge = async () => {
  try {
    await connectDB();

    await KnowledgeBase.deleteMany();

    await KnowledgeBase.insertMany([
      {
        title: "Refund Policy",
        content:
          "Customers can request a refund within 14 days of purchase if the product has not been used and the order is eligible under company policy.",
        tags: ["refund", "policy", "returns"],
      },
      {
        title: "Order Status Help",
        content:
          "Customers asking about order status should be asked for their order ID. Delivery usually takes 3 to 5 business days.",
        tags: ["order", "status", "delivery"],
      },
      {
        title: "Complaint Handling",
        content:
          "When a customer files a complaint, apologize clearly, acknowledge the frustration, and offer escalation to a human support agent when appropriate.",
        tags: ["complaint", "support", "escalation"],
      },
    ]);

    console.log("Knowledge base seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedKnowledge();