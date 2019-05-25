let express = require('express');
let app = express();
let moment = require('moment');
let http = require('http').Server(app);
let io = require('socket.io')(http);
let twig = require('twig');
let bodyParser = require('body-parser');
let session = require('express-session');
let mysql = require('mysql');
let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'portefolio',
});

con.connect(function(err) {
  if (err) throw err;
  console.log('BDD Connected!');
});

require('../config/socket')(io);

// Moment FR
require('moment/locale/fr.js');

app.set('views', 'views');
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('twig options', {
  strict_variables: false,
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));

// parse application/json
app.use(bodyParser.json());

app.use('/js', express.static('public/js'));
app.use('/css', express.static('public/css'));
app.use('/img', express.static('public/img'));

// initialise une session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60000,
  },
}));


// ROUTES
require('./routes/index').init(app, con, io, moment);

// ALL OTHER ROUTES REDIRECT TO '/'
app.get('*', function(req, res) {
  res.redirect('/');
});


module.exports = http;

