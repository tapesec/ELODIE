'use strict';

var Invoices = require("./../models/Patient");
var Handlebars = require('Handlebars');
var pdf = require('html-pdf');
var path = require('path');
var pdfConfig = require('./../export-formats-template/pdf/config.js');

class ListController {

	/***
	* @description retourne la liste des factures
	*/
	static getInvoices(req, res, next) {
		console.log(req.query, 'req query');
		
		Invoices
		.getAll(req.query)
		.then(function(data) {
			console.log(data, 'data');
			if (req.query.format == "pdf") {
				let source = require('./../export-formats-template/pdf/invoices-table-template.js');
				let templatePdf = Handlebars.compile(source);
				let html = templatePdf({ invoices: data });
				console.log(pdfConfig, 'html');

				pdf.create(html, pdfConfig).toFile('./factures.pdf', function(err, facturePdf) {
				  	if (err) return console.log(err);
				  	console.log(facturePdf); // { filename: '/app/businesscard.pdf' }
				  	//res.sendFile(path.resolve(__dirname + '/../client/index.html'));
				  	res.contentType("application/pdf");
				  	res.send(facturePdf);
				});
			} else {
				ListController.sendHttp(res, data);
			}
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

	/***
	* @description retourne la réponse
	*/
	static sendHttp(res, data, code=200) {
		if (code != 201)
			res.status(code).json(data);
		else
			res.status(code).end();
	}
}



module.exports = ListController;