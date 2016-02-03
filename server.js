'use strict';

const app = require('express')();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

//default directory
app.get('/', (req, res) => {
  setTimeout(() => {
    res.render('index', {
      title: 'Node.js Web Server App',
      date: new Date()
    });
  }, 20000);
});

app.get('/hello', (req, res) => {

  const name = req.query.name;

  const msg = `<h1>HELLO ${name}!</h1>
               <h2>GOODBYE ${name}!</h2>`;

  console.log('PARAMS', req.query);

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;

  res.send(getRandomInt(+min, +max).toString());
});

app.get('/cal', (req, res) => {
  const zellers = require('node-cal/lib/zellers');
  const month = require('node-cal/lib/month');
  const year = require('node-cal/lib/year');
});

// localhost:3000/cal/2/2015
// localhost:3000/cal?month=2&year=2015

//all = any verbs, * = everything
//order does matter with routes
app.get('/secret', (req, res) => {
  res
    .status(403)
    .send('Access Denied!');
});

app.listen(PORT, () => {
  console.log('Node.js server started. Listening on port ${PORT}');
});
