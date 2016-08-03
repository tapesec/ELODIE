'use strict';

require('expose?$!expose?jQuery!jquery');

import React from 'react';
import {render} from 'react-dom';
import Table from './tableInvoices.jsx';

class Container extends React.Component {
	
	render() {
		return (
			<div className="container">
				<div className="col-lg-8 col-lg-offset-2">
					<h1>ELODIE</h1>
					<Table ressource="/invoices" />
				</div>
			</div>
		);
	}
}


render(<Container/>, document.getElementById('app'));