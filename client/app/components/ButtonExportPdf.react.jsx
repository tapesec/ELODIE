'use strict';

import React from 'react';
import InvoicesActions from './../actions/InvoicesActions.js';
import invoicesStore from './../stores/InvoicesStore.js';
import moment from 'moment';

export default class ButtonExportPdf extends React.Component {

	render() {
		
		return (

		    <button onClick={this._onRequestPdf.bind(this)} className="btn btn-success pull-right">
		    	<i className="fa fa-file-pdf-o" aria-hidden="true"></i> PDF
		    </button>
		
		);
	}

	_onRequestPdf() {
		InvoicesActions.askExportPDF();
	}


}
