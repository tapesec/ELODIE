'use strict';

import React from 'react';
import request from 'superagent';


export default class InvoicesInlineForm extends React.Component {

	render() {
		return (
		        
		        <tr>
		        	<td colSpan="5">
		        	<form className="form-inline">
		        		<input type="Date" />
		        	
  						<div className="form-group">
    						<input type="text" className="form-control" placeholder="MR DUPONT" />
  						</div>
  					
  						<div className="form-group">
  							<input type="Number" className="form-control" />
  						</div>
  					
  						<div className="form-group">
  							<input type="Number" className="form-control" />
  						</div>
  					
  						<button type="submit" className="btn btn-default">Ajouter</button>
  						</form>
  					</td>
		        </tr>
		        
		);
	}
};