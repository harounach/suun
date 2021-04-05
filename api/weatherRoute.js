require("dotenv").config();
const { Router } = require("express");
const router = Router();

router.route("/").get((req, res) => {
  res.json({ message: "It works!" });
});

module.exports = router;
