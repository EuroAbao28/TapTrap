const {
  addEntry,
  getEntries,
} = require("../controllers/leaderboardController");

const router = require("express").Router();

router.post("/", addEntry);
router.get("/:mode", getEntries);

module.exports = router;
