const express = require("express");
const router = express.Router();

const generatePredictions = require("../utils/generator");

// GET route (optional, just for testing in browser)
router.get("/", (req, res) => {
  res.send("POST to this route to get predictions");
});

// POST route (this is the real API)
router.post("/", (req, res) => {
  try {
    const filters = req.body;
    const data = generatePredictions(filters);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error generating predictions" });
  }
});

module.exports = router;