'use strict';

var Invoices = require("./../models/Patient");

class ListController {

	/***
	* @description retourne la liste des factures
	*/
	static getInvoices(req, res, next) {
		console.log(req.query, 'req query');
		Invoices
		.getAll(req.query)
		.then(function(data) {
			ListController.sendHttp(res, data);
		})
		.catch(function(err) {
			console.log(err);
			ListController.sendHttp(res, err, 500);	
		});

	}

	static saveInvoice(req, res, next) {

		Invoices
		.create(req.body)
		.then(function() {
			ListController.sendHttp(res,null, 201);
		});
	}

	static updateInvoice(req, res, next) {

		Invoices
		.setOne(req.params.id, req.body)
		.then(function() {
			ListController.sendHttp(res, null, 200);
		})
		.catch(next);
	}

	static removeInvoice(req, res, next) {

		Invoices
		.remove(req.params.id)
		.then(function() {
			ListController.sendHttp(res, null, 200);
		})
		.catch(next);
	}

	static sendHttp(res, data, code=200) {
		if (code != 201)
			res.status(code).json(data);
		else
			res.status(code).end();
	}
}



module.exports = ListController;