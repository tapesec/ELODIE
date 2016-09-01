'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher.js';
import AppConstants from './../constants/InvoicesConstants.js';
import InvoicesDao from './../dao/InvoicesDao.js';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change'
,	  TOGGLE_EDIT_LINE = 'toggle_edit'
,	  MONTH_SELECTOR_NOTIFIED = "month_notified"
,	  MONTH_SELECTOR_NOTIFIED_PDF = "month_notified_pdf"
,	  TOGGLE_OFF_PDF_SPINNER = "TOGGLE_OFF_PDF_SPINNER";


class InvoicesStore extends EventEmitter {

	constructor() {
		super();
		this._invoices = {};
	}

	getAll(dateParams) {
		
		return new Promise((resolve, reject) => {
			this._invoices = {};
			InvoicesDao.getAll(dateParams)
			.then((data) => {
				data.forEach((invoice) => {
					this._invoices[invoice._id] = invoice;
				});
				resolve(this._invoices);
			}, (err) => {
				reject(err);		
			});

		});
	}

	save(data) {

		return new Promise((resolve, reject) => {
			if (data._id) {
				let patch_describer = [
					{ op: 'replace', path: '/date', value: data.date },
					{ op: 'replace', path: '/patient_name', value: data.patient_name },
					{ op: 'replace', path: '/patient_share/value', value: data.patient_share.value },
					{ op: 'replace', path: '/SECU_share/value', value: data.SECU_share.value }
				];

				InvoicesDao.update({ id: data._id, patch_describer: patch_describer })
				.then((statusCode) => {
					resolve(statusCode);
				}, (err) => {
					// do something in case of error
					reject(err);
				});

			} else {
				InvoicesDao.save(data)
				.then((statusCode) => {
					resolve(statusCode);
				}, (err) => {
					// do something in case of error
					reject(err);
				});
			}
		});
	}

	togglePayment(data) {
		return new Promise((resolve, reject) => {
			InvoicesDao.update(data)
			.then((statusCode) => {
				resolve(statusCode);
			}, (err) => {
				// do something in case of error
				reject(err);
			});
		});	
	}

	removeLine(data) {
		return new Promise((resolve, reject) => {
			InvoicesDao.remove(data)
			.then((statusCode) => {
				resolve(statusCode);
			}, (err) => {
				// do something in case of error
				reject(err);
			});
		});
	}

	getPDF(data) {
		return new Promise((resolve, reject) => {
			InvoicesDao.getPDF(data)
			.then((statusCode) => {
				resolve(statusCode);
			}, (err) => {
				// do something in case of error
				reject(err);
			});
		});	
	}

	toggleEditLine(data) {
		this.emit(TOGGLE_EDIT_LINE, data);
	}

	emitChange(param) {
		console.log("emit change with param "+param);
		this.emit(CHANGE_EVENT, param);
	}

	notifyMonthSelector() {
		this.emit(MONTH_SELECTOR_NOTIFIED);
	}

	notifyMonthSelectorNeedPDF() {
		setTimeout(function() {
			this.emit(MONTH_SELECTOR_NOTIFIED_PDF);		
		}.bind(this), 200);
		
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	addToggleEditModListener(callback) {
		this.on(TOGGLE_EDIT_LINE, callback);
	}

	addMonthSelectorListener(callback) {
		this.on(MONTH_SELECTOR_NOTIFIED, callback);
	}

	addMonthSelectorPDFListener(callback) {
		this.on(MONTH_SELECTOR_NOTIFIED_PDF, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	notifyPDFready() {
		this.emit(TOGGLE_OFF_PDF_SPINNER);
	}

	addToggleLoadingPdfButtonListener(callback) {
		this.on(TOGGLE_OFF_PDF_SPINNER, callback);
	}
	
};

var invoicesStore = new InvoicesStore();

AppDispatcher.register(function(payload) {
	
	switch(payload.actionType) {
		
		case AppConstants.FETCH_INVOICES_FROM_SERVER:
			//invoicesStore.getAll(payload.data).then((data) => {
				invoicesStore.emitChange(payload.data);
			//});
		break;
		case AppConstants.PERSIST_INVOICE:
			invoicesStore.save(payload.data).then((response) => {
				invoicesStore.notifyMonthSelector();
			}, function(err) {
				//emit something about error
			});
		break;
		case AppConstants.TOGGLE_PAYMENT:
			invoicesStore.togglePayment(payload.data).then((response) => {
				invoicesStore.notifyMonthSelector();
			}, function(err) {
				//emit something about error
			});
		break;
		case AppConstants.TOGGLE_EDIT_LINE:
			invoicesStore.toggleEditLine(payload.data);
		break;
		case AppConstants.REMOVE_LINE:
			invoicesStore.removeLine(payload.data).then((response) => {
				invoicesStore.notifyMonthSelector();
			}, function(err) {
				//emit something about error
			});
		break;
		case AppConstants.ASK_PDF:
			invoicesStore.notifyMonthSelectorNeedPDF();
		break;
		case AppConstants.GET_PDF:
			invoicesStore.getPDF(payload.data).then((response) => {
				// crée une balise a virtuel pour simuler le click vers le document
				var tempLink;
				tempLink = document.createElement('a');
				tempLink.href = "/download/pdf/"+response.filename;
				tempLink.setAttribute('download', response.filename);
				tempLink.click();
				invoicesStore.notifyPDFready();
			});
		break;

						
		default:
	}

});

export default invoicesStore;