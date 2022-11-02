require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");
// const Auth = require("./Module/authModule");

// const app = express()

mongoose
  .connect(process.env.MONGO_STR.replace("<PASSWORD>", process.env.MONGO_PASS))
  .then((con) => console.log("Mongodb connected")).catch((err) => console.log(err.message));

// server listner
app.listen(3000, () => {
  console.log(`Server Listen on 3000`)//${process.env.PORT}`);
});