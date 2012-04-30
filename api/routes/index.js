
/*
 * GET home page.
 */

exports.index = function(req, res){
  //res.render('index', { title: 'Express' })
	res.render(__dirname + '/../../client/public/index', { title: 'Express', layout: false });
};

exports.api = require('./api.js');