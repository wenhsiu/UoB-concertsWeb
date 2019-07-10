'use strick'

const sqlite3 = require('sqlite3').verbose();

module.exports = new sqlite3.Database('./db/concerts.db', (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the SQlite database.');
});