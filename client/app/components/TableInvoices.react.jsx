'use strict';

import React from 'react';
import request from 'superagent';
import InvoicesLine from './InvoicesLine.react.jsx';
import invoicesStore from './../stores/InvoicesStore.js';
import InvoicesActions from './../actions/InvoicesActions.js';


export default class Table extends React.Component {

	render () {

		var rows = [];

		for (let key in this.props.invoiceData.invoices) {

			let item = this.props.invoiceData.invoices[key];
			rows.push(<InvoicesLine key={key} data={item} />);
		}

		let totals = this.props.invoiceData.totals;

		return (   
		    <table className="table table-striped table-bordered table-hover">
				<thead>
					<tr>
						<th>Date</th>
						<th>Nom</th>
						<th>Patient ({ totals.total_patient_share }€)</th>
						<th>CPAM ({ totals.total_SECU_share }€)</th>
						<th>Total ({ totals.total_global_no_paid }€)</th>
						<th>Payé ({ totals.total_global_paid }€)</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
};