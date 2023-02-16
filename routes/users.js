const bcrypt = require("bcrypt");
const _ = require("lodash");

const express = require("express");
const router = express.Router();

const authMW = require("../middleware/auth");

const { User, validateUser } = require("../models/users");

// Question 1

router.post("/", async (req, res) => {
  // validate users input
  const { error } = validateUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // validate system requirements
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send("User already registered");
    return;
  }

  // process
  user = await new User({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 12),
  }).save();

  // response
  res.send(_.pick(user, ["_id", "name", "email", "biz"]));
});

// Question 3

router.get("/me", authMW, async (req, res) => {
  const user = await User.findById(req.user._id, { password: 0 });
  res.send(user);
});

module.exports = router;
