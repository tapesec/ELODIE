'use strict';

import React from 'react';
import moment from 'moment';
moment.locale('fr');
import classNames from 'classnames';
require("!style!css!less!./../../css/InvoicesLine.less");

import InvoicesActions from './../actions/InvoicesActions.js';


export default class InvoicesLine extends React.Component {


	render() {
		var item = this.props.data;

		var lineChecked = classNames({
      		'striped success': item.patient_share.paid && item.SECU_share.paid
    	});

		return (    

			<tr onDoubleClick={this._onDoubleClick.bind(this)} className={lineChecked + " pointer"}>
				<td className="date-line">{ moment(item.date).format('dddd DD MMMM') }</td>
				<td>{ item.patient_name }</td>
				<td>
					{ item.patient_share.value } 
					<input 
						className="pull-right" 
						onChange={this._onTogglePatientPaid.bind(this)} 
						type="checkbox" 
						checked={ item.patient_share.paid }/>
				</td>
				<td>
					{ item.SECU_share.value }
					<input 
						className="pull-right" 
						onChange={this._onToggleSECUPaid.bind(this)} 
						type="checkbox" 
						checked={ item.SECU_share.paid }/>
				</td>
				<td>{ (item.patient_share.value + item.SECU_share.value).toFixed(2) }</td>
				<td>{ item.total_paid_per_line } € <span onClick={this._onDelete.bind(this)} className="pull-right glyphicon glyphicon-trash"></span></td>
			</tr>

		);
	}

	_onTogglePatientPaid(e) {
		InvoicesActions.updatePayment(this.props.data._id, 
			[{
				op: "replace", path: "/patient_share/paid", value: !this.props.data.patient_share.paid
			}]
		);
	}

	_onToggleSECUPaid(e) {
		InvoicesActions.updatePayment(this.props.data._id, 
			[{
				op: "replace", path: "/SECU_share/paid", value: !this.props.data.SECU_share.paid
			}]
		);
	}

	_onDelete() {
		InvoicesActions.removeLine(this.props.data._id);
	}

	_onDoubleClick(e) {
		InvoicesActions.toggleEditMode(this.props.data._id, this.props.data);
	}
};