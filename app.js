
/**
 * Module dependencies.
 */

var express = require('express')
  ,routes = require('./routes')
  ,loggerOption = require('./lib/loggerHelper').getOption()
  ,syslog = require('./lib/loggerHelper').syslog
  ,Resource = require('express-resource');

var everyauth = require('express')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , mongooseAuth = require('mongoose-auth');

var UserSchema = new Schema({});
UserSchema.plugin(mongooseAuth, {
	everymodule: {
        everyauth: {
            User: function () {
                return User;
            }
        }
    }
	, password: {
		loginWith: 'email'
		, extraParams: {
            name: String
        }
		, everyauth: {
            getLoginPath: '/login'
            , postLoginPath: '/login'
            , loginView: 'login.jade'
            , getRegisterPath: '/register'
            , postRegisterPath: '/register'
            , registerView: 'register.jade'
            , loginSuccessRedirect: '/'
            , registerSuccessRedirect: '/'
        }
    }
});

mongoose.model('User', UserSchema);
mongoose.connect('mongodb://localhost/nameko');
User = mongoose.model('User');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.logger(loggerOption));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'esoognom'}));
	app.use(mongooseAuth.middleware());
	//app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
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
app.resource('posts', require('./routes/post'));

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
