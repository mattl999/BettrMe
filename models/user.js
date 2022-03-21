const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    activity: {
      type: String,
    },
    completed: Boolean,
  },
  {
    timestamps: true,
  }
);

const userSchema = new Schema(
  {
    name: String,
    email: String,
    avatar: String,
    googleId: String,
    percent:{type :String, default:"0%"},
    today: [goalSchema],
    yesterday: [goalSchema],
    tomorrow: [goalSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

