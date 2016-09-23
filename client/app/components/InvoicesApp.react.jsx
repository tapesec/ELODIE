'use strict';

//require('expose?$!expose?jQuery!jquery');
require("font-awesome-webpack");

import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';

import * as actions from '../actions';

import MonthSelector from './MonthSelector.react.jsx';
import InvoicesInlineForm from './InvoicesInlineForm.react.jsx';
import Table from './Table.react.jsx';
import ButtonExportPdf from './ButtonExportPdf.react.jsx';
import Spinner from './Spinner.react.jsx';

require("!style!css!less!./../../css/index.less");


class Invoices extends React.Component { 
	
	constructor(props) {
		super(props);
	}

	componentDidMount() {
    	const { currentMonth, getPdf } = this.props;
    	this.props.fetchInvoicesIfNeeded(this.props.currentMonth);
  	}

  	componentWillReceiveProps(nextProps) {
    	if (nextProps.currentMonth !== this.props.currentMonth) {
      		const { currentMonth, isLoading } = nextProps;
      		this.props.fetchInvoicesIfNeeded(this.props.currentMonth);
    	}
  	}

	render () {
			
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
									<ButtonExportPdf 
										loading={this.props.isLoading}
										generatePdf={this.props.getPdf} />
								</small>
							</h1>
						</div>
					</div>
				</row>
				<row>
					<MonthSelector />
				</row>
				<row>
					<InvoicesInlineForm />
				</row>
				<row>
		    		<div className="col-lg-10 col-lg-offset-1">
						<Table />
					</div>
				</row>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentMonth: state.currentMonth,
		isLoading: state.isLoadingPdf
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getPdf: () => dispatch(actions.generatePdf()),
		fetchInvoicesIfNeeded: (currentMonth) => dispatch(actions.fetchInvoicesIfNeeded(currentMonth))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoices);