
var	_ = require('underscored')._;

/**
 * GET
 */
exports.index = function(req, res) {
	Status.find({}).populate('user').limit(20).exec(function(err, docs) {
		if (err) {
			res.send({ msg: err }, 400);
		} else {
			res.send(docs, 200);
		}
	});
};

//exports.new = function(req, res){
//  res.send('new forum');
//};

/**
 * POST
 */
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

//exports.show = function(req, res){
//  res.send('show forum ' + req.params.forum);
//};
//

//exports.edit = function(req, res){
//  res.send('edit forum ' + req.params.statuses);
//};

/**
 * 投稿の編集(PUT)
 * http://xxxx:3000/Statuses/<_id>
 */
exports.update = function(req, res){
	var update = { $set: {
			content: req.body.content,
			updateTs: Date.now() }},
		query = { _id: req.params.status };
	
	Status.update(query, update, null, function(err, num) {
		if(err) {
			res.send({ msg : err.errors }, 400);
		} else {
			res.send({ content: req.body.content }, 200);
		}
	});
};

// DELETE
exports.destroy = function(req, res){
  res.send('destroy forum ' + req.params.forum);
};