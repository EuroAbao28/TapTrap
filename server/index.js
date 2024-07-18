const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("colors");

const port = process.env.PORT || 5000;

// connect to database
const connectDB = require("./db/mongoDB");
connectDB();

// middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route
app.use("/api/leaderboard", require("./routes/leaderboardRoute"));

app.listen(port, () =>
  console.log(`Server running on port: ${port}`.yellow.underline)
);
