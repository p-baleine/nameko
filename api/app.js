
/**
 * Module dependencies.
 */

var express = require('express')
  ,loggerOption = require('./lib/loggerHelper').getOption()
  ,syslog = require('./lib/loggerHelper').syslog
  ,routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger(loggerOption));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/../client/public'));
});


app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/list', routes.api.list);

app.get('/testmongo', function(req, res) {
	var Db = require('mongodb').Db,
		Server = require('mongodb').Server,
		client = new require('mongodb').Db('nameko', new Server("127.0.0.1", 27017, {}));

	syslog('hahaha');
	client.open(function(err, p_client) {
		client.collection('posts', function(err, collection) {
			collection.find().toArray(function(err, results) {
				res.send(JSON.stringify(results));
			});
		});
	});
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
