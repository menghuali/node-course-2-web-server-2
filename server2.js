const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const fs = require('fs');

var app = new express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

function log(msg) {
  var now = new Date().toString();
  var log = `${now}: ${msg}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Cannot log to server.log', err);
    }
  });
}

app.use((req, res, next) => {
  log(`${req.method} ${req.url}`);
  next();
});

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    title: 'Home Page',
    msg: 'Welcome to my second website!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Page'
  });
});

app.get('/third', (req, res) => {
  res.render('third.hbs', {
    title: 'The 3rd page'
  })
});

app.listen(port, () => {
  log(`Server2 is up on port ${port}`);
});
