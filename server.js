if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const weatherRoute = require("./api/weatherRoute");

// server port
const PORT = process.env.PORT || 3000;

// Apply middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// APP endpoint
app.use("/weather", weatherRoute);

// start listening to incoming request
app.listen(PORT, () => {
  console.log(
    `Server listening on port: ${PORT} visit http://localhost:${PORT}`
  );
});
