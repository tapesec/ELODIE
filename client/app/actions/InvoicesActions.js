import AppDispatcher from './../dispatcher/AppDispatcher.js';
import InvoicesConstants from './../constants/InvoicesConstants.js';

export default class InvoicesActions {
	
	static fetchFromServer(timestamp) {
		console.log("action controller dispatch fetch from server ..");
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.FETCH_INVOICES_FROM_SERVER,
			data: { date: timestamp }
		});
	}

	static addInvoice(data) {
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.PERSIST_INVOICE,
			data: data
		});
	}

	static updatePayment(id, patch_describer) {
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.TOGGLE_PAYMENT,
			data: { id, patch_describer }
		});
	}

	static toggleEditMode(id, dataToEdit) {
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.TOGGLE_EDIT_LINE,
			data: { id, dataToEdit }
		});	
	}

	static removeLine(id) {
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.REMOVE_LINE,
			data: { id }
		});	
	}
};
