const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = new Schema(
  {
    activity: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
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
    percent: { type: String, default: "0%" },
    streak: { type: Number, default: 0 },
    wakeUp: { type: String, default: "" },
    today: [goalSchema],
    yesterday: [goalSchema],
    tomorrow: [goalSchema],
    lastRendered: {
      type: String,
      default: null,
    },
    initiation: {
      type: String,
      default: null,
    },
    lastCycled: {
      type: Number,
      default: 0,
    },
    totalDaysElapsed: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
