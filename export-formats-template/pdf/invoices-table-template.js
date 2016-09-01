let template = "";

/***
* @description template du tableau des factures en vue d'exportation au format pdf
*
*/


template += 
'<!DOCTYPE html>' +
'<head>' +
'<meta charset="utf-8">' +
'<link href="export-formats-template/pdf/style.css" media="print" type="text/css" rel="stylesheet">' +
'<link href="node_modules/bootstrap/dist/css/bootstrap.min.css" media="print" type="text/css" rel="stylesheet">' +

'</head>' +
'<body>' +

'<row>' +
	'<div class="col-lg-4 col-lg-offset-4">' +
		'<h2 class="text-primary month-label">' +
			'{{invoices.date}}' +
		'</h2>' +
	'</div>' +
'</row>' +
'<row>' +
'<div class="col-lg-10 col-lg-offset-1">' +
	'<table class="table table-striped table-bordered table-hover">' +
		'<thead>' +
			'<tr>' +
				'<th>Date</th>' +
				'<th>Nom</th>' +
				'<th>Patient ({{invoices.totals.total_patient_share}}€)</th>' +
				'<th>CPAM ({{invoices.totals.total_SECU_share}}€)</th>' +
				'<th>Total ({{invoices.totals.total_global_no_paid}}€)</th>' +
				'<th>Payé ({{invoices.totals.total_global_paid}}€)</th>' +
			'</tr>' +
		'</thead>' +
		'<tbody>' +
			'{{#each invoices.lines}}' +
				'<tr>' +
					'<td class="date-line">{{date}}</td>' +
					'<td>{{ patient_name }}</td>' +
					'<td>{{ patient_share.value }}</td>' +
					'<td>{{ SECU_share.value}}</td>' +
					'<td>{{ total_line }}</td>' +
					'<td>{{ total_line_paid }}</td>' +
				'</tr>' +
			'{{/each}}'
		'</tbody>' +
	'</table>' +
'</div>' +
'</row>' +
'</body>';




module.exports = template;