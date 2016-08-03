'use strict';

import React from 'react';

export default class InvoicesLine extends React.Component {

	render() {
		console.log(this.props.data, 'data');
		var item = this.props.data;

		return (

			<tr>
				<td>{ item.date.toString() }</td>
				<td>{ item.patient_name }</td>
				<td>{ item.patient_share }</td>
				<td>{ item.SECU_share }</td>
				<td>{ item.paid == true? "X" : "-" }</td>
			</tr>

		);
	}
};

  //date_paid: Date,
  //removed: Boolean*/