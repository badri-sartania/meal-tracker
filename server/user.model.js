const mongoose = require("mongoose");
const Role = require("./role");

const User = mongoose.Schema(
  {
    email: { type: String, required: true },
    fullname: { type: String },
    role: { type: String, default: Role.User },
    goal: { type: Number, default: 100 },
    password: {
      type: String,
      required: true,
      default: "$2y$10$90ZfdLL7FBF/Y49Umbarp.4WAEE2oOXvdyXxuhUm6z2W332.u/nRy"
    } //default password is 1234
  },
  {
    collection: "user"
  }
);

User.set("toJSON", {
  transform: function(doc, ret) {
    const { _id, __v, password, ...otherProps } = ret;
    return {
      id: _id,
      ...otherProps
    };
  }
});

module.exports = mongoose.model("user", User);
