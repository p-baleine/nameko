
var	_ = require('underscored')._;

// GET
exports.index = function(req, res) {
	Status.find({}).populate('user').limit(20).exec(function(err, docs) {
		if (err) {
			res.send({ msg: err }, 500);
		} else {
			res.send(docs, 201);
		}
	});
};

//exports.new = function(req, res){
//  res.send('new forum');
//};

// POST
exports.create = function(req, res){
	var user = req.user,
		content = req.body.content,
		status = new Status();

	status.user = user._id;
	status.content = content;

	status.save(function(err) {
		var result;

		if(err) {
			res.send({ msg : err.errors }, 400);
		} else {
			status = status.toObject();
			status.user = user;
			res.send(status, 201);
		}
	});
};

exports.show = function(req, res){
  res.send('show forum ' + req.params.forum);
};

exports.edit = function(req, res){
  res.send('edit forum ' + req.params.forum);
};

// PUT
exports.update = function(req, res){
  res.send('update forum ' + req.params.post);
};

// DELETE
exports.destroy = function(req, res){
  res.send('destroy forum ' + req.params.forum);
};