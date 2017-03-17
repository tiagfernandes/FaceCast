var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/facecast'; 
mongoose.connect(mongoDB);
var dba = mongoose.connection;
dba.on('error', console.error.bind(console, 'MongoDB connection error:'));

var index = require('./routes/index');
var events = require('./routes/events');
var insert = require('./routes/insert');
var roles = require('./routes/roles');
var android = require('./routes/android');
var postulations = require('./routes/postulations');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/*app.use(function(req,res,next){
    req.db = db;
    next();
});*/

app.use('/', index);
app.use('/events', events);
app.use('/insert', insert);
app.use('/roles', roles);
app.use('/android', android);
app.use('/postulations', postulations);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
