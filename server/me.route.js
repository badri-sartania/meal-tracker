const express = require("express");
const router = express.Router();

const User = require("./user.model");
const { wrap } = require("./middleware/async");

// Defined get data(index or listing) route
router.route("/").get(
  wrap(async (req, res) => {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  })
);

router.route("/").put(
  wrap(async (req, res) => {
    const user = await User.findById(req.user.id);
    user.email = req.body.email;
    user.fullname = req.body.fullname;
    user.role = req.body.role;
    user.goal = req.body.goal;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  })
);

module.exports = router;
