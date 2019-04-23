const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Meal = require("./meal.model");
const Role = require("./role");
const { wrap } = require("./middleware/async");

// Defined get data(index or listing) route
router.route("/").get(
  wrap(async (req, res) => {
    const conditions = {};
    if (req.user.role == Role.User) {
      conditions.userId = req.user.id;
    }

    const meals = await Meal.find(conditions);
    res
      .status(200)
      .header("X-Total-Count", meals.length)
      .json(meals);
  })
);

// Defined multiple delete route
router.route("/").delete(
  wrap(async (req, res) => {
    const { ids } = req.body;
    const conditions = { _id: { $in: ids } };
    if (req.user.role == Role.User) {
      conditions.userId = req.user.id;
    }

    await Meal.deleteMany(conditions);
    res.status(200).json(ids);
  })
);

// Defined create route
router.route("/").post(
  wrap(async (req, res) => {
    const meal = new Meal({ ...req.body, userId: req.user.id });
    const newMeal = await meal.save();
    res.status(200).json(newMeal);
  })
);

// Defined item route
router.route("/:id").get(
  wrap(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Meal is not found" });
    }

    const conditions = { _id: id };
    if (req.user.role == Role.User) {
      conditions.userId = req.user.id;
    }

    const meal = await Meal.findOne(conditions);
    if (!meal) {
      return res.status(404).json({ message: "Meal is not found" });
    }
    res.status(200).json(meal);
  })
);

//  Defined update route
router.route("/:id").put(
  wrap(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Meal is not found" });
    }

    const conditions = { _id: id };
    if (req.user.role == Role.User) {
      conditions.userId = req.user.id;
    }

    const meal = await Meal.findOne(conditions);
    if (!meal) {
      return res.status(400).json({ message: "Meal is not found" });
    }
    meal.name = req.body.name;
    meal.date = req.body.date;
    meal.time = req.body.time;
    meal.calories = req.body.calories;

    const updatedMeal = await meal.save();
    res.status(200).json(updatedMeal);
  })
);

// Defined delete route
router.route("/:id").delete(
  wrap(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Meal is not found" });
    }

    const conditions = { _id: id };
    if (req.user.role == Role.User) {
      conditions.userId = req.user.id;
    }

    await Meal.findOneAndDelete(conditions);
    res.status(200).json({ id });
  })
);

module.exports = router;
