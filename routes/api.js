const express = require('express');
const apiController = require('../controllers/api');
const router = express.Router();

router.get('/hello', apiController.getHello);

router.get('/shorturl/new', apiController.getNew);

router.post('/shorturl/:short_url?', apiController.postShortURL);

module.exports = router;
