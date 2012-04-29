
// GET
exports.index = function(req, res) {
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
};

//exports.new = function(req, res){
//  res.send('new forum');
//};

// POST
exports.create = function(req, res){
  res.send('create forum');
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res){
  res.send('edit forum ' + req.params.forum);
};

// PUT
exports.update = function(req, res){
  res.send('update forum ' + req.params.forum);
};

// DELETE
exports.destroy = function(req, res){
  res.send('destroy forum ' + req.params.forum);
};