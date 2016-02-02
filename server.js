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

'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
	console.log(req.method, req.url);

  if (req.url === '/hello') {
    const msg = `<h1>HELLO WORLD!</h1>
                 <h2>GOODBYE WORLD!</h2>`;

    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    //chunk response by character
    msg.split('').forEach((char, i) => {
      setTimeout(() => {
        res.write(char);
      }, 1000 * i);
    });

    //wait for all characters to be sent
    setTimeout(() => {
      res.end();
    }, msg.length * 1000 + 2000);
  } else if (req.url === '/random') {
    res.end(Math.random().toString());
  } else {
    res.writeHead(403);
    //http status code
    res.end('Access Denied!');
  }

}).listen(PORT, () => {
  console.log('Node.js server started. Listening on port ${PORT}');
});
