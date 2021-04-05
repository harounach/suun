require("dotenv").config();
const express = require("express");
const app = express();

// server port
const PORT = 3000;

// Apply middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// start listening to incoming request
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server listening on port: ${PORT} visit http://localhost:${PORT}`
  );
});
