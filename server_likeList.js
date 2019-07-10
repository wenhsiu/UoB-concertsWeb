'use strick'

const express = require('express');
const router = express.Router();
const db = require('./server_db.js');

// get concert info from database which the user liked
router.get("/getLikeConcertsInfo/:username", (req, res) => {
	let cmd = "SELECT c.id, c.title, c.date, c.description, c.url, c.img FROM concert_info c " +
			  "INNER JOIN likes L ON c.id = L.concert_id " +
			  "INNER JOIN members M ON M.email = L.user_email " +
			  "WHERE M.email = ? AND L.like_concert = 1 ORDER BY date;";
	

	db.all(cmd, [req.params.username], (err, rows) => {
		if(err){
			res.status(400).send().end();
		}else{
			res.send(rows);
		}
	});
});

router.post('/checkLikeItem/:username', (req, res) => {
	let username = req.params.username;
	let itemId = req.body.itemId;

	cmd = "SELECT LikeItem FROM likes WHERE Username = ? AND ItemId = ? ;";
	const connection = res.app.locals.connection;
	connection.query(cmd, [username, itemId], (err, rows) => {
		if(err){
			res.status(400).send();
		}else{
			if(rows.length === 0 || rows[0].LikeItem == false){
				res.send(false); //false: haven't click like or dislike this item.
			}else{
				res.send(true); //true: already liked this item.              
			}
		}
	})
})

router.post('/likeConcert/:username', (req, res) => {
	let username = req.params.username;
	let itemId = req.body.itemId;

	const connection = req.app.locals.connection; 
	cmd = "SELECT like_concert FROM likes WHERE user_email = ? AND concert_id = ? ;";
	insertCmd = "INSERT INTO likes VALUES(?, ?, ?);";
	updateCmd = "UPDATE likes SET like_concert = ? WHERE user_email = ? AND concert_id = ? ;";

	connection.query(cmd, [username, itemId], (err, rows) => {
		if(err){
			res.status(400).send();
		} else{
			if(rows.length === 0){
				connection.query(insertCmd, [username, itemId, true], (err, rows) => {
					if(err){
						console.log("insert error");
						res.status(400).send();
					}else{
						res.status(200).send();
					}
				});
			}else {
				let like;
				
				if(rows[0].LikeItem == 1) {like = false;}
				else {like = true;}

				connection.query(updateCmd, [like, username, itemId], (err, subrows) =>{
					if(err){
						console.log("update error" + err);
						res.status(400).send();
					} else{
						res.status(200).send();
					}
				});
			}
		}
	})
})

// close the database connection
// db.close((err) => {
//  if (err) {
//      return console.error(err.message);
//  }
//  console.log('Close the database connection.');
// });

module.exports = router;
