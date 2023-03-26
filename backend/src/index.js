const express = require("express");
const cors = require("cors");
require('dotenv').config()
const {chicken} = require("./api/chicken")
var bodyParser = require('body-parser')
const {run} = require("./api/chickenRun")

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/chicken", chicken, run);

app.get("/", (req, res) => {
  res.send("health");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
