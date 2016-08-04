import request from 'superagent';

export default class InvoicesDao {

	static getAll() {
		return new Promise((resolve, reject) => {
			request
			.get("/invoices")
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.body);
			});
			
		});
		
	}
};