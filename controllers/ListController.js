'use strict';

var Invoices = require("./../models/Patient");
var Handlebars = require('handlebars');
var pdf = require('html-pdf');
var path = require('path');
var moment = require('moment');
var fs = require('fs');

var pdfConfig = require('./../export-formats-template/pdf/config.js');

class ListController {

	/***
	* @description retourne la liste des factures
	*/
	static getInvoices(req, res, next) {
		
		Invoices
		.getAll(req.query)
		.then(function(data) {
			ListController.sendHttp(res, data);
		})
		.catch(function(err) {
			ListController.sendHttp(res, err, 500);	
		});
		

	}

	/***
	* @description crée et sauvegarde le tableau des factures au format pdf dans documents/pdf
	* @return le nom du fichier sauvegardé
	*/
	static generatePdf(req, res, next) {
		Invoices
		.getAll(req.query)
		.then(function(data) {

			var data = JSON.parse(JSON.stringify(data));
			var dateMonth = moment(parseInt(req.query.date)).format('MMMM YYYY');

			let dataWithTotals = {
				lines : data,
				date : dateMonth,
				totals: Invoices.getTotalsInvoices(data)
			};

			for (let i = 0; i < dataWithTotals.lines.length; i++) {
				let formatedDate = moment(JSON.parse(JSON.stringify(dataWithTotals.lines[i].date))).format('dddd DD MMMM');
				dataWithTotals.lines[i].date = formatedDate;
			}

			let source = require('./../export-formats-template/pdf/invoices-table-template.js');
			let templatePdf = Handlebars.compile(source);
			let html = templatePdf({ invoices: dataWithTotals });

			var filename = 'factures-' + dateMonth.replace(" ","-") + '.pdf';
			pdf.create(html, pdfConfig).toFile('./documents/pdf/' + filename, function(err, file) {
			  	if (err) return console.log(err);
			  	else ListController.sendHttp(res, { filename });
			});

		})
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