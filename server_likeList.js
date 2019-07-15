'use strick'

const express = require('express');
const router = express.Router();
const db = require('./server_db.js');

// get concert info from database which the user liked
router.get("/getLikeConcertsInfo/:username", (req, res) => {
	let currDate = new Date().toISOString().split("T")[0].replace(/-/g, "/");

	let cmd = "SELECT c.id, c.title, c.date, c.description, c.url, c.img FROM concert_info c " +
			  "INNER JOIN likes L ON c.id = L.concert_id " +
			  "INNER JOIN members M ON M.email = L.user_email " +
			  "WHERE M.email = ? AND L.like_concert = 1 AND c.date > ? ORDER BY date;";
	

	db.all(cmd, [req.params.username, currDate], (err, rows) => {
		if(err){
			res.status(400).send().end();
		}else{
			res.send(rows);
		}
	});
});

// while click the like button
router.post('/likeConcert/:username', (req, res) => {
	let username = req.params.username;
	let concertId = req.body.id;

	cmd = "SELECT like_concert FROM likes WHERE user_email = ? AND concert_id = ? ;";
	insertCmd = "INSERT INTO likes VALUES(?, ?, ?);";
	updateCmd = "UPDATE likes SET like_concert = ? WHERE user_email = ? AND concert_id = ? ;";

	console.log("req.body.id: " + req.body.id);

	db.get(cmd, [username, concertId], (err, row) => {
		if(err) {
			res.status(400).send();
		} else {
			if(row === undefined){
				db.run(insertCmd, [username, concertId, 1], (err, row) => {
					if(err){
						console.log("insert error");
						res.status(400).send();
					} else{
						res.send(row);
					}
				});
			} else {
				let like;
				
				if(row.like_concert === 1) { like = 0; }
				else { like = 1; }

				db.run(updateCmd, [like, username, concertId], (err, subrow) => {
					if(err){
						console.log(err);
						res.status(400).send();
					} else {
						if(like == 1) {
							res.send(true);
						} else {
							res.send(false);
						}
						
						console.log(like);
					}
				});
			}
		}
	});
});

// check if this event has been liked or not
router.post('/checkLike/:username', (req, res) => {
	let username = req.params.username;
	let concertId = req.body.id;

	cmd = "SELECT like_concert FROM likes WHERE user_email = ? AND concert_id = ? ;";

	db.get(cmd, [username, concertId], (err, row) => {
		if(err){
			res.status(400).send();
		}else{
			if(row === undefined || row.like_concert === 0) {
				res.send(false); //false: haven't click like or dislike this item.
			}else{
				res.send(true); //true: already liked this item.              
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
