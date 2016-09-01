'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();
var StaticDownloadController = require('./../controllers/StaticDownloadController');

router.get('/', function(req, res, next) {
	res.setHeader('Content-type','text/html');
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

/* GET home page. */
router.get('/pdf/:filename', function(req, res, next) {
	StaticDownloadController.getStaticPDF(req, res, next);
});

module.exports = router;