// Set configuration
global.application = require('./config/application.js');

// Configure http server
let express = require('express');
let app = express();

// let QRCode = require('qrcode');

app.use('/', express.static(__dirname + '/'));

let route = require('./api-routes/index.js');
route(app);


if(global.application.getConfig().env === 'local') {
	app.listen(8080, function () {
	  console.log('listening on http://localhost:8080');
	});
}

if(global.application.getConfig().env === 'test') {
	let host = '0.0.0.0';
	let port = process.env.PORT || 3000;

	app.listen(port, host, function () {
	  	// console.log('listening on http://localhost:8080');
	  	console.log('listening on');
		console.log(host);
		console.log(port);
	});
}








// Configure https server

// const express = require('express');
// const https = require('https');
// const fs = require('fs');
// const port = 8080;

// var key = fs.readFileSync(__dirname + '/selfsigned.key');
// var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
// var options = {
//   key: key,
//   cert: cert,
//   // requestCert: true,
//   // rejectUnauthorized: true
// };

// app = express();

// app.use('/', express.static(__dirname + '/'));
// let route = require('./api-routes/index.js');
// route(app);

// app.get('/', (req, res) => {
//    res.send('Now using https..');
// });

// var server = https.createServer(options, app);

// server.listen(port, () => {
//   console.log("server starting on port : " + port)
// });
