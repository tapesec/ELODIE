var mongoose = require('mongoose');
if (process.env.NODE_ENV == "production")
	mongoose.connect("mongodb://lasalle33:J1Z8K0G6C1G8N6@ds063715.mlab.com:63715/elodidel-db");
else
	mongoose.connect('mongodb://localhost/ELODIE');



module.exports = mongoose;