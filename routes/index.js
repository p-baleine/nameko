
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
	//res.render(__dirname + '/../../client/public/index.html', { title: 'Express', layout: false });
};
