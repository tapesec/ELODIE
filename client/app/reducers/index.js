import hat from 'hat'; // générateur d'id unique
import moment from 'moment';
import immutable from 'immutable';
import _ from 'lodash';

import {
	CHANGE_MONTH, 
	TOGGLE_EDITION_MODE,
	TOGGLE_PATIENT_PAYMENT,
	TOGGLE_CPAM_PAYMENT,
	DELETE_LINE,
	PERSIST_LINE,
	PREV_MONTH,
	NEXT_MONTH,
	REQUEST_INVOICES,
	RECEIVE_INVOICES,
	UPDATE_FORM,
	CLEAN_FORM,
	FORM_ERROR_MESSAGE,
	REQUEST_PDF,
	RECEIVE_PDF } from '../actions/';

const currentMonth = moment(new Date().getTime()).startOf('month').valueOf();

const initialState = {

	currentMonth,
	months: {},
	formContent: {
		date: new Date().getTime()
	},
	lineToEdit: null,
	isLoading: false,
	isLoadingPdf: false

};


export default function invoiceTable(state=initialState, action) {

	var newState;

	switch (action.type) {
		
		case CHANGE_MONTH:
			return Object.assign({}, state, {
				currentMonth: action.payload.month
			});
		break;
		case TOGGLE_EDITION_MODE:
			newState = _.cloneDeep(state);
			newState.formContent = _.omit(action.payload, '_id');
			newState.lineToEdit = action.payload._id;
			return newState;
		break;
		case TOGGLE_PATIENT_PAYMENT:
			newState = _.cloneDeep(state);
			
			var line = newState.months[state.currentMonth].invoices[action.payload.id];
			line.patient_share.paid = !line.patient_share.paid;

			var totals = newState.months[state.currentMonth].totals;
			var value = parseFloat(line.patient_share.value);

			if (action.payload.flag) {
				line.total_line_paid += value;
				totals.total_global_paid = parseFloat(totals.total_global_paid) + value;
			} else {
				line.total_line_paid -= value;
				totals.total_global_paid = parseFloat(totals.total_global_paid) - value;
			}
			return newState;
		break;
		case TOGGLE_CPAM_PAYMENT:
			newState = _.cloneDeep(state);
			
			var line = newState.months[state.currentMonth].invoices[action.payload.id];
			line.SECU_share.paid = !line.SECU_share.paid;

			var totals = newState.months[state.currentMonth].totals;
			var value = parseFloat(line.SECU_share.value);

			if (action.payload.flag) {
				line.total_line_paid += value;
				totals.total_global_paid = parseFloat(totals.total_global_paid) + value;
			} else {
				line.total_line_paid -= value;
				totals.total_global_paid = parseFloat(totals.total_global_paid) - value;
			}

			return newState;
		break;
		case DELETE_LINE:
			newState = _.cloneDeep(state);
			delete newState.months[newState.currentMonth].invoices[action.payload.id];
			return newState;
		break; 
		case REQUEST_INVOICES:
			return Object.assign({}, state, {
				isLoading: true
			});
		break;
		case RECEIVE_INVOICES:
			newState = _.cloneDeep(state);
			newState.isLoading = false;
			newState.currentMonth = action.payload.data.dateMonth;
			newState.months[action.payload.data.dateMonth] = action.payload.data;
			return newState;
		break;
		case UPDATE_FORM:
			newState = _.cloneDeep(state);
			newState.formContent[action.payload.name] = action.payload.value;
			return newState;
		break;
		case CLEAN_FORM:
			return Object.assign({}, state, { 
				lineToEdit: null, 
				formContent: {
					date: new Date().getTime()
				}
			});
		break;
		case FORM_ERROR_MESSAGE:
			newState = Object.assign({}, state);
			newState.formContent.error_message = action.payload.message
			return newState;
		break;
		case REQUEST_PDF:
			return Object.assign({}, state, {
				isLoadingPdf: true
			});
		break;
		case RECEIVE_PDF:
			return Object.assign({}, state, {
				isLoadingPdf: false
			});
		break;
		default:
			return state;
	}
}