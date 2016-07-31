'use strict';

var express = require('express');
var router = express.Router();
var ListController = require('./../controllers/ListController');

/* GET home page. */
router.get('/invoices', function(req, res, next) {
  ListController.getInvoices(req, res, next);
});

router.post('/invoice', function(req, res, next) {
  ListController.saveInvoice(req, res, next);
});

module.exports = router;
