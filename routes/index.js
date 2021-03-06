'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();
var ListController = require('./../controllers/ListController');

router.get('/', function(req, res, next) {
	res.setHeader('Content-type','text/html');
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

/* GET home page. */
router.get('/invoices', function(req, res, next) {
	if (req.query && req.query.format && req.query.format == "pdf") {
		ListController.generatePdf(req, res, next);
	} else {
		ListController.getInvoices(req, res, next);
	}
});

router.post('/invoice', function(req, res, next) {
  ListController.saveInvoice(req, res, next);
});

router.patch('/invoice/:id', function(req, res, next) {
  ListController.updateInvoice(req, res, next);
});

router.delete('/invoice/:id', function(req, res, next) {
  ListController.removeInvoice(req, res, next);
});

module.exports = router;
