'use strict';

import React, { PropTypes } from 'react';
import moment from 'moment';

moment.locale('fr');

// css..
require("!style!css!less!./../../css/InvoicesLine.less");

const InvoicesLine = ({ toggleSECUPaid, togglePatientPaid, invoice, toggleEdit, deleteLine }) => (

    <tr 
    	onDoubleClick={() => {
    		toggleEdit({
    			_id: invoice._id,
    			date: invoice.date,
    			patient_name: invoice.patient_name,
    			patient_share_value: invoice.patient_share.value,
    			SECU_share_value: invoice.SECU_share.value
    		});
    	}} 
    	className="pointer">
		<td className="date-line">{ moment(invoice.date).format('dddd DD MMMM') }</td>
		<td>{ invoice.patient_name }</td>
		<td>
			{ invoice.patient_share.value.toFixed(2) } 
			<input 
				className="pull-right" 
				onChange={(event) => {
					event.persist();
					togglePatientPaid(invoice._id, invoice.patient_share.paid);
				}} 
				type="checkbox" 
				checked={ invoice.patient_share.paid }/>
		</td>
		<td>
			{ invoice.SECU_share.value.toFixed(2) }
			<input 
				className="pull-right" 
				onChange={(event) => {
					event.persist();
					toggleSECUPaid(invoice._id, invoice.SECU_share.paid);
				}} 
				type="checkbox" 
				checked={ invoice.SECU_share.paid }/>
		</td>
		<td>{ invoice.total_line.toFixed(2) } €</td>
		<td>
			{ invoice.total_line_paid.toFixed(2) } € 
			<span 
				onClick={ () => {
					deleteLine(invoice.id);
				}} 
				className="pull-right glyphicon glyphicon-trash">
			</span>
		</td>
	</tr>

)

InvoicesLine.propTypes = {
	toggleSECUPaid: PropTypes.func.isRequired,
	togglePatientPaid: PropTypes.func.isRequired,
	toggleEdit: PropTypes.func.isRequired,
	invoice: PropTypes.object.isRequired,
	deleteLine: PropTypes.func.isRequired
}

export default InvoicesLine;