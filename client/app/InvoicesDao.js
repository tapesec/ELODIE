import request from 'superagent';

export default class InvoicesDao {

	static getAll() {
		return new Promise(function(resolve, reject) {
			request
			.get("/invoices")
			.end(function(err, res){
				if (err) return reject(err);
				resolve(res.body);
			});
			
		});
		
	}
};