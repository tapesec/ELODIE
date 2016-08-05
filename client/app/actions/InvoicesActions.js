import AppDispatcher from './../dispatcher/AppDispatcher.js';
import InvoicesConstants from './../constants/InvoicesConstants.js';

export default class InvoicesActions {
	
	static fetchFromServer() {
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.FETCH_INVOICES_FROM_SERVER
		});
	}

	static addInvoice(data) {
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.PERSIST_INVOICE,
			data: data
		});
	}
};
