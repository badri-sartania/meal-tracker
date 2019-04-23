const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./user.model");
const { jwtSecret } = require("./config");
const { wrap } = require("./middleware/async");

router.post(
  "/signup",
  wrap(async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ email: "This email is already used" });
    }

    const hash = await bcrypt.hash(req.body.password, 10);
    if (!hash) {
      return res.status(400).json({ message: "Failed to sign up" });
    }
    const user = new User({
      email: req.body.email,
      fullname: req.body.fullname,
      password: hash
    });
    await user.save();
    const JWTToken = jwt.sign(
      {
        id: user._id
      },
      jwtSecret,
      {
        expiresIn: "14d"
      }
    );
    res.status(200).json({
      success: true,
      token: JWTToken
    });
  })
);

router.post(
  "/signin",
  wrap(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        email: "Invalid email or password",
        password: "Invalid email or password"
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(400).json({
        email: "Invalid email or password",
        password: "Invalid email or password"
      });
    }

    const JWTToken = jwt.sign(
      {
        id: user._id
      },
      jwtSecret,
      {
        expiresIn: "14d"
      }
    );
    res.status(200).json({
      success: true,
      token: JWTToken
    });
  })
);

module.exports = router;
