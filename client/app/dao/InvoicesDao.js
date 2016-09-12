import request from 'superagent';

export default class InvoicesDao {

	static getAll(dateParams) {
		return new Promise((resolve, reject) => {
			request
			.get("/invoices")
			.query(dateParams)
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

	static update(data) {
		console.log(data, 'data');

		return new Promise((resolve, reject) => {
			request
			.patch("/invoice/"+data.id)
			.send(data.patch_describer)
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.statusCode);
			});
		});	
	}

	static remove(data) {

		return new Promise((resolve, reject) => {
			request
			.delete("/invoice/"+data.id)
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.statusCode);
			});
		});	
	}

	/***
	* @description crée en fait sur le serveur un pdf contenant les infos du mois courant
	* @TODO l'url de la ressource doit changé par quelque chose du style /invoices/pdf/location
	*/
	static getPDF(dateParams) {

		return new Promise((resolve, reject) => {
			request
			.get("/invoices")
			.query({ format: "pdf" })
			.query(dateParams)
			.end((err, res) => {
				if (err) return reject(err);
				resolve(res.body);
			});
		});	
	}
};