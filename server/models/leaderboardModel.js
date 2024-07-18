const mongoose = require("mongoose");

const modes = ["easy", "medium", "hard"];

const leaderboardSchema = mongoose.Schema(
  {
    username: { type: String, required: true, minlength: 5, maxlength: 15 },
    gender: { type: Boolean, required: true },
    stars: { type: Number, required: true },
    mode: { type: String, required: true, enum: modes },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
