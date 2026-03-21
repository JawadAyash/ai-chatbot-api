const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
  getAllKnowledge,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
} = require("../controllers/knowledgeController");

router.get("/", authMiddleware, adminMiddleware, getAllKnowledge);
router.post("/", authMiddleware, adminMiddleware, createKnowledge);
router.put("/:id", authMiddleware, adminMiddleware, updateKnowledge);
router.delete("/:id", authMiddleware, adminMiddleware, deleteKnowledge);

module.exports = router;