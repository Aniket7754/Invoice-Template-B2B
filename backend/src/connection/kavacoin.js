/* eslint-env node */
function newConnection(){
	var mysql = require('mysql');
	var con = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USERNAME,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	});

	try{
		con.connect(function(err) {
			if (err) {console.log(err); return false;}
			console.log("Connected to database!");
		});
	}
	catch(err){
		console.log(err);
		return false;
	}
	return con;
}


module.exports = {conn: newConnection()}



