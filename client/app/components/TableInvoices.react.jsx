'use strict';

import React from 'react';
import request from 'superagent';
import InvoicesLine from './InvoicesLine.react.jsx';
import invoicesStore from './../stores/InvoicesStore.js';
import InvoicesActions from './../actions/InvoicesActions.js';


function getInvoicesState(dateParam) {
	return new Promise((resolve, reject) => {
		invoicesStore.getAll(dateParam).then((data) => {
			resolve({ allInvoices: data });
		}, (err) => {
			reject(err);
		});
	});
}

export default class Table extends React.Component {
	
  	constructor() {
  		super();
  		this.state = {
  			allInvoices: {}
  		};
  	}

	componentDidMount () {
		console.log("component did mount ..");
		invoicesStore.addChangeListener(this._onChange.bind(this));
		InvoicesActions.fetchFromServer(new Date().getTime());
  	}

  	componentWillUnmount () {
    	invoicesStore.removeChangeListener(this._onChange.bind(this));
  	}

  	_onChange(param) {
  		console.log("on change : getInvoicesState with : + param "+param);
  		getInvoicesState(param).then((data) => {
  			delete this.state;
  			this.setState(data);
  		});
  	}

	render () {

		var rows = []
		, 	total_patient = 0
		,	total_cpam = 0
		,	total_paid = 0;

		for (let key in this.state.allInvoices) {

			let item = this.state.allInvoices[key];
			total_patient += item.patient_share.paid == false? item.patient_share.value : 0;
			total_cpam +=  item.SECU_share.paid == false? item.SECU_share.value : 0;

			
			let total_paid_per_line = 0;
			total_paid_per_line += item.patient_share.paid == true ? item.patient_share.value : 0;
			total_paid_per_line += item.SECU_share.paid == true ? item.SECU_share.value : 0;
			item.total_paid_per_line = total_paid_per_line.toFixed(2);
		    total_paid += total_paid_per_line;


			rows.push(<InvoicesLine key={key} data={item} />);
		}

		return (   
		    <row>
		    	<div className="col-lg-10 col-lg-offset-1">
				    <table className="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th>Date</th>
								<th>Nom</th>
								<th>Patient ({total_patient.toFixed(2)}€)</th>
								<th>CPAM ({total_cpam}€)</th>
								<th>Total ({(total_patient + total_cpam).toFixed(2)}€)</th>
								<th>Payé ({(total_paid).toFixed(2)}€)</th>
							</tr>
						</thead>
						<tbody>
							{rows}
						</tbody>
					</table>
				</div>
			</row>
		);
	}
};