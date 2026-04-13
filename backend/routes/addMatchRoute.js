const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Path to JSON file
const filePath = path.join(__dirname, "../data/matches.json");

// ======= GET all matches =======
router.get("/", (req, res) => {
  try {
    const matches = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json({ matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read matches" });
  }
});

// ======= POST add new match =======
router.post("/", (req, res) => {
  try {
    const { home, away, league, market, odds, date } = req.body;

    if (!home || !away || !league || !market || !odds || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const matches = JSON.parse(fs.readFileSync(filePath));

    matches.push({
  id: Date.now().toString(), // ✅ ADD THIS
  home,
  away,
  league,
  market,
  odds: parseFloat(odds),
  date,
});

    fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));

    res.json({ success: true, message: "Match added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add match" });
  }
});

module.exports = router;