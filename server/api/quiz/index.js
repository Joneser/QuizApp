'use strict';

var express = require('express');
var controller = require('./quiz.controller');

var router = express.Router();

router.get('/', controller.show);
router.post('/', controller.create);

module.exports = router;