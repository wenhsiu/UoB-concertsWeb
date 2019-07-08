const express = require('express');
const app = express();
const port = 5000;


app.listen(port, () => {
	console.log('Express server is now running and listen on port 5000 ...');
});

// app.use(require('body-parser').json());
app.use(require('./server_concertInfo'));