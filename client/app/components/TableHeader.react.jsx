import React from 'react';

const TableHeader = ({totals}) => {

	return (
        <thead>
			<tr>
				<th>Date</th>
				<th>Nom</th>
				<th>Patient ({ totals.total_patient_share }€)</th>
				<th>CPAM ({ totals.total_SECU_share }€)</th>
				<th>Total ({ totals.total_global_no_paid }€)</th>
				<th>Payé ({ totals.total_global_paid }€)</th>
			</tr>
		</thead>
	);
}

export default TableHeader;