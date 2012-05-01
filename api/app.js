
/**
 * Module dependencies.
 */

var express = require('express'),
  mongoose = require('mongoose'),
  routes = require('./routes'),
  loggerOption = require('./lib/loggerHelper').getOption(),
  syslog = require('./lib/loggerHelper').syslog,
  models = require('./models'),
  Resource = require('express-resource');

var app = module.exports = express.createServer();


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('m_database', 'nameko');
  app.set('m_host', 'localhost');
  app.set('connstring', 'mongodb://' + app.set('m_host') + '/' + app.set('m_database'));
  app.use(express.logger(loggerOption));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../client/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//configure mongoose models
models.defineModels(mongoose, function() {
  app.Status = Status = mongoose.model('Status');
  db = mongoose.connect(app.set('connstring'));
});

// Routes

app.get('/', routes.index);
app.resource('status', require('./routes/status'));

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
