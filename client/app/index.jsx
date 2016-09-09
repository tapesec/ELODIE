'use strict';

//require('expose?$!expose?jQuery!jquery');
require("font-awesome-webpack");

import React from 'react';
import {render} from 'react-dom';

import InvoicesStore from './stores/InvoicesStore.js';

import MonthSelector from './components/MonthSelector.react.jsx';
import InvoicesInlineForm from './components/InvoicesInlineForm.react.jsx';
import Table from './components/TableInvoices.react.jsx';
import ButtonExportPdf from './components/ButtonExportPdf.react.jsx';
import Spinner from './components/Spinner.react.jsx';

require("!style!css!less!./../css/index.less");




class Container extends React.Component {
	
	constructor() {
        super();
        this.state = null;
    }

    componentDidMount() {
    	InvoicesStore.addChangeListener(this._onStoreChange.bind(this));
    }

    componentWillUnmount() {
    	InvoicesStore.removeChangeListener();
    }

	render() {

		var monthSelectorArea, tableArea;

		if (this.state == null) {
			monthSelectorArea = <Spinner size="small" />
		} else {
			//console.log(this.state, 'state');
			monthSelectorArea = <MonthSelector date={ this.state.dateMonth }/>
		}

		if (this.state == null) {
			tableArea = <Spinner size="big" />
		} else {
			tableArea = <Table invoiceData={ this.state } />
		}

		return (
			<div className="container-fluid">
				<row>
					<div className="col-lg-10 col-lg-offset-1">
						<div className="page-header col-lg-12">
							<h1>
								<i className="fa fa-stethoscope"></i>&nbsp;
								ELODIE &nbsp; 
								<small>
									Tableau de gestion des paiments
									<ButtonExportPdf />
								</small>
							</h1>
						</div>
					</div>
				</row>
				<row>
					{ monthSelectorArea }
				</row>
				<row>
					<InvoicesInlineForm date={new Date().getTime()}/>
				</row>
				<row>
		    		<div className="col-lg-10 col-lg-offset-1">
						{ tableArea }
					</div>
				</row>
			</div>
		);
	}

	_onStoreChange() {
		//console.log("store changed ! setting new state for index ..", InvoicesStore.currentMonthData);
		if (InvoicesStore.currentMonthData) {
			this.setState(InvoicesStore.currentMonthData);
		}
	}
}


render(<Container/>, document.getElementById('app'));