const express = require('express');
const router = express.Router();
const controller = require('./dealer.controller')

router.get('/', controller.getDealers);

module.exports = router;
