'use strict';

var Invoices = require("./../models/Patient");
var Handlebars = require('handlebars');
var pdf = require('html-pdf');
var path = require('path');
var moment = require('moment');
var fs = require('fs');
var _ = require('lodash');

var pdfConfig = require('./../export-formats-template/pdf/config.js');

class ListController {

	/***
	* @description retourne la liste des factures
	*/
	static getInvoices(req, res, next) {
		Invoices
		.getAll(req.query)
		.then(function(data) {
			let dataWithTotalsIndexedByMonth = {};
			dataWithTotalsIndexedByMonth = {
				invoices : _.keyBy(data, function(line) {
					return line._id;
				}),
				dateMonth : parseInt(req.query.date, 10),
				totals: Invoices.getTotalsInvoices(data)
			};
			ListController.sendHttp(res, dataWithTotalsIndexedByMonth);
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
			var dateMonth = moment(parseInt(req.query.date));

			let dataWithTotals = {
				lines : data,
				date : dateMonth.format('MMMM YYYY'),
				totals: Invoices.getTotalsInvoices(data)
			};

			for (let i = 0; i < dataWithTotals.lines.length; i++) {
				let formatedDate = moment(JSON.parse(JSON.stringify(dataWithTotals.lines[i].date))).format('dddd DD MMMM');
				dataWithTotals.lines[i].date = formatedDate;
			}

			let source = require('./../export-formats-template/pdf/invoices-table-template.js');
			let templatePdf = Handlebars.compile(source);
			let html = templatePdf({ invoices: dataWithTotals });

			console.log(process.env.PWD, 'PWD');
			var filename = 'factures-' + dateMonth.format('MM-YYYY') + '.pdf';
			console.log("pdf created and save in : " + process.env.PWD + "/documents/pdf/"+filename);
			pdf.create(html, pdfConfig).toFile(process.env.PWD +'/documents/pdf/' + filename, function(err, file) {
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
		console.log(req.params.id, req.body)
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
		if (code != 201 || code != 500)
			res.status(code).json(data);
		else if (code == 500)
			res.next(data);
		else
			res.status(code).end();
	}
}



module.exports = ListController;