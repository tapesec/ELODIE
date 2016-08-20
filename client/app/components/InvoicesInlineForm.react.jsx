'use strict';

import React from 'react';
import InvoicesActions from './../actions/InvoicesActions.js';
import invoicesStore from './../stores/InvoicesStore.js';
import moment from 'moment';

require("!style!css!less!./../../css/InvoicesInlineForm.less");

export default class InvoicesInlineForm extends React.Component {


    constructor() {
        super();
        this.state = {
            date: moment.utc().format('YYYY-MM-DD'),
            patient_name: "",
            patient_share: {
                value: ""
            },
            SECU_share: {
                value: ""
            },
            submit_btn_name: "Ajouter",
            error_message: "",
            isClean: true
        };
    }

    componentDidMount() {
        invoicesStore.addToggleEditModListener(this._populateForm.bind(this));
    }

	render() {

		return (
            <row>
                <div className="col-lg-10 col-lg-offset-1">
                    <p className="text-danger">{this.state.error_message}</p>
                </div>
                <div className="col-lg-10 col-lg-offset-1">
                    <form onSubmit={this.handleSubmit.bind(this)} className="form-inline invoices-inline-form">

                      <div className="form-group">
                        <input 
                            value={moment.utc(this.state.date).format('YYYY-MM-DD')} 
                            onChange={this._handleDateChange.bind(this)} 
                            type="Date" 
                            className="form-control"/>

                      </div>
                      
                      <div className="form-group">
                        <input 
                            value={this.state.patient_name} 
                            onChange={this._handleNameChange.bind(this)} 
                            type="text" 
                            className="form-control" 
                            placeholder="Nom patient" />
                      </div>

                      <div className="form-group">
                        <input 
                            value={this.state.patient_share.value} 
                            onChange={this._handlePatientShareChange.bind(this)} 
                            type="Number" step="0.01"
                            className="form-control" 
                            placeholder="Part patient"/>
                      </div>

                      <div className="form-group">
                        <input 
                            value={this.state.SECU_share.value} 
                            onChange={this._handleSecuShareChange.bind(this)} 
                            type="Number" step="0.01"
                            className="form-control" 
                            placeholder="Part mutuelle"/>
                      </div>

                      <div className="form-group">
                        <button onClick={this._cleanForm.bind(this)} disabled={this.state.isClean} type="button" className="btn btn-warning"><span className="glyphicon glyphicon-chevron-left"></span> Effacer</button>
                        <button type="submit" className="pull-right btn btn-primary">{this.state.submit_btn_name}</button>
                      </div>

                  </form>
              </div>
          </row>
		);
	}

    _handleDateChange(e) {
        this.setState({
            date: e.target.value
        });
        this._checkIfClean(this.state);
    }

    _handleNameChange(e) {
        this.setState({
            patient_name: e.target.value
        });
        this._checkIfClean(this.state);
    }

    _handlePatientShareChange(e) {
        this.setState({
            patient_share: {
                value: e.target.value
            }
        });
        this._checkIfClean(this.state);
    }

    _handleSecuShareChange(e) {
        this.setState({
            SECU_share: {
                value: e.target.value
            }
        });
        this._checkIfClean(this.state);
    }


    handleSubmit(e) {
        e.preventDefault();
        if (this._isValidForm(this.state)) {
            InvoicesActions.addInvoice(this.state);
            this._cleanForm();
        } else {
            this.setState({
                error_message: "Tu n'as pas bien completé le formulaire bananette !"
            });
        }
    }

    _populateForm(data) {
        this.setState(data.dataToEdit);
        this.setState({ submit_btn_name: "Modifier", isClean: false });
    }

    _isValidForm(data) {

        if (data.patient_name == "" || data.patient_name.length < 2)
            return false;
        if (data.patient_share.value == "")
            return false
        if (data.SECU_share.value == "")
            return false;

        return true;
    }

    _cleanForm() {
        delete this.state;
        this.setState({
            date: moment.utc().format('YYYY-MM-DD'),
            patient_name: "",
            patient_share: {
                value: ""
            },
            SECU_share: {
                value: ""
            },
            submit_btn_name: "Ajouter",
            error_message: "",
            isClean: true
        });
    }

    _checkIfClean(data) {
       if (data.patient_name == "" &&
           data.patient_share == "" &&
           data.SECU_share == "")
        {
            this.setState({
                isClean: true
            });
        } else {
            this.setState({
                isClean: false
            });
        }
    }
};