const leaderboardModel = require("../models/leaderboardModel");

const addEntry = async (req, res) => {
  try {
    const { username, gender, stars, mode } = req.body;

    if (!username || gender === null || stars === 0 || !mode)
      return res.status(400).json({ message: "Invalid entry" });

    // find the name if exist
    const existingUser = await leaderboardModel.findOne({
      username,
      gender,
      mode,
    });

    if (existingUser) {
      // if your star is higher that the current, set a new
      if (stars > existingUser.stars) {
        existingUser.stars = stars;
        await existingUser.save();

        return res.status(200).json({
          message: "New highest star for this username",
          status: "yes",
        });
      } else {
        return res.status(200).json({
          message: "You did not surpass the current highest for this username",
          status: "no",
        });
      }
    }

    const response = await leaderboardModel.create({
      username,
      gender,
      stars,
      mode,
    });

    res.status(201).json({ message: "Shared successfully", status: "new" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEntries = async (req, res) => {
  try {
    const { mode } = req.params;
    const response = await leaderboardModel.find({ mode }).sort({ stars: -1 });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addEntry, getEntries };
