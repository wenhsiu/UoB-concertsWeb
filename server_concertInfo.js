'use strick'

const express = require('express');
const router = express.Router();
const db = require('./server_db.js');
const path = require('path');
const picPath = path.join(__dirname, 'client', 'public', 'concerts_images');


// get concert info from database
router.get("/getConcertsInfo", (req, res) => {
	let currDate = new Date().toISOString().split("T")[0].replace(/-/g, "/");
	console.log("date: " + currDate);
	let cmd = "SELECT * FROM concert_info WHERE date > ? ORDER BY date;"
	
	db.all(cmd, [currDate], (err, rows) => {
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
