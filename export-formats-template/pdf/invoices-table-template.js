let template = "";

/***
* @description template du tableau des factures en vue d'exportation au format pdf
*
*/


template += 
'<!DOCTYPE html>' +
'<head>' +
'<link href="http://localhost:300/style.css", rel="stylesheet">' +
'<meta charset="utf-8">' +
'</head>' +
'<body>' +
'<table>' +
	'<thead>' +
		'<tr>' +
			'<th>Date</th>' +
			'<th>Nom</th>' +
			'<th>Patient ()</th>' +
			'<th>CPAM ()</th>' +
			'<th>Total ()</th>' +
			'<th>Payé ()</th>' +
		'</tr>' +
	'</thead>' +
	'<tbody>' +
		'{{#each invoices}}' +
			'<tr>' +
				'<td>22/07/1983</td>' +
				'<td>{{ patient_name }}</td>' +
				'<td>{{ patient_share.value }}</td>' +
				'<td>{{ SECU_share.value}}</td>' +
				'<td></td>' +
			'</tr>' +
		'{{/each}}'
	'</tbody>' +
'</table>'
'</body>';




module.exports = template;