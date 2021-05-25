const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to the database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

const app = express();
const server = require("http").createServer(app);

server.listen(process.env.PORT, function () {
  console.log("App is running on port: " + process.env.PORT);
});
