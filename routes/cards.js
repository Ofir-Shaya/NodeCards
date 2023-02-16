const express = require("express");
const router = express.Router();
const authMW = require("../middleware/auth");
const {
  createCard,
  findCardById,
  updateCard,
  deleteCard,
  getAllCards,
} = require("../services/cardsService");

router.post("/", authMW, createCard); // Question 4
router.get("/:id", authMW, findCardById); // Question 5
router.put("/:id", authMW, updateCard); // Question 6
router.delete("/:id", authMW, deleteCard); // Question 7
router.get("/my_cards", authMW, getAllCards); // Question 8

module.exports = router;
