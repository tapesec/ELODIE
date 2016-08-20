'use strict';

import React from 'react';
import moment from 'moment';
moment.locale('fr');

require("!style!css!less!./../../css/MonthSelector.less");

import InvoicesActions from './../actions/InvoicesActions.js';
import invoicesStore from './../stores/InvoicesStore.js';


export default class MonthSelector extends React.Component {

	constructor() {
		super();
		this.state = {
			current_timestamp: new Date().getTime()
		};
	}

	componentDidMount() {
		invoicesStore.addMonthSelectorListener(this._notify.bind(this));
		invoicesStore.addMonthSelectorPDFListener(this._sendDateForPDF.bind(this));
		//this._notify();
	}

	_notify() {
		console.log("notification emited from picker ..")
		InvoicesActions.fetchFromServer(this.state.current_timestamp);
	}

	_sendDateForPDF() {
		InvoicesActions.getPDF(this.state.current_timestamp)
	}


	render() {
		return (

	        <row>
	        	<div className="col-lg-1 col-lg-offset-3">
	        		<span 
	        			onClick={this._getPrevMonth.bind(this)} 
	        			className="h2 glyphicon glyphicon-arrow-left pull-right pointer">
	        		</span>
	        	</div>
	        	<div className="col-lg-4">
	        		<h2 className="text-primary month-label">
	        		 	{ moment(this.state.current_timestamp).format("MMMM YYYY") } 
	        		</h2>
	        	</div>
	        	<div className="col-lg-1">
	        		<span 
	        			onClick={this._getNextMonth.bind(this)}
	        			className="h2 glyphicon glyphicon-arrow-right pointer">
	        		</span>
	        	</div>
	        </row>
		);
	}

	_getPrevMonth() {
		let old_ts = this.state.current_timestamp;
		let new_ts = moment(old_ts).subtract(1, 'months').valueOf();
		this.setState({
			current_timestamp: new_ts
		});
		InvoicesActions.fetchFromServer(new_ts);
	}

	_getNextMonth() {
		let old_ts = this.state.current_timestamp;
		let new_ts = moment(old_ts).add(1, 'months').valueOf();
		this.setState({
			current_timestamp: new_ts
		});
		console.log(this.state.current_timestamp, 'check param');
		InvoicesActions.fetchFromServer(new_ts);
	}

}