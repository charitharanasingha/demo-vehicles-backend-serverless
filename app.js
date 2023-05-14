const express = require("express");
const bodyParser = require("body-parser")
const sls = require("serverless-http");
const cors = require('cors');

const dealerRouter = require("./dealer/dealer.route");
const vehicleRouter = require("./vehicle/vehicle.route");

const app = express();
app.use(cors());
app.use(express.static("client"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/dealers", dealerRouter);
app.use("/vehicles", vehicleRouter);

module.exports.server = sls(app);

