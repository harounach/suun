require("dotenv").config();
const express = require("express");
const app = express();

// server port
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// start listening to incoming request
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server listening on port: ${PORT} visit http://localhost:${PORT}`
  );
});
