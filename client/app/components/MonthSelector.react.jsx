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
		this._getPrevMonth = this._getPrevMonth.bind(this);
		this._getNextMonth = this._getNextMonth.bind(this);
	}

	render() {
		return (
		    <div>
	        	<div className="col-lg-1 col-lg-offset-3">
	        		<span 
	        			onClick={this._getPrevMonth} 
	        			className="h2 glyphicon glyphicon-arrow-left pull-right pointer">
	        		</span>
	        	</div>
	        	<div className="col-lg-4">
	        		<h2 className="text-primary month-label">
	        		 	{ moment(this.props.date).format("MMMM YYYY") } 
	        		</h2>
	        	</div>
	        	<div className="col-lg-1">
	        		<span 
	        			onClick={this._getNextMonth}
	        			className="h2 glyphicon glyphicon-arrow-right pointer">
	        		</span>
	        	</div>
        	</div>
		);
	}

	_getPrevMonth() {
		let old_ts = this.props.date;
		let new_ts = moment(old_ts).subtract(1, 'months').valueOf();
		InvoicesActions.changeCurrentMonth(new_ts);
	}

	_getNextMonth() {
		let old_ts = this.props.date;
		let new_ts = moment(old_ts).add(1, 'months').valueOf();
		InvoicesActions.changeCurrentMonth(new_ts);
	}

}