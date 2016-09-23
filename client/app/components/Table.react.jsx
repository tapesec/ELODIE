'use strict';

import React from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions';

import TableHeader from './TableHeader.react.jsx';
import TableBody from './TableBody.react.jsx';

class Table extends React.Component {

	/*componentWillReceiveProps(nextProps) {
    	if (nextProps.data && nextProps.data.invoices !== this.props.data.invoices) {
      		const { dispatch, currentMonth } = nextProps;
      		dispatch(actions.fetchInvoicesIfNeeded(currentMonth));
    	}
  	}*/

	render () {
		//let totals = this.props.data? this.props.data.totals : {};

		return (   
		    <table className="table table-striped table-bordered table-hover">
				<TableHeader totals={this.props.data}/>
				<TableBody />
			</table>
		);
	}
};

function getCurrentMonthData(monthsData, currentMonth) {
	return monthsData[currentMonth]? monthsData[currentMonth].totals : {};
}


const mapStateToProps = (state) => {
  	return {
    	data: getCurrentMonthData(state.months, state.currentMonth)
  	}
}

Table = connect(
  	mapStateToProps
)(Table);

export default Table;