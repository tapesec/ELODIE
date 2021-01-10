'use strict';

import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

import moment from 'moment';
moment.locale('fr');

require("!style!css!less!./../../css/MonthSelector.less");


let MonthSelector = ({ dispatch, date }) => (

    <div>
    	<div className="col-lg-1 col-lg-offset-3">
    		<span 
    			onClick={() => {
					const newDate = moment(date).subtract(1, 'months').valueOf();
    				dispatch(actions.changeMonth(newDate));
    				dispatch(actions.fetchInvoicesIfNeeded(newDate))
    			}}
    			className="h2 glyphicon glyphicon-arrow-left pull-right pointer">
    		</span>
    	</div>
    	<div className="col-lg-4">
    		<h2 className="text-primary month-label">
    		 	{ moment(date).format("MMMM YYYY") } 
    		</h2>
    	</div>
    	<div className="col-lg-1">
    		<span 
    			onClick={() => {
					const newDate = moment(date).add(1, 'months').valueOf();
    				dispatch(actions.changeMonth(newDate));
    				dispatch(actions.fetchInvoicesIfNeeded(newDate))
    			}}
    			className="h2 glyphicon glyphicon-arrow-right pointer">
    		</span>
    	</div>
	</div>
);

const mapStateToProps = (state) => {
  	return {
    	date: state.currentMonth,
  	}
}

MonthSelector = connect(mapStateToProps)(MonthSelector);

export default MonthSelector;