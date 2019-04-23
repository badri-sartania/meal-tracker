// server.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");
const authorize = require("./authorize");
const userRoute = require("./user.route");
const meRoute = require("./me.route");
const mealRoute = require("./meal.route");
const usersRoute = require("./users.route");
const Role = require("./role");
const { logErrors, errorHandler } = require("./middleware/error");

mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    () => {
      console.log("Database is connected");
    },
    err => {
      console.log("Can not connect to the database" + err);
    }
  );

app.use(
  cors({
    exposedHeaders: ["X-Total-Count"]
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", userRoute);
app.use("/me", authorize([Role.Admin, Role.Manager, Role.User]), meRoute);
app.use("/meals", authorize([Role.Admin, Role.User]), mealRoute);
app.use("/users", authorize([Role.Admin, Role.Manager]), usersRoute);
// app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, function() {
  console.log("Server is running on Port:", PORT);
});
