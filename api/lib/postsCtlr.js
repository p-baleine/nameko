var mongoose = require('mongoose'),
    conn = mongoose.createConnection('mongodb://localhost/nameko');

var Posts = new mongoose.Schema({
	user_name: String
	,content: String
	,insertTs: Date
	,updateTs: Date
});



exports.createPosts = function(userName, content) {
	
	var model = conn.model('post', Posts),
	modelPosts = new model();

	var insertTs = new Date();
	
	modelPosts.user_name = userName;
	modelPosts.content = content;
	modelPosts.insertTs = insertTs;
	modelPosts.updateTs = insertTs;
	
	console.log(modelPosts);
	modelPosts.save();
	
	return "test";
}