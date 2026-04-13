const express = require("express");
const cors = require("cors");

// ✅ create app FIRST
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ import routes AFTER app is created
const generateRoute = require("./routes/generateRoute");
const addMatchRoute = require("./routes/addMatchRoute");

// ✅ use routes AFTER import
app.use("/api/generate", generateRoute);
app.use("/api/matches", addMatchRoute);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});