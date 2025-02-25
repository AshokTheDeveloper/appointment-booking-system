const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const appointmentsRoute = require("./routes/appointmentsRoute");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/doctors", appointmentsRoute);

module.exports = app;
