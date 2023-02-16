const {
  Card,
  validateCard,
  generateBusinessNumber,
} = require("../models/cards");

require("dotenv").config();

// Question 4

const createCard = async (req, res) => {
  // validate user input
  const { error } = validateCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // validate system
  // process
  const card = await new Card({
    ...req.body,
    bizImage:
      req.body.bizImage ||
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    bizNumber: await generateBusinessNumber(),
    user_id: req.user._id,
  }).save();

  // response
  res.send(card);
};

// Question 5

const findCardById = async (req, res) => {
  const card = await Card.findOne({
    _id: req.params.id,
    user_id: req.user._id,
  });

  if (!card) {
    res.status(404).send("No card found ");
    return;
  }
  res.send(card);
};

// Question 6

const updateCard = async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const updatedCard = await Card.findByIdAndUpdate(
    { _id: req.params.id, user_id: req.user._id },
    {
      ...req.body,
      bizImage:
        req.body.bizImage ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    { new: true }
  );
  if (!updateCard) {
    res.status(404).send("No card found ");
    return;
  }
  res.send(updatedCard);
};

// Question 7

const deleteCard = async (req, res) => {
  const deletedCard = await Card.findByIdAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!deletedCard) {
    res.status(404).send("No card found ");
    return;
  }
  res.send(deletedCard);
};

// Question 8

const getAllCards = async (req, res) => {
  if (!req.user.biz) {
    res.status(401).send("Access denied");
    return;
  }
  const cards = await Card.find({ user_id: req.user._id });
  res.send(cards);
};

module.exports = {
  createCard,
  findCardById,
  updateCard,
  deleteCard,
  getAllCards,
};
