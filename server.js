'use strict';

const app = require('express')();
const PORT = process.env.PORT || 3000;

app.get('/hello', (req, res) => {
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
});

app.get('/random', (req, res) => {
  res.send(Math.random().toString());
});

//all = any verbs, * = everything
app.all('*', (req, res) => {
  res
    .status(403)
    .send('Access Denied!');
});

app.listen(PORT, () => {
  console.log('Node.js server started. Listening on port ${PORT}');
});
