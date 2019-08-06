'use strict'

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

	let user = req.body;
	let cmd = "INSERT INTO members VALUES(?, ?);";

	db.run(cmd, [user.account, user.password], (err, result) => {
		if(err) {
			res.status(400).send();
		}
		console.log("record inserted");
		res.status(200).send(user.account);
	});
});


// user login
router.post('/UserLogin', (req, res) => {
	// console.log(req.body);

	if(!req.body.userId || req.body.userId.length === 0){
		res.status(400); 
		return;
	}

	let user = req.body;
	let cmdSelect = "SELECT * FROM members WHERE id = ?";
	let cmdInsert = "INSERT INTO members (id, name) VALUES(?, ?)";

	db.get(cmdSelect, [user.userId], (err, row) => {
		// console.log(row);
		if(err) {
			res.status(400).send();
		} else if(!row) {
			console.log("user id not found");
			// res.status(400).send();
			db.run(cmdInsert, [user.userId, user.name], (err, result) => {
				if(err) {
					res.status(400).send();
				}
				console.log(`user id: ${user.userId} record inserted`);
				res.status(200).send(user.userId);
			});
		// } else if(row.password !== user.password) {
		// 	console.log("forget password?");
		// 	res.status(400).send();
		} else {
			res.status(200).send(row.id);
		}
	});
});





module.exports = router;
