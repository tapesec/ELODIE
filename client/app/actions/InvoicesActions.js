import AppDispatcher from './../dispatcher/AppDispatcher.js';
import InvoicesConstants from './InvoicesContants';

export default class InvoicesActions {
	
	static fetchFromServer(data) {
		AppDispatcher.dispatch({
			actionType: InvoicesConstants.FETCH_INVOICES_FROM_SERVER
		});
	}
};
