var mongoose = require('mongoose');
if (process.env.NODE_ENV === "production")
	mongoose.connect("mongodb+srv://elodidel:J1Z8K0G6C1G8N6@elodidel-db.cxjlw.mongodb.net/elodidel-db?retryWrites=true&w=majority",{
		useMongoClient: true,
		/* other options */
	  }).then(db => {
		  console.log(db);
	  }).catch(err => {
		  console.log(err);
	  });
else
	mongoose.connect("mongodb+srv://elodidel:J1Z8K0G6C1G8N6@elodidel-db.cxjlw.mongodb.net/elodidel-db?retryWrites=true&w=majority",{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(db => {
		console.log('connected !');
	}).catch(err => {
		console.log(err);
	});



module.exports = mongoose;