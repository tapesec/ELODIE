'use strict';

//require('expose?$!expose?jQuery!jquery');
require("font-awesome-webpack");

import React from 'react';
import {render} from 'react-dom';
import MonthSelector from './components/MonthSelector.react.js';
import InvoicesInlineForm from './components/InvoicesInlineForm.react.jsx';
import Table from './components/TableInvoices.react.jsx';
import ButtonExportPdf from './components/ButtonExportPdf.react.jsx';

require("!style!css!less!./../css/index.less");




class Container extends React.Component {
	
	render() {
		return (
			<div className="container-fluid">
				<row>
					<div className="col-lg-10 col-lg-offset-1">
						<div className="page-header col-lg-12">
							<h1>
								<i className="fa fa-stethoscope"></i> ELODIE <small>Tableau de gestion des paiments <ButtonExportPdf /></small>
							</h1>
						</div>
					</div>
				</row>
				<MonthSelector />
				<InvoicesInlineForm key={new Date().getTime()}/> 
				<Table ressource="/invoices" />
			</div>
		);
	}
}


render(<Container/>, document.getElementById('app'));