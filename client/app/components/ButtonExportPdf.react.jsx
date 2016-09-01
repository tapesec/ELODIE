'use strict';

import React from 'react';
import classNames from 'classnames';

import InvoicesActions from './../actions/InvoicesActions.js';
import invoicesStore from './../stores/InvoicesStore.js';
import moment from 'moment';

require("!style!css!less!./../../css/ButtonExportPdf.less");

export default class ButtonExportPdf extends React.Component {

	constructor() {
        super();
        this.state = {
        	loading: false
        }
    }

    componentDidMount() {
        invoicesStore.addToggleLoadingPdfButtonListener(this._toggleOffSpinner.bind(this));
    }

	render() {

		let spinner = classNames({
      		'glyphicon glyphicon-refresh glyphicon-refresh-animate': this.state.loading
    	});

    	let disabled = classNames({
    		'disabled': this.state.loading
    	});
		
		return (

		    <button onClick={this._onRequestPdf.bind(this)} className={ disabled + " btn btn-success pull-right"}>
		    	<i className="fa fa-file-pdf-o" aria-hidden="true"></i> PDF <i className={spinner}></i>
		    </button>
		
		);
	}

	_onRequestPdf() {
		if (this.state.loading == false) {
			InvoicesActions.askExportPDF();
			this.setState({
				loading: true
			});	
		}
	}

	_toggleOffSpinner(toggle) {
		this.setState({
			loading: false
		});
	}


}
