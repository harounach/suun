require("dotenv").config();
const { Router } = require("express");
const router = Router();
const weatherAPI = require("./weatherApi");

// testing endpoint
router.route("/").get((req, res) => {
  res.json({ message: "It works!" });
});

router.route("/").post(async (req, res) => {
  const { search } = req.body;
  const response = await weatherAPI.fetchWeatherData();
  console.log(response.data);
  res.json(response.data);
});

module.exports = router;
