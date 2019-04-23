const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define collection and schema for Meal
const Meal = new Schema(
  {
    name: {
      type: String
    },
    userId: {
      type: String
    },
    date: {
      type: String
    },
    time: {
      type: String
    },
    calories: {
      type: Number
    }
  },
  {
    collection: "meal"
  }
);

Meal.set("toJSON", {
  transform: function(doc, ret) {
    const { _id, __v, ...otherProps } = ret;
    return {
      id: _id,
      ...otherProps
    };
  }
});

module.exports = mongoose.model("meal", Meal);
