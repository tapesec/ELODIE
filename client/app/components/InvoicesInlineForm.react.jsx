'use strict';

import React from 'react';
import request from 'superagent';
import InvoicesActions from './../actions/InvoicesActions.js';


export default class InvoicesInlineForm extends React.Component {


    constructor() {
        super();
        this.state = {
            date: "",
            patient_name: "",
            patient_share: 0,
            SECU_share: 0
        };
    }

	render() {
		return (
              <row>
                  
                  <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className="form-group col-lg-3">
                        <input value={this.state.date} onChange={this._handleDateChange.bind(this)} type="Date" className="form-control"/>
                      </div>
                      
                      <div className="form-group col-lg-3">
                        <input value={this.state.patient_name} onChange={this._handleNameChange.bind(this)} type="text" className="form-control" placeholder="MR DUPONT" />
                      </div>

                      <div className="form-group col-lg-2">
                        <input value={this.state.patient_share} onChange={this._handlePatientShareChange.bind(this)} type="Number" className="form-control" placeholder="Part patient"/>
                      </div>

                      <div className="form-group col-lg-2">
                        <input value={this.state.SECU_share} onChange={this._handleSecuShareChange.bind(this)} type="Number" className="form-control" placeholder="Part mutuelle"/>
                      </div>

                      <div className="form-group col-lg-2">
                        <button type="submit" className="btn btn-default">Ajouter</button>
                      </div>
                  </form>

              </row>
		);
	}

    _handleDateChange(e) {
        this.setState({
            date: e.target.value
        });
    }

    _handleNameChange(e) {
        this.setState({
            patient_name: e.target.value
        });
    }

    _handlePatientShareChange(e) {
        this.setState({
            patient_share: e.target.value
        });
    }

    _handleSecuShareChange(e) {
        this.setState({
            SECU_share: e.target.value
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        InvoicesActions.addInvoice(this.state);
        this.setState({
            date: "",
            patient_name: "",
            patient_share: 0,
            SECU_share: 0
        });
    }
};