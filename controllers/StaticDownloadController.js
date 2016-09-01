class StaticDownloadCtrl {

	/***
	* @description rretourne le document pdf passé en paramètre
	*/
	static getStaticPDF(req, res, next) {
		// req.params.filename => nom-fichier-date.pdf
		res.download(process.env.PWD + '/documents/pdf/'+req.params.filename, req.params.filename, function(err) {
			if (err) return next(err);
		});
	}
}

module.exports = StaticDownloadCtrl;