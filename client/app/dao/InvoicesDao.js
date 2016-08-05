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

	static save(data) {

		return new Promise((resolve, reject) => {
			request
			.post("/invoice")
			.send(data)
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.statusCode);
			});
		});
	}
};