'use strick'

const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const path = require('path');
const picPath = path.join(__dirname, 'db', 'concerts_images');

// connect to database
const db = new sqlite3.Database('./db/concerts.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the SQlite database.');
});

// get concert info from database
router.get("/getConcertsInfo", (req, res) => {
	var cmd = "SELECT * FROM concert_info ORDER BY date;"
	var params = []
	db.all(cmd, params, (err, rows) => {
		if(err){
			res.status(400).send().end();
		}else{
			res.send(rows);
		}
	});
});

// get images
router.get("/getImage/:img", (req, res) => {
	console.log(picPath + "/" + req.params.img);      
	res.sendFile(picPath + "/" + req.params.img);
})

// close the database connection
// db.close((err) => {
//  if (err) {
//      return console.error(err.message);
//  }
//  console.log('Close the database connection.');
// });

module.exports = router;
