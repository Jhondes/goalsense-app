const express = require("express");
const router = express.Router();

const generatePredictions = require("../utils/generator");

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