'use strict';

import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import * as actions from '../actions';

import Field from './Input.react.jsx';

require("!style!css!less!./../../css/InvoicesInlineForm.less");

class InvoicesInlineForm extends React.Component {

    

    componentDidMount() {
        const { dispatch, isValidForm, errorMessage, formContent } = this.props;
        console.log(this.props, 'PROPS');
    }

    render() {

        let inputs = {};

        return (
            <div>
                <div className="col-lg-10 col-lg-offset-1">
                    <p className="text-danger">{this.props.errorMessage}</p>
                </div>
                <div className="col-lg-10 col-lg-offset-1">
                    <form 
                        onSubmit={(event) => {
                            this.props.onSubmitForm(event, isValidForm);
                        }} 
                        className="form-inline invoices-inline-form">

                        {/* date*/}
                        <Field 
                            name="date" 
                            type="date" 
                            value={ this.props.formContent.date? 
                                moment.utc(this.props.formContent.date).format('YYYY-MM-DD') : moment.utc(new Date()).format('YYYY-MM-DD')
                            } 
                            update={this.props.onChangeInput.bind(this)} />
                        
                        {/*nom du patient*/}
                        <Field 
                            name="patient_name" 
                            value={ this.props.formContent.patient_name?
                                this.props.formContent.patient_name : ""
                            } 
                            placeholder="Nom du patient" 
                            update={this.props.onChangeInput.bind(this)} />

                        {/*part patient*/}
                        <Field 
                            name="patient_share_value" 
                            type="Number" step="0.01" 
                            value={ this.props.formContent.patient_share_value? 
                                this.props.formContent.patient_share_value : ""
                            } 
                            placeholder="Part patient" 
                            update={this.props.onChangeInput.bind(this)} />

                        {/*part CPAM*/}
                        <Field 
                            name="SECU_share_value" 
                            type="Number" step="0.01" 
                            value={ this.props.formContent.SECU_share_value?
                                this.props.formContent.SECU_share_value : ""
                            } 
                            placeholder="Part CPAM" 
                            update={this.props.onChangeInput.bind(this)} />


                        <div className="form-group">
                            <button 
                                onClick={this.props.clean} 
                                type="button" 
                                className="btn btn-warning"
                                disabled={this.props.deleteBtnStatus}>
                                <span className="glyphicon glyphicon-chevron-left"></span> Effacer
                            </button>
                            <button 
                                type="submit" 
                                className="pull-right btn btn-primary">
                                    {this.props.labelBtnSubmit}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const getFormContent = (line) => line;
const setLabelBtnSubmit = (id) => id? "Modifier" : "Ajouter";
const getDeleteBtnStatus = (line) => _.isEmpty(line)? true : false;
const getErrorMessage = (line) => line.error_message? line.error_message : "";
const isValidForm = (line) => {
    if (line.patient_name != "" && 
        line.patient_share_value != "" && 
        line.SECU_share_value != ""
    ) {
        return true;
    } else {
        return false;
    }
}

const mapStateToProps = (state) => {
    return {
        formContent: getFormContent(state.formContent),
        date: new Date().getTime(),
        labelBtnSubmit: setLabelBtnSubmit(state.lineToEdit),
        deleteBtnStatus: getDeleteBtnStatus(state.formContent),
        errorMessage: getErrorMessage(state.formContent),
        isValidForm: isValidForm(state.formContent)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
        onChangeInput: (name, value) => {
            dispatch(actions.updateForm(name, value));
        },
        clean: () => {
            dispatch(actions.cleanForm());
        },
        onSubmitForm: (event, isValidForm) => {
            event.preventDefault();
            if (isValidForm) {
                dispatch(actions.persistInvoice());
            } else {
                dispatch(action.showFormErrorMessage);
            }
            return false;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoicesInlineForm);