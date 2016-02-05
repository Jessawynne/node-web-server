'use strict';

const app = require('express')();
const bodyParser = require('body-parser');
const upload = require('multer')({ dest: 'tmp/uploads' });

const PORT = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.locals.title = 'Basic Node.js Web Server App';

//allows you to parse forms
app.use(bodyParser.urlencoded({extended: false}));

//default directory
app.get('/', (req, res) => {
  res.render('index', {
    date: new Date;
  });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact', (req, res) => {
  const name = req.body.name;

  res.send(`<h1>Thanks for contacting us ${name}</h1>`);
});

app.get('/sendphoto', (req, res) => {
  res.render('sendphoto');
});

app.post('/sendphoto', upload.single('image'), (req, res) => {
  res.send('<h1>Thanks for sending us your photo</h1>');
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
