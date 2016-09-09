import React from 'react';


require("!style!css!less!./../../css/ButtonExportPdf.less");

export default class Spinner extends React.Component {

	render() {

		return (
			<div className="col-lg-offset-2 col-lg-offset-8">
				<i className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></i>
			</div>
		);
	}
}