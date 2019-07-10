'use strick'

const express = require('express');
const router = express.Router();
const db = require('./server_db.js');
const path = require('path');
const picPath = path.join(__dirname, 'db', 'concerts_images');


// user register
router.post('/UserRegister', (req, res) => {
	if(!req.body.account || req.body.account.length === 0){
		res.status(400); 
		return;
	}

	let item = req.body;
	let cmd = "INSERT INTO members VALUES(?, ?);";

	db.run(cmd, [item.account, item.password], (err, result) => {
		if(err) {
			res.status(400).send();
		}
		console.log("record inserted");
		res.status(200).send(item.account);
	});
});


// user login
router.post('/UserLogin', (req, res) => {
	// console.log(req.body);

	if(!req.body.account || req.body.account.length === 0){
		res.status(400); 
		return;
	}

	let item = req.body;
	let cmd = "SELECT * FROM members WHERE email = ?";

	db.get(cmd, [item.account], (err, row) => {
		// console.log(row);
		if(err) {
			res.status(400).send();
		} else if(!row) {
			console.log("email not found");
			res.status(400).send();	
		} else if(row.password !== item.password) {
			console.log("forget password?");
			res.status(400).send();
		} else {
			res.status(200).send(row.email);
		}
	});
});





module.exports = router;
