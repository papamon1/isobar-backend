const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./services/passport");
require("./models/model.posts");
require("./models/model.users");
require("./models/model.roles");

// Connect to the database
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

// import routes file
const userRoutes = require("./routes/route.users");
const postRoutes = require("./routes/route.posts");

const app = express();

app.use(bodyParser.json());

// use and map the routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

const server = require("http").createServer(app);

server.listen(process.env.PORT, function () {
  console.log("App is running on port: " + process.env.PORT);
});
