//const http = require('http');

//'use strict';

//http.createServer((req, res) => {

  //console.log(req.method, req.url);

  ////response.writeHead(); in docs
  //res.writeHead(200, {
    //'Content-type': 'text/html'
  //});

  ////res.end('Done!');
  //res.end('<<h1>HEY</h1>');

//}).listen(3000, () => {

  //console.log('Node.js server started. Listening on port 3000');

//});
////3000 is the port that we will listen to

const http = require('http');
const { PORT } = process.env;

'use strict';

http.createServer((req, res) => {
	console.log(req.method, req.url);

  	res.writeHead(200, {
  	  'Content-type': 'text/html'
  	});

	  res.end('<h1>HEY</h1>');
	}).listen(PORT,  () => {
		  console.log('Node.js server started. Listening on port ${PORT}');
  });


