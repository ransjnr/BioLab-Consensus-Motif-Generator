const express = require("express");
const analyzeRoutes = require("./routes/analyze");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());

// API ENDPOINTS
app.use(analyzeRoutes);

module.exports = app;
