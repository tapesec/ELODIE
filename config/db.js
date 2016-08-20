var mongoose = require('mongoose');
if (process.env.NODE_ENV == "production")
	mongoose.connect("mongodb://lasalle33:L@salle33171286@ds063715.mlab.com:63715/elodidel-db");
else
	mongoose.connect('mongodb://localhost/ELODIE');



module.exports = mongoose;