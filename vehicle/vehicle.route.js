const express = require('express');
const router = express.Router();
const controller = require('./vehicle.controller')

router.get('/:bac', controller.getVehiclesByDealer);

module.exports = router;
