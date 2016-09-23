import React from 'react';
import InvoicesLine from './InvoicesLine.react.jsx';
import { connect } from 'react-redux';

import * as actions from '../actions';

let TableBody = ({ 
	data, 
	onTogglePaymentCPAM, 
	onTogglePaymentPatient, 
	onInvoiceDoubleClick, 
	onInvoiceDelete
}) => {

	var rows = [];
	if (data) {
		for (let key in data) {

			let item = data[key];
			rows.push(
				<InvoicesLine 
					key={key} 
					invoice={item} 
					toggleSECUPaid={onTogglePaymentCPAM} 
					togglePatientPaid={onTogglePaymentPatient} 
					toggleEdit={onInvoiceDoubleClick} 
					deleteLine ={onInvoiceDelete} />
			);
		}
	}

	return (
	    <tbody>
        	{rows}
        </tbody>
	);
}

function getCurrentMonthInvoices(state, currentMonth) {
	return state.months[currentMonth]? state.months[currentMonth].invoices : {};
}

const mapStateToProps = (state) => {
	return {
		data: getCurrentMonthInvoices(state, state.currentMonth)
	}
}

const mapDispatchToProps = (dispatch) => {
  	return {
    	onInvoiceDoubleClick: (line) => {
      		dispatch(actions.toggleEditMode(line));
    	},
    	onTogglePaymentPatient: (id, value) => {
    		dispatch(actions.togglePayment(id, [{
				op: "replace", path: "/patient_share/paid", value: !value
			}]));
    	},
    	onTogglePaymentCPAM: (id, value) => {
    		dispatch(actions.togglePayment(id, [{
				op: "replace", path: "/SECU_share/paid", value: !value
			}]));
    	},
    	onInvoiceDelete: (id) => {
    		dispatch(actions.requestDeleteLine(id));
    	},
    	onPersistInvoice: (data) => {
    		dispatch(actions.persist(data));
    	}
  	}
}

TableBody = connect(mapStateToProps, mapDispatchToProps)(TableBody);
export default TableBody;