const express = require('express');
const apiController = require('../controllers/api');
const router = express.Router();

router.get('/hello', apiController.getHello);

router.get('/:date?', apiController.getDate);

module.exports = router;
