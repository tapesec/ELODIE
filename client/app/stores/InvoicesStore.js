'use strict';

import moment from 'moment';

import AppDispatcher from './../dispatcher/AppDispatcher.js';
import AppConstants from './../constants/InvoicesConstants.js';
import InvoicesDao from './../dao/InvoicesDao.js';
import InvoicesActions from './../actions/InvoicesActions.js';

import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change'
,	  TOGGLE_EDIT_LINE = 'toggle_edit'
,	  TOGGLE_OFF_PDF_SPINNER = "TOGGLE_OFF_PDF_SPINNER";


class InvoicesStore extends EventEmitter {

	constructor() {
		super();
		this._data = {
			currentMonth: moment(new Date().getTime()).startOf('month').valueOf(),
			invoices: {}
		};
	}

	// getters ..

	get data() {
		return this._data;
	}

	get currentMonthData() {
		if (this._data.invoices[this._data.currentMonth]) 
			return this._data.invoices[this._data.currentMonth];
		else
			return null;
	}

	get currentMonth() {
		return this._data.currentMonth;
	}

	// Les méthodes du store ..

	/***
	* @description récupère sur le serveur les données du mois passé en paramètre 
	* si le store ne les contient pas change l'attribut du mois courrant et notify que le store a changé
	* @param {object date} timestamp du 1er jour du mois
	*/
	setCurrentMonthData(param) {
		//console.log('setCurrentMonthData fired !');
		if (this._data.invoices[param.date]) {
			this._data.currentMonth = param.date;
			//console.log("currentMonthData allready exist fetching it ..");
			this.emitChange();
		} else {
			//console.log("currentMonthData doesn't exist fetching it from server ..");
			InvoicesDao
				.getAll(param)
				.then((data) => {
					//console.log(data, 'currentMonthData fetched from server ..');
					this._data.invoices[param.date] = data;
					this._data.currentMonth = param.date;
					//console.log(this._data, 'full store data');
					this.emitChange();
				}, (err) => {
					alert(err.message);
				});
		}		
	}

	/***
	* @description sauvegarde une nouvelle ligne ou modifie une ligne existante
	*/
	save(data) {
		var monthToRefresh = moment(data.date).startOf('month').valueOf();

		if (data._id) {

			let patch_describer = [
				{ op: 'replace', path: '/date', value: data.date },
				{ op: 'replace', path: '/patient_name', value: data.patient_name },
				{ op: 'replace', path: '/patient_share/value', value: data.patient_share.value },
				{ op: 'replace', path: '/SECU_share/value', value: data.SECU_share.value }
			];

			InvoicesDao.update({ id: data._id, patch_describer: patch_describer })
			.then((statusCode) => {
				this.cleanThisMonth(monthToRefresh);
				this.setCurrentMonthData({ date: monthToRefresh });
			}, (err) => {
				// do something in case of error
			});

		} else {
			InvoicesDao.save(data)
			.then((statusCode) => {
				this.cleanThisMonth(monthToRefresh);
				this.setCurrentMonthData({ date: monthToRefresh });
			}, (err) => {
				// do something in case of error
			});
		}

	}

	/***
	* @description retire du store les données du mois passé en paramètre
	*/
	cleanThisMonth(month) {
		delete this._data.invoices[month];
	}

	/***
	* @description met à jour le status payé ou non d'une ligne de paiement 
	*/
	togglePayment(data) {

		InvoicesDao.update(data)
		.then((statusCode) => {
			this.cleanThisMonth(this.currentMonth);
			this.setCurrentMonthData({ date: this.currentMonth });
		}, (err) => {
			// do something in case of error
		});
	}

	/***
	* @description supprime une ligne
	*/
	removeLine(data) {

		InvoicesDao.remove(data)
		.then((statusCode) => {
			this.cleanThisMonth(this.currentMonth);
			this.setCurrentMonthData({ date: this.currentMonth });
		}, (err) => {
			// do something in case of error
		});
	}

	/***
	* @description génère sur le serveur un pdf avec les données 
	* du mois courrant puis télécharge le pdf
	*/
	getCurrentMonthPDF() {

		InvoicesDao.getPDF({ date: this.currentMonth })
		.then((response) => {
			// crée une balise a virtuel pour simuler le click vers le document
			var tempLink;
			tempLink = document.createElement('a');
			tempLink.href = "/download/pdf/"+response.filename;
			tempLink.setAttribute('download', response.filename);
			tempLink.click();
			invoicesStore.notifyPDFready();

		}, (err) => {
			// do something in case of error
		});
	}

	// les notifications ..

	toggleEditLine(data) {
		this.emit(TOGGLE_EDIT_LINE, data);
	}

	emitChange(param=null) {
		//console.log("emit store changed !");
		this.emit(CHANGE_EVENT, param);
	}

	notifyPDFready() {
		this.emit(TOGGLE_OFF_PDF_SPINNER);
	}

	// les listeners ..

	addChangeListener(callback) {
		console.log("start listening store change ..");
		this.on(CHANGE_EVENT, callback);
	}

	addToggleEditModListener(callback) {
		this.on(TOGGLE_EDIT_LINE, callback);
	}

	addToggleLoadingPdfButtonListener(callback) {
		this.on(TOGGLE_OFF_PDF_SPINNER, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	removeToggleEditModListener(callback) {
		this.removeListener(TOGGLE_EDIT_LINE, callback);
	}

	removeLoadingPdfButtonListener(callback) {
		this.removeListener(TOGGLE_OFF_PDF_SPINNER, callback);
	}
	
};

var invoicesStore = new InvoicesStore();
invoicesStore.setCurrentMonthData({ date: invoicesStore.currentMonth });


AppDispatcher.register(function(payload) {
	
	switch(payload.actionType) {
		
		case AppConstants.NOTIFY_CURRENT_MONTH:
			invoicesStore.setCurrentMonthData(payload.data);
		break;
		case AppConstants.PERSIST_INVOICE:
			invoicesStore.save(payload.data);
		break;
		case AppConstants.TOGGLE_PAYMENT:
			invoicesStore.togglePayment(payload.data);
		break;
		case AppConstants.TOGGLE_EDIT_LINE:
			invoicesStore.toggleEditLine(payload.data);
		break;
		case AppConstants.REMOVE_LINE:
			invoicesStore.removeLine(payload.data);
		break;
		case AppConstants.GET_PDF:
			invoicesStore.getCurrentMonthPDF();
		break;
	}

});

export default invoicesStore;