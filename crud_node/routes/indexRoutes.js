const express = require('express');
const router  = express.Router();
const indexCtrl = require('../controllers/indexController');

router.get('/', indexCtrl.home);

module.exports = router;