'use strict';

import React from 'react';
import request from 'superagent';
import InvoicesLine from './invoicesLine.react.jsx';
import invoicesStore from './../stores/InvoicesStore.js';
import InvoicesActions from './../actions/InvoicesActions.js';


function getInvoicesState() {
	return new Promise((resolve, reject) => {
		invoicesStore.getAll().then((data) => {
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
		InvoicesActions.fetchFromServer();
		invoicesStore.addChangeListener(this._onChange.call(this));
  	}

  	componentWillUnmount () {
    	invoicesStore.removeChangeListener(this._onChange.call(this));
  	}

  	_onChange() {
  		getInvoicesState().then((data) => {
  			this.setState(data);
  		});
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