'use strict';

import React from 'react';
import request from 'superagent';
import InvoicesLine from './invoicesLine.jsx';
import invoicesStore from './../stores/InvoicesStore.js';


function getInvoicesState() {
	/*return new Promise(function(resolve, reject) {
		InvoicesStore.getAll().then(function(data) {
			resolve({ allInvoices: data });
		}, function(err) {
			reject(err);
		});
	});*/
	return {
		allInvoices: invoicesStore.getAll()
	}
}

export default class Table extends React.Component {
	
	/*constructor() {
    	super();
  	}*/

  	constructor() {
  		super();
  		//getInvoicesState().then(function(data) {
  		this.state = getInvoicesState();
  		//});
  	}

	componentDidMount () {
		invoicesStore.addChangeListener(this._onChange);
  	}

  	componentWillUnmount () {
    	invoicesStore.removeChangeListener(this._onChange);
  	}

  	_onChange() {
  		/*getInvoicesState().then(function(data) {
  			this.setState(data);
  		});*/
		this.setState(getInvoicesState());
  		
  	}

	render () {

		var rows = [];
		for (let key in this.state.allInvoices) {
			rows.push(<InvoicesLine key={key} data={this.state.allInvoices[key]} />);
		}

		return (
		    <table className="table">
				<thead>
					<tr>
						<th>Date</th>
						<th>Nom</th>
						<th>Part patient</th>
						<th>Part caisse</th>
						<th>Payé ?</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
		);
	}
};