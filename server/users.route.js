const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = require("./user.model");
const Role = require("./role");
const { wrap } = require("./middleware/async");

// Defined get data(index or listing) route
router.route("/").get(
  wrap(async (req, res) => {
    const users = await User.find();
    res
      .status(200)
      .header("X-Total-Count", users.length)
      .json(users);
  })
);

// Defined multiple delete route
router.route("/").delete(
  wrap(async (req, res) => {
    const { ids } = req.body;
    if (ids.includes(req.user.id)) {
      return res
        .status(400)
        .json({ message: "You are not able to delete yourself" });
    }

    const users = await User.find({ _id: { $in: ids } });
    for (const user of users) {
      if (user.role === Role.Admin && req.user.role !== Role.Admin) {
        return res.status(401).json({
          message: "You don't have permission to delete admin user."
        });
      }
    }
    await User.deleteMany({ _id: { $in: ids } });
    res.status(200).json(ids);
  })
);

// Defined create route
router.route("/").post(
  wrap(async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ email: "This email is already used" });
    }

    if (user.role === Role.Admin && req.user.role !== Role.Admin) {
      return res.status(401).json({
        message: "You don't have permission to create admin user."
      });
    }

    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(200).json(user);
  })
);

// Defined item route
router.route("/:id").get(
  wrap(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User is not found" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    res.status(200).json(user);
  })
);

//  Defined update route
router.route("/:id").put(
  wrap(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User is not found" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    if (user.role === Role.Admin && req.user.role !== Role.Admin) {
      return res.status(401).json({
        message: "You don't have permission to edit admin user."
      });
    }

    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.role = req.body.role;
    user.goal = req.body.goal;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  })
);

// Defined delete route
router.route("/:id").delete(
  wrap(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User is not found" });
    }
    if (id === req.user.id) {
      return res
        .status(400)
        .json({ message: "You are not able to delete yourself" });
    }
    const user = await User.findById(id);
    if (user.role === Role.Admin && req.user.role !== Role.Admin) {
      return res.status(401).json({
        message: "You don't have permission to delete admin user."
      });
    }

    await user.delete();
    res.status(200).json({ id });
  })
);

module.exports = router;
