const express = require("express");
const initializePassport = require("./config/passport.config");
const router = require("./router/index");
require("./config/mongo.config");

const app = express();
app.use(express.json());
initializePassport();

app.use("/", router);

module.exports = app;
