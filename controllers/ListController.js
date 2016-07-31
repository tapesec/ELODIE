'use strict';

var Invoices = require("./../models/Patient");

class ListController {

	/***
	* @description retourne la liste des factures
	*/
	static getInvoices(req, res, next) {

		Invoices
		.getAll()
		.then(function(data) {
			ListController.sendHttp(res, data);
		});

	}

	static saveInvoice(req, res, next) {
		console.log(req.body, 'req');
		Invoices
		.create(req.body)
		.then(function() {
			ListController.sendHttp(res,null, 201);
		});
	}

	static updateInvoice(req, res, next) {
		Invoices
		.setOne(req.body)
		.then(function() {
			ListController.sendHttp(res, null, 201);
		});
	}

	static sendHttp(res, data, code=200) {
		if (code != 201)
			res.status(code).json(data);
		else
			res.status(code).end();
	}
}



module.exports = ListController;