'use strict';

import React from 'react';
import classNames from 'classnames';
import moment from 'moment';

require("!style!css!less!./../../css/ButtonExportPdf.less");

export default class ButtonExportPdf extends React.Component {

	constructor(props) {
        super(props);
        console.log(this.props, 'this props');
    }

	render() {

		let spinner = classNames({
      		'glyphicon glyphicon-refresh glyphicon-refresh-animate': this.props.loading
    	});

    	let disabled = classNames({
    		'disabled': this.props.loading
    	});
		
		return (

		    <button onClick={() => this.props.generatePdf()} className={ disabled + " btn btn-success pull-right"}>
		    	<i className="fa fa-file-pdf-o" aria-hidden="true"></i> PDF <i className={spinner}></i>
		    </button>
		
		);
	}

}
