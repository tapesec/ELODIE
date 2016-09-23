import InvoicesDao from './../dao/InvoicesDao.js';
import moment from 'moment';


export const CHANGE_MONTH = 'CHANGE_MONTH';
export const TOGGLE_EDITION_MODE = 'TOGGLE_EDITION_MODE';
export const TOGGLE_PATIENT_PAYMENT = 'TOGGLE_PATIENT_PAYMENT';
export const TOGGLE_CPAM_PAYMENT = 'TOGGLE_CPAM_PAYMENT';
export const DELETE_LINE = 'DELETE_LINE';
export const PERSIST_LINE = "PERSIST_LINE";
export const PREV_MONTH = "PREV_MONTH";
export const NEXT_MONTH = "NEXT_MONTH";
export const REQUEST_INVOICES = 'REQUEST_INVOICES';
export const RECEIVE_INVOICES = 'RECEIVE_INVOICES';
export const UPDATE_FORM = 'UPDATE_FORM';
export const CLEAN_FORM = 'CLEAN_FORM';
export const FORM_ERROR_MESSAGE = 'FORM_ERROR_MESSAGE';
export const REQUEST_PDF = 'REQUEST_PDF';
export const RECEIVE_PDF = 'RECEIVE_PDF';


// trigger le changement du mois en haut du tableau
export function changeMonth(month) {
	return {
		type: CHANGE_MONTH,
		payload: {
			month
		}
	};
}

export function toggleEditMode(line) {
	return {
		type: TOGGLE_EDITION_MODE,
		payload: line
	};
}


export function togglePayment(id, patch_describer) {
	return (dispatch, getState) => {
		return InvoicesDao.update({id, patch_describer})
			.then(() => {
			      	if (patch_describer[0].path == "/patient_share/paid")
			      		return dispatch(togglePatientPayment(id, patch_describer[0].value))
			      	if (patch_describer[0].path == "/SECU_share/paid")
			      		return dispatch(toggleCPAMPayment(id, patch_describer[0].value))
			      },
			      (err) => new Promise((resolve, reject) => {
			      		reject(err);
			      }))
	}
}

export function togglePatientPayment(id, flag) {
	return {
		type: TOGGLE_PATIENT_PAYMENT,
		payload: {
			id,
			flag
		}
	};
}

export function toggleCPAMPayment(id, flag) {
	return {
		type: TOGGLE_CPAM_PAYMENT,
		payload: {
			id,
			flag
		}
	};
}

export function requestDeleteLine(id) {
	return (dispatch, getState) => {
		return InvoicesDao.remove({id})
			.then(
			    () => dispatch(deleteLine(id)), 
			    () => new Promise((resolve, reject) => {
    						resolve();
				})
			);
	}
	
}

export function deleteLine(id) {
	return {
		type: DELETE_LINE,
		payload: {
			id
		}
	};
}

export function updateForm(name, value) {
	return {
		type: UPDATE_FORM,
		payload: {
			name, value
		}
	};
}

export function cleanForm() {
	return {
		type: CLEAN_FORM
	};
}

export function showFormErrorMessage(message) {
	return {
		type: FORM_ERROR_MESSAGE,
		payload: {
			message
		}
	};
}

export function requestInvoices() {
  	return {
    	type: REQUEST_INVOICES
  	};
}

export function receiveInvoices(data) {
  	return {
    	type: RECEIVE_INVOICES,
    	payload: {
    		data
    	}
  	};
}

export function requestPDF() {
	return {
		type: REQUEST_PDF
	};
}

export function receivePDF() {
	return {
		type: RECEIVE_PDF
	};
}


export function persistInvoice() {
	return (dispatch, getState) => {
		dispatch(requestInvoices());
		return InvoicesDao.persist(getState().lineToEdit, getState().formContent)
			.then(() => {
				let month = moment(getState().formContent.date).startOf('month').valueOf();
				dispatch(cleanForm());
				dispatch(changeMonth(month));
				dispatch(fetchInvoices(month));
			});
	}
}

export function fetchInvoices(date) {
	return dispatch => {
		dispatch(requestInvoices());
		return InvoicesDao.getAll({date})
			.then(data => dispatch(receiveInvoices(data)));
	}
}

export function shouldFetchInvoices(state, date) {
  	const currentMonthData = state.months[date];
  	if (!currentMonthData) {
    	return true
  	}
  	return false;
}

export function fetchInvoicesIfNeeded(date) {
  	return (dispatch, getState) => {
    	if (shouldFetchInvoices(getState(), date)) {
      		return dispatch(fetchInvoices(date));
    	} else {
    		return new Promise((resolve, reject) => {
    			resolve();
    		});
    	}
  	}
}

export function generatePdf() {
	return (dispatch, getState) => {
		dispatch(requestPDF());
		return InvoicesDao.getPDF({date: getState().currentMonth})
			.then(
			    (response) => {
			    	dispatch(receivePDF());
			    	var tempLink;
					tempLink = document.createElement('a');
					tempLink.href = "/download/pdf/"+response.filename;
					tempLink.setAttribute('download', response.filename);
					tempLink.click();
				},
				() => new Promise((resolve, reject) => {

				})
			);
	}
}