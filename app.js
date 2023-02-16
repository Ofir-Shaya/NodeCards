require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("connected to mongoDB"))
  .catch(() => console.log("could not connect to mongoDB"));

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const cardsRouter = require("./routes/cards");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/cards", cardsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
