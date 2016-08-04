'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher.js';
import AppConstants from './../constants/InvoicesConstants.js';
import InvoicesDao from './../dao/InvoicesDao.js';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';
//var _invoices = {};


class InvoicesStore extends EventEmitter {

	constructor() {
		super();
		this._invoices = {};
	}

	getAll() {
		
		return new Promise((resolve, reject) => {

			InvoicesDao.getAll()
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

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
	
};

var invoicesStore = new InvoicesStore();

AppDispatcher.register(function(payload) {
	
	switch(payload.actionType) {
		
		case AppConstants.FETCH_INVOICES_FROM_SERVER:
			invoicesStore.getAll().then((data) => {
				invoicesStore.emitChange();
			});
		break;
		default:
	}

});

export default invoicesStore;