
/**
 * Module dependencies.
 */

var express = require('express'),
	loggerOption = require('./lib/loggerHelper').getOption(),
	syslog = require('./lib/loggerHelper').syslog,
	Resource = require('express-resource'),
        models = require('./models'),
        mongoose = require('mongoose');

mongooseAuth = require('mongoose-auth');

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
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'esoognom'}));
	//app.use(app.router);
	app.use(express.static(__dirname + '/public'));
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
	app.User = User = mongoose.model('User');
	db = mongoose.connect(app.set('connstring'));
	app.use(mongooseAuth.middleware());
});

// Routes

app.get('/', function (req, res) {
	console.log(req.user);
	res.render('index');
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

mongooseAuth.helpExpress(app);

//app.get('/', routes.index);
app.resource('statuses', require('./routes/status'));
app.helpers({
	convertUserOid: function(user) {
		if (user) {
			user._id = user._id.toHexString();
			console.log(user.name instanceof String);
			console.log(user._id instanceof String);
		}
		return user;
	}
});
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
