const express = require('express');
const app = express();
const port = 5000;
const sqlite3 = require('sqlite3').verbose();
let path = require('path');

const picPath = path.join(__dirname, 'db', 'concerts_images');

let db = new sqlite3.Database('./db/concerts.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the SQlite database.');
});

app.listen(port, () => {
	console.log('Express server is now running and listen on port 5000 ...');
});

// app.use(require('body-parser').json());
// app.use(require('./server_concertInfo'));

// get concert info from database
app.get("/getConcertsInfo", (req, res, next) => {
	var sql = "SELECT id, title, date, description, url, img FROM concert_info ORDER BY date;"
	var params = []
	db.all(sql, params, (err, rows) => {
		if(err){
			res.status(400).send().end();
		}else{
			res.send(rows);
		}
	});
});

app.get("/getImage/:img", (req, res) => { 
	console.log(picPath + "/" + req.params.img);      
	res.sendFile(picPath + "/" + req.params.img);
})



// close the database connection
// db.close((err) => {
// 	if (err) {
// 		return console.error(err.message);
// 	}
// 	console.log('Close the database connection.');
// });