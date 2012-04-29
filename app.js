
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(require('connect-assets')());
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/list', function(req, res) {
	res.send(JSON.stringify([{name:'tajima'}, {name:'hoge'}, {name:'piyo'}]))
});

app.get('/testmongo', function(req, res) {
	var Db = require('mongodb').Db,
		Server = require('mongodb').Server,
		client = new require('mongodb').Db('nameko', new Server("127.0.0.1", 27017, {}));

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
