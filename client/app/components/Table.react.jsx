'use strict';
import React from 'react';
import { connect } from 'react-redux';
import TableHeader from './TableHeader.react.jsx';
import TableBody from './TableBody.react.jsx';

let Table = ({ data }) => (   
	<table className="table table-striped table-bordered table-hover">
		<TableHeader totals={data}/>
		<TableBody />
	</table>
);
	

function getCurrentMonthData(monthsData, currentMonth) {
	return monthsData[currentMonth]? monthsData[currentMonth].totals : {};
}


const mapStateToProps = (state) => ({
    data: getCurrentMonthData(state.months, state.currentMonth)
})

Table = connect(
  	mapStateToProps
)(Table);

export default Table;