import React from 'react';
import {render} from 'react-dom';
import { connect } from 'react-redux';
import moment from 'moment';


class Input extends React.Component {
	
	constructor() {
		//= ({date, name, update, type, value }) =>
		super();
	}

	onChange(event) {
		this.props.update(this.props.name, event.target.value);
	}

	render() {

		return (
	        <div className="form-group">
	            <input 
	                type="Date" 
	                className="form-control"
	                onChange={ this.onChange.bind(this) } 
	                value={ this.props.value } 
	                type={ this.props.type? this.props.type : "text"}
	                step={ this.props.step } 
	                placeholder={ this.props.placeholder }/>

	        </div>
		);

	}
	


}

Input = connect()(Input);




export default Input;