require("dotenv").config();
const { Router } = require("express");
const router = Router();
const weatherAPI = require("./weatherApi");

// testing endpoint
router.route("/").get((req, res) => {
  res.json({ message: "It works!" });
});

// ENDPOINT: /weather
router.route("/").post(async (req, res) => {
  const { city } = req.body;
  try {
    const response = await weatherAPI.fetchWeatherData(city);

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
