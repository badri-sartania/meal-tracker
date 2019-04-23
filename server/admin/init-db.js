// server.js

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config");
const Role = require("../role");
const User = require("../user.model");
const Meal = require("../meal.model");

const userJSONs = [
  {
    email: "admin@admin.com",
    password: "admin",
    fullname: "Ervin Howell",
    role: Role.Admin,
    goal: 1000
  },
  {
    email: "demo1@demo.com",
    password: "1234",
    fullname: "Patricia Lebsack",
    role: Role.Manager,
    goal: 800
  },
  {
    email: "demo2@demo.com",
    password: "1234",
    fullname: "Glenna Reichert",
    role: Role.User,
    goal: 1200
  },
  {
    email: "demo3@demo.com",
    password: "1234",
    fullname: "Kurtis Weissnat",
    role: Role.User,
    goal: 600
  }
];

const mealJSONs = [
  {
    name: "Breakfast",
    userIndex: 0,
    date: "2019-01-05",
    time: "07:00",
    calories: 400
  },
  {
    name: "Lunch",
    userIndex: 0,
    date: "2019-01-05",
    time: "13:00",
    calories: 400
  },
  {
    name: "Elevenses",
    userIndex: 0,
    date: "2019-01-06",
    time: "10:30",
    calories: 300
  },
  {
    name: "Banquet",
    userIndex: 0,
    date: "2019-01-06",
    time: "20:00",
    calories: 600
  },
  {
    name: "Pig roast",
    userIndex: 0,
    date: "2019-01-09",
    time: "14:00",
    calories: 700
  },
  {
    name: "Dinner",
    userIndex: 2,
    date: "2019-12-31",
    time: "19:00",
    calories: 600
  },
  {
    name: "Lunch",
    userIndex: 2,
    date: "2018-12-31",
    time: "13:00",
    calories: 700
  },
  {
    name: "Bread",
    userIndex: 2,
    date: "2018-12-28",
    time: "12:30",
    calories: 500
  },
  {
    name: "Hog fry",
    userIndex: 2,
    date: "2018-12-25",
    time: "10:30",
    calories: 300
  },
  {
    name: "Family meal",
    userIndex: 2,
    date: "2019-01-06",
    time: "20:00",
    calories: 600
  },
  {
    name: "Picnic",
    userIndex: 2,
    date: "2019-01-09",
    time: "14:00",
    calories: 700
  },
  {
    name: "Airline meal",
    userIndex: 3,
    date: "2019-01-05",
    time: "07:00",
    calories: 400
  },
  {
    name: "Lunch",
    userIndex: 3,
    date: "2019-01-05",
    time: "13:00",
    calories: 400
  },
  {
    name: "Tea",
    userIndex: 3,
    date: "2019-01-07",
    time: "09:00",
    calories: 100
  },
  {
    name: "Barbecue",
    userIndex: 3,
    date: "2019-01-06",
    time: "10:30",
    calories: 600
  },
  {
    name: "Fish fry",
    userIndex: 3,
    date: "2019-01-06",
    time: "16:00",
    calories: 400
  },
  {
    name: "Bull roast",
    userIndex: 3,
    date: "2019-01-10",
    time: "17:00",
    calories: 600
  }
];

mongoose
  .connect(
    config.DB,
    { useNewUrlParser: true }
  )
  .then(
    async () => {
      try {
        console.log("Initializing Meal Tracker DB...");
        await User.deleteMany();
        await Meal.deleteMany();

        console.log("Creating users...");
        let users = [];
        for (const userJSON of userJSONs) {
          const { password, ...otherProperties } = userJSON;
          const hash = await bcrypt.hash(password, 10);
          const user = new User({
            ...otherProperties,
            password: hash
          });
          users.push(await user.save());
        }

        console.log("Creating meals...");
        for (const mealJSON of mealJSONs) {
          const { userIndex, ...otherProperties } = mealJSON;
          const meal = new Meal({
            ...otherProperties,
            userId: users[userIndex].id
          });
          await meal.save();
        }
        process.exit(0);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
    },
    err => {
      console.log("Can not connect to the database" + err);
      process.exit(1);
    }
  );
