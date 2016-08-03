'use strict';

import AppDispatcher from './../dispatcher/AppDispatcher.js';
import AppConstants from './../constants/InvoicesConstants.js';
import InvoicesDao from './../InvoicesDao.js';
import { EventEmitter } from 'events';

var CHANGE_EVENT = 'change';
//var _invoices = {};


class InvoicesStore extends EventEmitter {

	constructor() {
		super();
		this._invoices = 
			{	
				["1a2b"]: {
					id: new Date().getTime(),
					date: new Date(),
					patient_name: "DUPOUY",
					patient_share: 11.12,
					SECU_share: 102.43,
					paid: false
				},
				["3d4e"]: {
					id: new Date().getTime(),
					date: new Date(),
					patient_name: "MARTIN",
					patient_share: 14.12,
					SECU_share: 402.43,
					paid: false	
				}
				
			};
	}

	getAll() {

		return this._invoices;
		/*if (!this._cache) {
			return new Promise(function(resolve, reject) {
				InvoicesDao.getAll()
				.then(function(data) {
					this._cache = data;
					resolve(that._cache);
				}.bind(this), function(err) {
					reject(err);		
				});
			});
			

		} else {
			return new Promise(function(resolve, reject) {
				resolve(this._cache);
			});
		}*/
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
	var action = payload.action;
	switch(action.actionType) {
		
		case AppConstants.FETCH_INVOICES_FROM_SERVER:
			invoicesStore.getAll();
			invoicesStore.emitChange();
		break;
		default:
	}

});

export default invoicesStore;