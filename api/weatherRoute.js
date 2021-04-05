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
    console.log(city);
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// ENDPOINT: /weather/city
router.route("/city").get(async (req, res) => {
  try {
    const response = await weatherAPI.getCityCoordniates("London");
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
